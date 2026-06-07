import { SongData } from "@/functions/objects";
import { classicNameResolver } from "typescript";
import ScrollText from "./ScrollText";
import { identity } from "lodash";

export default function PlatformDisplay({ song }: { song: SongData }) {
  return (
    <>
      {
        song.extURLs.map((e) => (
          <a href={e.URL} rel="external" >
          <div className=" flex p-7 w-screen ">
            <div className="w-full flex border border-card-line shadow-2xs rounded-xl">
              <div className="w-full border border-card-line shadow-2xs rounded-xl">
                <div className="p-2">
                  <div className=" flex flex-row gap-4 ">
                    <img
                      className="size-20 shadow-xl rounded-lg"
                      alt={`Logo for ${e.platform}`}
                      src={`/images/${e.platform}.png`} /
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
                      <ScrollText
                        id='link'
                        classes='font-md text-gray-600'
                        text={e.URL}
                      />
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </a>
        ))}
    </>
  )
}
