import AbstractApi from "./abstract-api";
import { SongData, EmptySongData } from "./objects";
import { Platforms } from "./objects";
//@ts-ignore
import Tidal from "tidal-api-wrapper";

const api = new Tidal();

export default class TidalApi extends AbstractApi {
  override platform = Platforms.tidal;
  override idRegex = /[\d]{7,}/;
  override apiURL = "";

  constructor() {
    super();
  }

  override GetAlbumArtURL(art: any): string {
    const sizes: string[] = ['xl', 'lg', 'md', 'sm']

    sizes.forEach((s) => {
      if (art[s]) return art[s]
    })

    return ''
  }

  override ParseSong(song: any): SongData {
    const parsed: SongData = structuredClone(EmptySongData);

    const albumArtURL = this.GetAlbumArtURL(
      api.albumArtToUrl(song.album.cover)
    );

    parsed.songItem.name = song.title ?? '';
    parsed.songItem.artists = song.artists?.map((a: any) => a.name) ?? [];
    parsed.songItem.album = song.album.title ?? '';
    parsed.albumArtURL = albumArtURL;
    parsed.release = new Date(song.streamStartDate);
    parsed.extURLs = [{
      platform: this.platform,
      URL: song.url
    }];

    return parsed;
  }

  override ParseUrlForID(url: string): string {
    const idArray = url.match(this.idRegex) ?? [""];

    return idArray[0];
  }

  override async GetSongByID(id: string): Promise<SongData> {
    const res = await api.getTrack(id)

    const parsedSong = this.ParseSong(res);

    return parsedSong;
  }

  override async SearchSong(name: string, artists: Array<string>, album: string): Promise<SongData[]> {
    const nameString = name ?? ''
    const artistString = artists.map((a) => { return a ? a : '' }).join(', ')
    const albumString = album ?? ''
    const query = [nameString, artistString, albumString].join(' ')

    const res = await api.search(query, 'tracks', 5)

    const parsedSongs = res.map((t: any) => this.ParseSong(t));

    return parsedSongs
  }
}
