export interface SongItem {
  name: string;
  artists: string[];
  album: string;
}
export interface URLObj {
  platform: string;
  URL: string;
}
export interface SongData {
  songItem: SongItem;
  release: Date;
  albumArtURL: string;
  extURLs: URLObj[];
  isrc: string;
}
export const EmptySongData: SongData = Object.freeze({
  songItem: {
    name: "",
    artists: [],
    album: "",
  },
  albumArtURL: "",
  release: new Date(0),
  extURLs: [{
    platform: "",
    URL: "",
  }],
  isrc: "",
})

interface PlatformsObj {
  spotify: string;
  youtube: string;
}
export const Platforms: PlatformsObj = Object.freeze({
  spotify: "spotify",
  youtube: "youtube",
})

interface StatesObj {
  not_found: number;
  unsearched: number;
  searched: number;
  selected: number;
}
export const states: StatesObj = Object.freeze({
  not_found: -1,
  unsearched: 0,
  searched: 1,
  selected: 2,
})
