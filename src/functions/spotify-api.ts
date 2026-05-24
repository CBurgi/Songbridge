import AbstractApi from "./abstract-api";
import type { SongData } from "./objects";
import { EmptySongData } from "./objects";
import { getToken } from "./tokenStore";
import { Platforms } from "./objects";

export default class SpotifyApi extends AbstractApi {
  override platform = Platforms.spotify;
  override idRegex = /[\w\d]{22}/;
  override platformURL = "open.spotify.com";
  override apiURL = "https://api.spotify.com";

  constructor(){super();}

  override ParseUrlForID(url: string): string {
    const idArray = url.match(this.idRegex) ?? [""];

    return idArray[0];
  }

  override async GetSongByID(id: string) {
    const token = await getToken(this.platform); 

    const url = new URL(`/v1/tracks/${id}`, this.apiURL);
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Spotify API error: ' + res.status);

    const json = await res.json();
    console.log(json);
    

    return EmptySongData;
  }

  override async Search(name: string, artist: string, album: string) {
    return [EmptySongData]
  }
}
