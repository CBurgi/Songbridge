
import { parseSearchPath } from "@/pages/Search"
import { SongData, SongItem } from "./objects"

function sort_mostPlatforms(a: SongData, b: SongData): number {
  return b.extURLs.length - a.extURLs.length
}
function sort_var_closeness(a: string, b: string, search: string): number {
  if (
    a.trim().toLowerCase() === search.trim().toLowerCase()
    && !(b.trim().toLowerCase() === search.trim().toLowerCase())
  )
    return -1
  if (
    !(a.trim().toLowerCase() === search.trim().toLowerCase())
    && (b.trim().toLowerCase() === search.trim().toLowerCase())
  )
    return 1
  return 0
}
function sort_artist_closeness(a: string[], b: string[], search: string[]): number {
  search.forEach((n) => {
    if (
      a.find((an) => an.trim().toLowerCase() === n.trim().toLowerCase())
      && !b.find((bn) => bn.trim().toLowerCase() === n.trim().toLowerCase())
    )
      return -1
    if (
      !a.find((an) => an.trim().toLowerCase() === n.trim().toLowerCase())
      && b.find((bn) => bn.trim().toLowerCase() === n.trim().toLowerCase())
    )
      return 1
  })
  return 0
}
function sort_closeness(a: SongData, b: SongData, path: string): number {
  const search = parseSearchPath(path)
  const a_song: SongItem = a.songItem
  const b_song: SongItem = b.songItem

  return (
    sort_var_closeness(
      a_song.name.trim().toLowerCase(),
      b_song.name.trim().toLowerCase(),
      search.name.trim().toLowerCase()
    )
    || sort_artist_closeness(
      a_song.artists,
      b_song.artists,
      search.artists
    )
    || sort_var_closeness(
      a_song.album.trim().toLowerCase(),
      b_song.album.trim().toLowerCase(),
      search.album.trim().toLowerCase()
    )
  )
}
function sort_fn(a: SongData, b: SongData, path: string): number {
  return (
    sort_mostPlatforms(a, b)
    || sort_closeness(a, b, path)
  )
}
export default function sortSongs(songs: SongData[], path: string): SongData[] {
  return songs.sort((a, b) => sort_fn(a, b, path))
}
