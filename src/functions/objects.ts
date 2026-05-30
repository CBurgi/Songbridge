export interface SongData {
  name: string;
  artists: Array<string>;
  album: string;
  release: Date;
  albumArtURL: string;
  extURL: string;
  isrc: string;
  platforms: string[];
}
export const EmptySongData: SongData = Object.freeze({
  name: "",
  artists: [],
  album: "",
  albumArtURL: "",
  release: new Date(0),
  extURL: "",
  isrc: "",
  platforms: [],
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
