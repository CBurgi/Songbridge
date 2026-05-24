import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SongDisplay from './components/SongDisplay'
import SearchBlock from './components/SearchBlock';

export function App() {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div>
      <span className="font-sans font-bold text-lg">Songbridge</span>
      <p className="text-sm">
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <SearchBlock/>
      <SongDisplay
        song="50 Ways to Say Goodbye"
        artist="Train"
        album="California 37"
        img_link="https://i.scdn.co/image/ab67616d0000b273bde344cc54eedc35050f4c61"
      />
    </div>
  );
}

export default App;
