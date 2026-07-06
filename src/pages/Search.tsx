import PlatformDisplay from "@/components/PlatformDisplay";
import SearchBlock from "@/components/SearchBlock";
import SongDisplay from "@/components/SongDisplay";
import { EmptySongData, Platforms, SongData, SongItem, states } from "@/functions/objects";
import sortSongs from "@/functions/sorting";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const nameRegex = /song:(?<ret>.*?)(?=album:|artists:|$)/
const artistsRegex = /artists:(?<ret>.*?)(?=song:|album:|$)/
const albumRegex = /album:(?<ret>.*?)(?=song:|artist:|$)/
export function parseSearchPath(searchPath: string): SongItem {
  const query: string = decodeURIComponent(searchPath)
  const name = query.match(nameRegex)?.groups?.ret ?? ''
  const artists = query.match(artistsRegex)?.groups?.ret?.split(',') ?? []
  const album = query.match(albumRegex)?.groups?.ret ?? ''

  const search: SongItem = {
    name,
    artists,
    album,
  }
  return search
}

export default function Search() {
  const baseLocation: string = (typeof process !== 'undefined' && process.env.BASE_URL) ? process.env.BASE_URL : location.origin
  const useLoc = useLocation()
  const navigate = useNavigate()

  const [state, setState] = useState(states.unsearched);
  const [path, setPath] = useState('');
  const [result, setResult] = useState([EmptySongData]);
  const [songData, setSongData] = useState(EmptySongData);

  useEffect(() => {
    const path = useLoc.pathname.slice(1) + useLoc.search
    
    if (!path)
      setState(states.unsearched)
    else if (path.startsWith('search')) {
      setState(states.searching)
      setPath(path)
      searchSongs(path)
    } else {
      setState(states.searching)
      getSong(path)
    }
  }, [useLoc]);

  async function searchSongs(searchPath: string) {
    try {
      const search = parseSearchPath(searchPath)
      const url = new URL("/api/searchSongs", baseLocation);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(search)
      });

      const songs: SongData[] = await response.json();
      const filteredSongs = removeOnlyYoutube(songs)
      const sortedSongs = sortSongs(filteredSongs, path)
      updateResult(sortedSongs)
    } catch (error) {
      console.error(String(error));
    }
  }
  async function getSong(songLink: string) {
    try {
      const url = new URL("/api/getSong", baseLocation);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ url: songLink })
      });

      const songs: SongData[] = await response.json();
      updateResult(songs)
    } catch (error) {
      console.error(String(error));
    }
  }

  function removeOnlyYoutube(songs: SongData[]): SongData[] {
    return songs.filter((s) => {
      return !(
        s.extURLs.length === 1
        && s.extURLs[0]?.platform === Platforms.youtube
      )
    })
  }

  function updateResult(songs: SongData[]) {
    switch (songs.length) {
      case 0:
        setState(states.not_found)
        break;
      case 1:
        setSongData(songs[0] ?? EmptySongData)
        setState(states.selected)
        break;

      default:
        setResult(songs)
        setState(states.searched)
        break;
    }
  }

  function collapsedSearch(): boolean {
    return [states.searched, states.selected].includes(state)
  }

  function Results() {
    switch (state) {
      case states.searched:
        return (
          <>
            {
              result.map((r: SongData) => (
                < button
                  className="w-full"
                  key={self.crypto.randomUUID()}
                  onClick={() => {
                    navigate(`/${r.extURLs[0]?.URL ?? ''}`)
                  }}>
                  <SongDisplay song={r} />
                </button>
              ))
            }
          </>
        )
      case states.selected:
        return (
          <PlatformDisplay song={songData} />
        )
      default:
        return (
          <></>
        )
    }
  }

  return (
    <>
      <SearchBlock collapse={collapsedSearch()} />
      <Results />
    </>
  )
}
