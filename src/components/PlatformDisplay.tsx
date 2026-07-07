import { PlatformLinks, SongData } from "@/functions/objects";
import { classicNameResolver } from "typescript";
import ScrollText from "./ScrollText";
import { identity } from "lodash";

export default function PlatformDisplay({ song }: { song: SongData }) {
  return (
    <>
      {
        song.extURLs.map((e) => {
          const p = PlatformLinks.find((p) => p.platform === e.platform)
          return (
            <a className="w-full" href={e.URL} rel="external" key={self.crypto.randomUUID()} >
              <div className=" flex px-7 p-3 ">
                <div className="w-full flex border border-card-line shadow-2xs rounded-xl">
                  <div className="w-full border border-card-line shadow-2xs rounded-xl">
                    <div className="p-2">
                      <div className=" flex flex-row gap-4 ">
                        <img
                          className="size-16 shadow-xl rounded-lg"
                          alt={`Logo for ${p?.platform}`}
                          src={`/images/${p?.platform}.${p?.imageType}`} /
                        >
                        <div className="flex flex-col min-w-0 w-full">
                          <ScrollText
                            id='name'
                            classes='text-md font-semibold '
                            text={song.songItem.name}
                          />
                          <ScrollText
                            id='artists'
                            classes='text-sm text-primary'
                            text={song.songItem.artists.join(', ')}
                          />
                          <ScrollText
                            id='album'
                            classes='text-sm text-gray-600'
                            text={song.songItem.album}
                          />
                        </div>
                      </div>
                      <ScrollText
                        id='link'
                        classes='text-sm text-gray-600'
                        text={e.URL}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )
        })}
    </>
  )
}
