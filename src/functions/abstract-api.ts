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

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(this.platform + ' API error: ' + res.status);

    const json = await res.json();
    return json;
  }

  GetAlbumArtURL(arts: any[]): string {
    const artsList = [...arts, {
      url: '',
      height: 0,
    }]
    const maxQualityArt: any = artsList.reduce((p, c) => {
      return (p && p.height > c.height) ? p : c
    })

    return maxQualityArt.url;
  }

  abstract ParseSong(song: object): SongData;

  abstract ParseUrlForID(url: string): string;

  abstract GetSongByID(id: string): Promise<SongData>;

  async GetSongByURL(url: string): Promise<SongData> {
    const id: string = this.ParseUrlForID(url);
    return await this.GetSongByID(id);
  }

  abstract SearchSong(name: string, artists: Array<string>, album: string): Promise<SongData[]>;
}
