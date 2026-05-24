export type SongData = {
  name: string;
  artist: string;
  album: string;
  year: string;
  albumArtURL: string;
  extURL: string;
  isrc: string;
}
export const EmptySongData: SongData = {
  name: "",
  artist: "",
  album: "",
  albumArtURL: "",
  year: "",
  extURL: "",
  isrc: "",
}

export const Platforms = Object.freeze({
  spotify: "spotify",
})
