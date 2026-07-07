import { plugin } from "bun";
import expr from "jquery";

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

interface ImageTypesObj {
  png: string;
  svg: string;
}
export const ImageTypes: ImageTypesObj = Object.freeze({
  png: "png",
  svg: "svg",
})
interface PlatformsObj {
  spotify: string;
  youtube: string;
}
export const Platforms: PlatformsObj = Object.freeze({
  spotify: "spotify",
  youtube: "youtube",
})
export interface PlatformLinkObj {
  platform: string;
  platformName: string;
  imageType: string;
  link: string;
  supported: boolean;
  extra_text: string;
}
export const PlatformLinks: PlatformLinkObj[] = [
  {
    platform: Platforms.spotify,
    platformName: "Spotify",
    link: "https://open.spotify.com/",
    imageType: ImageTypes.png,
    supported: true,
    extra_text: '',
  },
  {
    platform: Platforms.youtube,
    platformName: "Youtube Music",
    link: "https://music.youtube.com/",
    imageType: ImageTypes.png,
    supported: true,
    extra_text: '',
  },
  {
    platform: 'apple',
    platformName: "Apple Music",
    link: "https://music.apple.com/",
    imageType: ImageTypes.svg,
    supported: false,
    extra_text: 'Requires paid licence from Apple.',
  },
  {
    platform: 'tidal',
    platformName: "Tidal",
    link: "https://tidal.com/",
    imageType: ImageTypes.png,
    supported: false,
    extra_text: 'Coming soon...',
  },
  {
    platform: 'amazon',
    platformName: "Amazon Music",
    link: "https://music.amazon.com/",
    imageType: ImageTypes.svg,
    supported: false,
    extra_text: 'Coming soon...',
  },
]
export const ExternalPlatformLinks: PlatformLinkObj[] = [
  {
    platform: 'linkedin',
    platformName: "LinkedIn",
    link: "https://www.linkedin.com/in/cole-burgi/",
    imageType: ImageTypes.png,
    supported: true,
    extra_text: '',
  },
  {
    platform: 'github',
    platformName: "GitHub",
    link: "https://github.com/CBurgi",
    imageType: ImageTypes.svg,
    supported: true,
    extra_text: '',
  },
]

interface StatesObj {
  not_found: number;
  unsearched: number;
  searching: number;
  searched: number;
  selected: number;
}
export const states: StatesObj = Object.freeze({
  not_found: -1,
  unsearched: 0,
  searching: 1,
  searched: 2,
  selected: 3,
})

interface PagesObj {
  search: string;
  about: string;
  supportedPlatforms: string;
}
export const pages: PagesObj = Object.freeze({
  search: '',
  about: 'about',
  supportedPlatforms: 'supported-platforms'
})
