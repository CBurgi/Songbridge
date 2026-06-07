import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmptySongData, SongData, states } from './functions/objects';

import SongDisplay from './components/SongDisplay'
import PlatformDisplay from './components/PlatformDisplay';
import SearchBlock, { formSearchURL } from './components/SearchBlock';
import Header from './components/Header';

export type searchObj = {
  name: string;
  artists: string[];
  album: string;
}
const nameRegex = /song:(?<ret>.*?)(?=album:|artists:|$)/
const artistsRegex = /artists:(?<ret>.*?)(?=song:|album:|$)/
const albumRegex = /album:(?<ret>.*?)(?=song:|artist:|$)/
export function parseSearchPath(searchPath: string): searchObj {
  const query: string = decodeURIComponent(searchPath)
  const name = query.match(nameRegex)?.groups?.ret ?? ''
  const artists = query.match(artistsRegex)?.groups?.ret?.split(',') ?? []
  const album = query.match(albumRegex)?.groups?.ret ?? ''

  const search: searchObj = {
    name,
    artists,
    album,
  }
  return search
}

export function App() {
  const baseLocation: string = location.origin
  const useLoc = useLocation();
  const navigate = useNavigate()

  const [state, setState] = useState(states.unsearched);
  const [result, setResult] = useState([EmptySongData]);
  const [songData, setSongData] = useState(EmptySongData);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
    const path = useLoc.pathname.slice(1)
    if (!path) setState(states.unsearched)
    else if (path.startsWith('search')) {
      setState(states.searching)
      searchSongs(path)
    } else {
      setState(states.searching)
      getSong(path)
    }
  }, [useLoc]);

  useEffect(() => {

  }, [state])

  async function searchSongs(searchPath: string) {
    try {
      const search = parseSearchPath(searchPath)
      const url = new URL("/api/searchSongs", baseLocation);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(search)
      });

      const songs: SongData[] = await response.json();
      updateResult(songs)
    } catch (error) {
      console.log(String(error));
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
      console.log(String(error));
    }
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

  return (
    <div>
      <Header />

      <SearchBlock />
      {
        (
          state === states.searched
        ) && (
          <>
            {
              result.map((r: SongData, index: number) => (
                <button id={index.toString()} onClick={() => {
                  navigate(`/${r.extURLs[0]?.URL ?? ''}`)}}>
                  <SongDisplay
                    song={r}
                  />
                </button>
              ))
            }
          </>
        )
      }
      {
        (
          state === states.selected
        ) && (
          <PlatformDisplay
            song={songData}
          />
        )
      }

    </div>
  );
}

export default App;
