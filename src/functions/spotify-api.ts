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

  override ParseSong(song: any): SongData {
    const parsed: SongData = structuredClone(EmptySongData);

    parsed.name = song.name ?? '';
    parsed.artists = song.artists?.map((a: any) => a.name) ?? [];
    parsed.album = song.album.name ?? '';
    parsed.albumArtURL = song.album.images.find((a: any) => a.height === 640).url;
    parsed.release = new Date(song.album.release_date);
    parsed.extURL = song.external_urls.spotify;
    parsed.isrc = song.external_ids.isrc;

    return parsed;
  }

  override ParseUrlForID(url: string): string {
    const idArray = url.match(this.idRegex) ?? [""];

    return idArray[0];
  }

  override async GetSongByID(id: string): Promise<SongData[]> {
    const url = new URL(`/v1/tracks/${id}`, this.apiURL);
    const res = await this.APIGET(url);

    const parsedSong = this.ParseSong(res);

    return [parsedSong];
  }

  override async SearchSong(name: string, artists: Array<string>, album: string): Promise<SongData[]> {
    const nameString = name ? `track:${name}` : ''
    const artistString = artists.map((a) => { return a ? `artist:${a}` : ''}).join(' ')
    const albumString = album ? `album:${album}` : ''
    const query = [nameString, artistString, albumString].join(' ')
    const path = `/v1/search?type=track&q=${query}`

    const url = new URL(path, this.apiURL);
    console.log(url);
    
    const res = await this.APIGET(url);

    const parsedSongs = res.tracks.items.map((t: any) => this.ParseSong(t));

    return parsedSongs
  }
}
