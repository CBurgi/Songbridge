import { PlatformLinks } from "@/functions/objects"
import ScrollText from "@/components/ScrollText"

export default function SupportedPlatforms() {
  return (
    <>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">Supported Platforms</p>
      {
        PlatformLinks.map((p) => (
          <>
            <div className=" flex px-7 p-3 w-screen ">
              <div className="w-full flex border border-card-line shadow-2xs rounded-xl">
                <div className="w-full border border-card-line shadow-2xs rounded-xl">
                  <div className="p-2">
                    <div className=" flex flex-row gap-4 ">
                      <img
                        className="size-20 shadow-xl rounded-lg"
                        alt={`Logo for ${p.platform}`}
                        src={`/images/${p.platform}.png`} /
                      >
                      <div className="flex flex-col min-w-0 w-full">
                        <ScrollText
                          id='name'
                          classes='text-xl font-md'
                          text={p.platformName}
                        />
                        <ScrollText
                          id='link'
                          classes='font-md text-gray-600'
                          text={p.link}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  )
}
