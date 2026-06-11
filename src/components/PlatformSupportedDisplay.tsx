import { SongData } from "@/functions/objects";
import { classicNameResolver } from "typescript";
import ScrollText from "./ScrollText";
import { identity } from "lodash";

type platformSupportedDisplayObject = {
  platform: string;
  link: string;
}
export default function PlatformSupportedDisplay({ platform, link }: platformSupportedDisplayObject) {
  return (
    <>
          <a href={link} rel="external" >
          <div className=" flex px-7 p-3 w-screen ">
            <div className="w-full flex border border-card-line shadow-2xs rounded-xl">
              <div className="w-full border border-card-line shadow-2xs rounded-xl">
                <div className="p-2">
                  <div className=" flex flex-row gap-4 ">
                    <img
                      className="size-20 shadow-xl rounded-lg"
                      alt={`Logo for ${platform}`}
                      src={`/images/${platform}.png`} /
                    >
                    <div className="flex flex-col min-w-0 w-full">
                      <ScrollText
                        id='name'
                        classes='text-xl font-md'
                        text={platform}
                      />
                      <ScrollText
                        id='link'
                        classes='font-md text-gray-600'
                        text={link}
                      />
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </a>
    </>
  )
}
