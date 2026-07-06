import { SongData, PlatformLinks, PlatformLinkObj } from "@/functions/objects";
import { classicNameResolver } from "typescript";
import ScrollText from "./ScrollText";
import { identity } from "lodash";

export default function PlatformSupportedDisplay() {
  return (
    <>
      {
        PlatformLinks.map((p) => (
          <a className="w-full" href={p.link} rel="external" key={self.crypto.randomUUID()}>
          <div className=" flex px-7 p-3">
            <div className="w-full flex border border-card-line shadow-2xs rounded-xl">
              <div className={`w-full border border-card-line shadow-2xs rounded-xl ${p.supported ? '' : 'bg-gray-400'}`}>
                <div className="p-2">
                  <div className=" flex flex-row gap-4">
                    <img
                      className={`size-16 shadow-xl rounded-lg ${p.supported ? '' : 'brightness-50'}`}
                      alt={`Logo for ${p.platformName}`}
                      src={`/images/${p.platform}.png`} /
                    >
                    <div className="flex flex-col min-w-0 w-full">
                      <ScrollText
                        id='name'
                        classes='text-md font-semibold'
                        text={p.platformName}
                      />
                      <ScrollText
                        id='link'
                        classes='font-sm text-gray-600'
                        text={p.link}
                      />
                      <ScrollText
                        id='extra_text'
                        classes='font-sm text-red-800'
                        text={p.extra_text}
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
