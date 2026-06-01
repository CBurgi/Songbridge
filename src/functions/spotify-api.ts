import AbstractApi from "./abstract-api";
import { SongData, EmptySongData } from "./objects";
import { Platforms } from "./objects";

export default class SpotifyApi extends AbstractApi {
  override platform = Platforms.spotify;
  override idRegex = /[\w\d]{22}/;
  override platformURL = "open.spotify.com";
  override apiURL = "https://api.spotify.com";

  constructor(){super();}

  override ParseSong(song: any): SongData {
    const parsed: SongData = structuredClone(EmptySongData);
      
    const albumArtURL = this.GetAlbumArtURL(song.album.images);

    parsed.songItem.name = song.name ?? '';
    parsed.songItem.artists = song.artists?.map((a: any) => a.name) ?? [];
    parsed.songItem.album = song.album.name ?? '';
    parsed.albumArtURL = albumArtURL;
    parsed.release = new Date(song.album.release_date);
    parsed.extURLs = [{
      platform: this.platform,
      URL: song.external_urls.spotify
    }]
    parsed.isrc = song.external_ids.isrc;

    return parsed;
  }

  override ParseUrlForID(url: string): string {
    const idArray = url.match(this.idRegex) ?? [""];

    return idArray[0];
  }

  override async GetSongByID(id: string): Promise<SongData> {
    const url = new URL(`/v1/tracks/${id}`, this.apiURL);
    const res = await this.APIGET(url);

    const parsedSong = this.ParseSong(res);

    return parsedSong;
  }

  override async SearchSong(name: string, artists: Array<string>, album: string): Promise<SongData[]> {
    const nameString = name ? `track:${name}` : ''
    const artistString = artists.map((a) => { return a ? `artist:${a}` : ''}).join(' ')
    const albumString = album ? `album:${album}` : ''
    const query = [nameString, artistString, albumString].join(' ')
    const path = `/v1/search?type=track&limit=7&q=${query}`

    const url = new URL(path, this.apiURL);
    
    const res = await this.APIGET(url);

    const parsedSongs = res.tracks.items.map((t: any) => this.ParseSong(t));

    return parsedSongs
  }
}
