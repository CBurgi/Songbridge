import { useState, useRef } from 'react';

export default function SearchBlock() {
  const [querySong, setQuerySong] = useState('');
  const [queryArtist, setQueryArtist] = useState('');
  const [queryAlbum, setQueryAlbum] = useState('');
  const [queryURL, setQueryURL] = useState('');

  const submitForm = async () => {
    try {
    const url = new URL("/api/getSongs", location.href);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        song: querySong,
        artist: queryArtist,
        album: queryAlbum,
        url: queryURL,
      })
    });

    const data = await response.json();
    console.log(JSON.stringify(data));
    } catch (error) {
      console.log(String(error));
    }
  };

  return (
    <div className="
      flex
      flex-col
      gap-6
      p-7
    ">
      <div className="flex flex-col bg-card border border-card-line shadow-2xs rounded-xl">
        <div className="p-4  ">
          <div className="max-w-sm w-full space-y-3">
            <div className="relative">
              <input
                id="song-input"
                className="peer p-4 block w-full bg-layer border-layer-line rounded-lg sm:text-md text-foreground placeholder:text-transparent focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="song"
                value={querySong}
                onChange={(e) => setQuerySong(e.target.value)}
              />
              <label
                htmlFor="song-input"
                className="absolute top-0 inset-s-0 p-4 h-full sm:text-md truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-foreground origin-top-left peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-80 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-muted-foreground-1 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-muted-foreground-1"
              >
                Song
              </label>
            </div>
            <div className="relative">
              <input
                id="artist-input"
                className="peer p-4 block w-full bg-layer border-layer-line rounded-lg sm:text-md text-foreground placeholder:text-transparent focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="artist"
                value={queryArtist}
                onChange={(e) => setQueryArtist(e.target.value)}
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
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus  disabled:opacity-50 disabled:pointer-events-none"
                onClick={submitForm}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
