export interface SongData {
  name: string;
  artists: Array<string>;
  album: string;
  release: Date;
  albumArtURL: string;
  extURL: string;
  isrc: string;
}
export const EmptySongData: SongData = {
  name: "",
  artists: [],
  album: "",
  albumArtURL: "",
  release: new Date(0),
  extURL: "",
  isrc: "",
}

interface PlatformsObj {
  spotify: string;
}
export const Platforms: PlatformsObj = Object.freeze({
  spotify: "spotify",
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
