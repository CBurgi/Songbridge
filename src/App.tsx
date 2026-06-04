import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmptySongData, SongData, states } from './functions/objects';

import SongDisplay from './components/SongDisplay'
import PlatformDisplay from './components/PlatformDisplay';
import SearchBlock from './components/SearchBlock';

  export type searchObj = {
    name: string;
    artists: string[];
    album: string;
  }
export function parseSearchPath(searchPath: string): searchObj {
  const query: string[] = decodeURI(searchPath).replace('search/', '').split(' ')
  const search: searchObj = {
    name: query.find((q) => q.startsWith('song:'))?.replace('song:', '') ?? '',
    artists: query.find((q) => q.startsWith('artists:'))?.replace('artists:', '').split(',') ?? [],
    album: query.find((q) => q.startsWith('album:'))?.replace('album:', '') ?? ''
  }
  return search
}

export function App() {
  const baseLocation: string = location.origin
  const useLoc = useLocation();

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
    if (songs.length > 0) {
      setResult(songs)
      setState(songs.length > 1 ? states.searched : states.selected)
    } else {
      setState(states.not_found)
    }
  }

  return (
    <div>
      <span className="font-sans font-bold text-lg">Songbridge</span>
      <br />
      <span className="font-sans font-bold text-lg">{state}</span>

      <SearchBlock />
      {
        (
          state === states.searched
        ) && (
          <div>
            {
              result.map((r: SongData) => (
                <SongDisplay
                  song={r}
                />
              ))
            }
          </div>
        )
      }
      {
        (
          state === states.selected
        ) && (
          <div>
            {
              result.map((r: SongData) => (
                <SongDisplay
                  song={r}
                />
                // <PlatformDisplay
                //   song={r.name}
                //   artist={r.artists.join(', ')}
                //   album={r.album}
                //   platform={r.albumArtURL}
                // />
              ))
            }
          </div>
        )
      }

    </div>
  );
}

export default App;
