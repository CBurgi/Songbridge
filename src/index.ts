import { serve } from "bun";
import index from "./index.html";
import { getToken } from "./functions/tokenStore";
import { Platforms, SongData } from "./functions/objects";
import SpotifyApi from "./functions/spotify-api";
import AbstractApi from "./functions/abstract-api";
import YouTubeApi from "./functions/youtube-api";
import _ from 'lodash'

const apis = [
  new SpotifyApi(),
  new YouTubeApi(),
]

async function SearchSongs(
  name: string,
  artists: string[],
  album: string
): Promise<SongData[] | []> {
  try {
    const songs: SongData[] = [];
    for (const api of apis) {
      const res: SongData[] = await api.SearchSong(name, artists, album)
      res.forEach((song) => {
        if (
          songs.some((s) => _.isEqual(s.songItem, song.songItem))
          && song.extURLs[0]
        ) {
          const match = songs.find(
            (s) => _.isEqual(s.songItem, song.songItem)
          )
          if (match && !match.extURLs.some((u) => u.platform === song.extURLs[0]?.platform)) {
            match.extURLs.push(song.extURLs[0])
          }
        } else {
          songs.push(song)
        }
      })
    }

    return songs;
  } catch (error) {
    return []
  }
}

async function GetSongByURL(URL: string): Promise<SongData[] | []> {
  try {
    const api = apis.find((a) => URL.includes(a.platformURL))
    if (!api) throw Error;

    const targetSong = await api.GetSongByURL(URL)

    const otherApis = apis.filter((a) => a.platform !== api.platform)
    for (const api of otherApis) {
      const res: SongData[] = await api.SearchSong(
        targetSong.songItem.name, targetSong.songItem.artists, targetSong.songItem.album
      )

      res.forEach((song) => {
        if (
          targetSong.songItem === song.songItem
          && song.extURLs[0]
        ) {
          targetSong.extURLs.push(song.extURLs[0])
        }
      })
    }

    return [targetSong]
  } catch (e) {
    return []
  }
}

const server = serve({
  routes: {
    "/images/*": {
      GET: async (req) => {
        const filePath = "./public" + new URL(req.url).pathname
        const file = Bun.file(filePath)
        return new Response(file)
      }
    },

    "/api/searchSongs": {
      POST: async (req) => {
        const body = await req.json();
        console.log('searchSongs request:')
        console.log(body);

        const result = await SearchSongs(body.name, body.artists, body.album)

        console.log('Response: ');
        console.log(result);

        return Response.json(result)
      },
    },
    "/api/getSong": {
      POST: async (req) => {
        const body = await req.json();
        console.log('getSong request:')
        console.log(body);

        const result = await GetSongByURL(body.url);

        console.log('Response: ');
        console.log(result);

        return Response.json(result)
      },
    },

    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
