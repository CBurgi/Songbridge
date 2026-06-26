import { serve } from "bun";
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
    console.log(error)
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
          _.isEqual(targetSong.songItem, song.songItem)
          && song.extURLs[0]
        ) {
          targetSong.extURLs.push(song.extURLs[0])
        }
      })
    }

    return [targetSong]
  } catch (error) {
    console.log(error)
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

    "/dist/*": {
      GET: async (req) => {
        const pathname = new URL(req.url).pathname
        const filePath = "." + pathname
        const file = Bun.file(filePath)

        let contentType = "application/octet-stream"
        if (pathname.endsWith(".js")) contentType = "application/javascript"
        else if (pathname.endsWith(".css")) contentType = "text/css"
        else if (pathname.endsWith(".json")) contentType = "application/json"

        return new Response(file, { headers: { "Content-Type": contentType } })
      }
    },

    "/api/searchSongs": {
      POST: async (req) => {
        const body = await req.json();
        console.log('searchSongs request:')
        console.log(body);

        const result = await SearchSongs(body.name, body.artists, body.album)

        console.log('Response: ');
        result.forEach((r) => console.log(r))

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
        result.forEach((r) => console.log(r))

        return Response.json(result)
      },
    },

    "/*": {
      GET: async () => {
        const file = Bun.file("./public/index.html")
        return new Response(file, { headers: { "Content-Type": "text/html" } })
      }
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
