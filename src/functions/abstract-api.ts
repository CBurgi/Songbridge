import type { SongData } from "./objects";
import { getToken } from "./tokenStore";

export default abstract class AbstractApi {
  abstract platform: string;
  abstract platformURL: string;
  abstract idRegex: RegExp;
  abstract apiURL: string;

  constructor(){}

  async APIGET(url: URL): Promise<any> {
    const token = await getToken(this.platform); 

    console.log(url.href)
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(this.platform + ' API error: ' + res.status);

    const json = await res.json();
    console.log(json);
    return json;
  }

  abstract ParseSong(song: object): SongData;

  abstract ParseUrlForID(url: string): string;

  abstract GetSongByID(id: string): Promise<SongData[]>;

  abstract SearchSong(name: string, artists: Array<string>, album: string): Promise<Array<SongData>>;
}
