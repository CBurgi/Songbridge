import { PlatformLinks } from "@/functions/objects"
import ScrollText from "@/components/ScrollText"
import PlatformSupportedDisplay from "@/components/PlatformSupportedDisplay"

export default function SupportedPlatforms() {
  return (
    <>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">Supported Platforms</p>
      
      <PlatformSupportedDisplay />
    </>
  )
}
