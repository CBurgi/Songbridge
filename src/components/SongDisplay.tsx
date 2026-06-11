import { SongData } from "@/functions/objects";
import { classicNameResolver } from "typescript";
import ScrollText from "./ScrollText";
import { identity } from "lodash";

export default function SongDisplay({ song }: { song: SongData }) {
  return (
    <>
    <div className="
      flex
      px-7
      p-3
      w-screen
    ">
      <div className="w-full flex border border-card-line shadow-2xs rounded-xl">
        <div className="w-full border border-card-line shadow-2xs rounded-xl">
          <div className="p-2">
            <div className="
                flex
                flex-row
                gap-4
              ">
              <img
                className="size-20 shadow-xl rounded-lg"
                alt={`Album art for ${song.songItem.album}`}
                src={song.albumArtURL} /
              >
              <div className="flex flex-col min-w-0 w-full">
                <ScrollText
                  id='name'
                  classes='text-xl font-md'
                  text={song.songItem.name}
                />
                <ScrollText
                  id='artists'
                  classes='font-md text-primary'
                  text={song.songItem.artists.join(', ')}
                />
                <ScrollText
                  id='album'
                  classes='font-md text-gray-600'
                  text={song.songItem.album}
                />
              </div>
            </div>
            <span className="py-2 px-1 flex flex-row gap-2">
              {
                song.extURLs.map((p, index: number) => {
                  const platform = p.platform
                  return (
                    <img
                      id={index.toString()}
                      className="size-9 shadow-md rounded-sm"
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
    </>
  )
}
