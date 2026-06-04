import { parseSearchPath, searchObj } from '@/App';
import { states, type SongData } from '@/functions/objects';
import { update } from 'lodash';
import { useState, useRef, type SetStateAction, use, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBlock() {
  const [queryName, setQueryName] = useState('');
  const [queryArtists, setQueryArtists] = useState('');
  const [queryAlbum, setQueryAlbum] = useState('');
  const [queryURL, setQueryURL] = useState('');
  const navigate = useNavigate()
  const useLoc = useLocation()

  useEffect(() => {
    const path = useLoc.pathname.slice(1)
    if (!path) return
      else if (path.startsWith('search')) {
      const search: searchObj = parseSearchPath(path)
      setQueryName(search.name)
      setQueryArtists(search.artists.join(', '))
      setQueryAlbum(search.album)
    } else {
      setQueryURL(path)
    }
  }, [useLoc.pathname])

  function parseQueryArtists(artists: string): Array<string> {
    const artistArray = artists.split(/[,&]/).map((a) => a.trim())
    return artistArray
  }

  function updateURL() {
    if (queryURL) {
      navigate(`/${queryURL}`)
    } else {
      const nameQ = queryName ? `song:${queryName}` : ''
      const artistsQ = queryArtists ? `artists:${queryArtists}` : ''
      const albumQ = queryAlbum ? `album:${queryAlbum}` : ''
      const q = encodeURIComponent([nameQ, artistsQ, albumQ].join(' '))
      navigate(`/search/${q}`)
    }
  }

  return (
    <div className="
      flex
      flex-col
      gap-6
      p-7
    ">
      <div className="flex flex-col bg-card border border-card-line shadow-2xs rounded-xl">
        <div className="p-4  ">
          <form onSubmit={(e) => {
            e.preventDefault()
            updateURL();
          }} className="max-w-sm w-full space-y-3">
            <div className="relative">
              <input
                id="name-input"
                className="peer p-4 block w-full bg-layer border-layer-line rounded-lg sm:text-md text-foreground placeholder:text-transparent focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="name"
                value={queryName}
                onChange={(e) => setQueryName(e.target.value)}
              />
              <label
                htmlFor="name-input"
                className="absolute top-0 inset-s-0 p-4 h-full sm:text-md truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-foreground origin-top-left peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-80 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground-1 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground-1"
              >
                Song
              </label>
            </div>
            <div className="relative">
              <input
                id="artist-input"
                className="peer p-4 block w-full bg-layer border-layer-line rounded-lg sm:text-md text-foreground placeholder:text-transparent focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="artists"
                value={queryArtists}
                onChange={(e) => setQueryArtists(e.target.value)}
              />
              <label
                htmlFor="artist-input"
                className="absolute top-0 inset-s-0 p-4 h-full sm:text-md truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-foreground origin-top-left peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-80 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground-1 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground-1"
              >
                Artist
              </label>
            </div>
            <div className="relative">
              <input
                id="album-input"
                className="peer p-4 block w-full bg-layer border-layer-line rounded-lg sm:text-md text-foreground placeholder:text-transparent focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="album"
                value={queryAlbum}
                onChange={(e) => setQueryAlbum(e.target.value)}
              />
              <label
                htmlFor="album-input"
                className="absolute top-0 inset-s-0 p-4 h-full sm:text-md truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-foreground origin-top-left peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-80 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground-1 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground-1"
              >
                Album
              </label>
            </div>
            <div className="py-3 flex items-center text-sm text-stone-800 before:flex-1 before:border-t before:border-stone-800 before:me-6 after:flex-1 after:border-t after:border-stone-800 after:ms-6">OR</div>
            <div className="relative">
              <input
                id="url-input"
                className="peer p-4 block w-full bg-layer border-layer-line rounded-lg sm:text-md text-foreground placeholder:text-transparent focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="url"
                value={queryURL}
                onChange={(e) => setQueryURL(e.target.value)}
              />
              <label
                htmlFor="url-input"
                className="absolute top-0 inset-s-0 p-4 h-full sm:text-md truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-foreground origin-top-left peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-80 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground-1 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground-1"
              >
                Song Link
              </label>
            </div>
            <div className="inline-flex flex-wrap gap-2">
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus  disabled:opacity-50 disabled:pointer-events-none"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
