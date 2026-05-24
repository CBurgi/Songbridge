import type { SongData } from "./objects";

export default abstract class AbstractApi {
  abstract platform: string;
  abstract platformURL: string;
  abstract idRegex: RegExp;
  abstract apiURL: string;

  constructor(){}

  abstract ParseUrlForID(url: string): string;

  abstract GetSongByID(id: string): Promise<SongData>;

  abstract Search(name: string, artist: string, album: string): Promise<Array<SongData>>;
}
