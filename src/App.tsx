import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmptySongData, pages, SongData, states } from './functions/objects';

import About from './pages/About';
import Header from './components/Header';
import SupportedPlatforms from './pages/SupportedPlatforms';
import Search from './pages/Search';

export function App() {
  const useLoc = useLocation();

  const [page, setPage] = useState(pages.search);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
    const path = useLoc.pathname.slice(1)
    if (path === pages.supportedPlatforms)
      setPage(pages.supportedPlatforms)
    else if (path === pages.about)
      setPage(pages.about)
    else
      setPage(pages.search)
  }, [useLoc]);


  function Page() {
    switch (page) {
      case pages.about:
        return (
          <About />
        )
      case pages.supportedPlatforms:
        return (
          <SupportedPlatforms />
        )

      default:
        return (
          <Search />
        )
    }
  }

  return (
    <div className="w-sm mx-auto flex-col justify-center">
      <Header page={page}/>

      <Page />
    </div>
  );
}

export default App;
