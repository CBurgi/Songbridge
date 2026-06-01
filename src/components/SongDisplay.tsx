import { SongData } from "@/functions/objects";
import { classicNameResolver } from "typescript";

export default function SongDisplay({ song }: { song: SongData }) {
  return (

    <div className="
      flex
      p-7
    ">
      <div>
        <div className="flex flex-col bg-card border border-card-line shadow-2xs rounded-xl">
          <div className="bg-card border border-card-line shadow-2xs rounded-xl">
            <div className="p-4">
              <div className="
                flex
                flex-col
                items-center
                gap-6
                md:flex-row
                md:gap-8
                rounded-2xl
              ">
                <img
                  className="size-24 shadow-xl rounded-lg"
                  alt={`Album art for ${song.songItem.album}`}
                  src={song.albumArtURL} /
                >
                <div className="grid">
                  <span className="text-xl font-medium">{song.songItem.name}</span>
                  <span className="text-md font-medium text-sky-500">{song.songItem.artists.join(', ')}</span>
                  <span className="
                    flex
                    font-medium
                    text-gray-600
                    dark:text-gray-400
                  ">
                    {song.songItem.album}
                  </span>
                  {false &&
                    (
                      <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                        <span>No. 4</span>
                        <span>·</span>
                        <span>2025</span>
                      </span>
                    )
                  }
                </div>
              </div>
              <span className="p-2 flex flex-row gap-4">
                {
                  song.extURLs.map((p) => {
                    const platform = p.platform
                    return (
                      <img
                        className="size-10 shadow-md rounded-sm"
                        alt={`${platform} logo`}
                        src={`/images/${platform}.png`}
                      />
                    )
                  })
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
