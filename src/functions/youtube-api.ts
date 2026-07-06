import AbstractApi from "./abstract-api";
import { SongData, EmptySongData } from "./objects";
import { Platforms } from "./objects";
import YTMusic from "ytmusic-api";

const api = new YTMusic();

export default class YouTubeApi extends AbstractApi {
  override platform = Platforms.youtube;
  override idRegex = /[\w\d]{11}/;
  override apiURL = "";

  musicSpecifcURL: string = "https://music.youtube.com/watch?v="

  constructor() {
    super();
  }

  override ParseSong(song: any): SongData {
    const parsed: SongData = structuredClone(EmptySongData);

    const albumArtURL = this.GetAlbumArtURL(song.thumbnails);

    parsed.songItem.name = song.name ?? '';
    parsed.songItem.artists = song.artists?.map((a: any) => a.name) ?? [];
    parsed.songItem.album = song.album.name ?? '';
    parsed.albumArtURL = albumArtURL;
    parsed.release = new Date(0);
    parsed.extURLs = [{
      platform: this.platform,
      URL: this.musicSpecifcURL + song.videoId
    }];

    return parsed;
  }

  override ParseUrlForID(url: string): string {
    const idArray = url.match(this.idRegex) ?? [""];

    return idArray[0];
  }

  override async GetSongByID(id: string): Promise<SongData> {
    await api.initialize()
    const res = await api.searchSongs(id).then((r) => {
      return r[0]
    });

    const parsedSong = this.ParseSong(res);

    return parsedSong;
  }

  override async SearchSong(name: string, artists: Array<string>, album: string): Promise<SongData[]> {
    const nameString = name ?? ''
    const artistString = artists.map((a) => { return a ? a : '' }).join(', ')
    const albumString = album ?? ''
    const query = [nameString, artistString, albumString].join(' ')

    await api.initialize()
    const res = await api.searchSongs(query).then((r) => {
      return r.slice(0, 5)
    })

    const parsedSongs = res.map((t: any) => this.ParseSong(t));

    return parsedSongs
  }
}
