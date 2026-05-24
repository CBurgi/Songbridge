import { serve } from "bun";
import index from "./index.html";
import { getToken } from "./functions/tokenStore";
import { Platforms } from "./functions/objects";
import SpotifyApi from "./functions/spotify-api";
import AbstractApi from "./functions/abstract-api";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/": index,

    "/api/getSongs": {
      POST: async (req) => {
        const body = await req.json();
        let result = {};
        if (body.url) {

        } else {
        }
        // return Response.json({...result, ...body});
        const api = new SpotifyApi();
        const id = api.ParseUrlForID('https://open.spotify.com/track/3aTtbSM7gX011qAtinh6nP');
        api.GetSongByID(id);

        return Response.json({})
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
