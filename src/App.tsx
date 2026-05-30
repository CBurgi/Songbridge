import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EmptySongData, SongData, states } from './functions/objects';

import SongDisplay from './components/SongDisplay'
import PlatformDisplay from './components/PlatformDisplay';
import SearchBlock from './components/SearchBlock';

export function App() {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [state, setState] = useState(states.unsearched);
  const [result, setResult] = useState([EmptySongData]);
  const [songData, setSongData] = useState(EmptySongData);


  return (
    <div>
      <span className="font-sans font-bold text-lg">Songbridge</span>
      <br/>
      <span className="font-sans font-bold text-lg">{state}</span>
      
      < SearchBlock
        setState={setState}
        setResult={setResult}
      />
      {
        (
          state === states.searched
        ) && (
          <div>
            {
              result.map((r: SongData) => (
                <SongDisplay
                  song={r.name}
                  artist={r.artists.join(', ')}
                  album={r.album}
                  img_link={r.albumArtURL}
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
                <PlatformDisplay
                  song={r.name}
                  artist={r.artists.join(', ')}
                  album={r.album}
                  platform={r.albumArtURL}
                />
              ))
            }
          </div>
        )
      }

    </div>
  );
}

export default App;
