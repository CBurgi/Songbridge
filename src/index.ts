import { serve } from "bun";
import index from "./index.html";
import { getToken } from "./functions/tokenStore";
import { Platforms } from "./functions/objects";
import SpotifyApi from "./functions/spotify-api";
import AbstractApi from "./functions/abstract-api";
import YouTubeApi from "./functions/youtube-api";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/": index,

    "/api/getSongs": {
      POST: async (req) => {
        const body = await req.json();
        console.log('Request:')
        console.log(body);

        const api = new YouTubeApi();
        // const api = new SpotifyApi();

        let result = {};
        result = await api.SearchSong(body.name, body.artists, body.album)
        if (body.url) {
          console.log('Requesting via URL...')
          const id = api.ParseUrlForID(body.url);
          result = await api.GetSongByID(id);
        } else {
          console.log('Requesting via Search...')
          result = await api.SearchSong(body.name, body.artists, body.album)
        }

        console.log('Response: ');
        console.log(result);

        return Response.json(result)
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
