import { pages } from "@/functions/objects"
import { useLocation } from "react-router-dom"

export default function Header({page}: {page: string}) {
  const thisPageStyle: string = "text-lg font-medium text-primary-active"
  const otherPageStyle: string = "text-md text-navbar-nav-foreground"

  function getAStyle(link: string): string {
    return (
      link === page
        ? thisPageStyle
        : otherPageStyle
    )
  }
  type HsLinkObj = {
    pageName: string;
    link: string
  }
  const HsLink = ({pageName, link}: HsLinkObj) => {
    return (
      < a
        className={getAStyle(link)}
        href={`/${link}`}
        aria-current="page"
      >{pageName}</a>
    )
  }

  return (
    <>
      <header className=" relative flex justify-start flex-nowrap w-full py-3 bg-navbar border-b border-navbar-line ">
        <nav className="max-w-340 w-full px-4">
          <div className="flex w-full items-center justify-between">
            <a href="/" aria-label="Brand">
              <img className="size-10 rounded-md" src="/images/logo.png" alt="Logo" />
            </a>
            <a href="/" aria-label="Brand">
              <p className="text-xl font-bold text-center">SongBridge</p>
            </a>
            <button type="button" className=" hs-collapse-toggle relative size-10 flex justify-center items-center gap-x-2 rounded-lg bg-layer border border-layer-line text-layer-foreground shadow-2xs " id="hs-navbar-collapse" aria-expanded="false" aria-controls="hs-navbar" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar">
              <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
              <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <div id="hs-navbar" className=" hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow block " aria-labelledby="hs-navbar-collapse" role="region">
            <div className=" flex gap-5 pt-2 flex-row items-center justify-center mt-0 ps-5 ">
              <HsLink link={pages.search} pageName='Search' />
              <p className="text-stone-400">|</p>
              <HsLink link={pages.about} pageName='About' />
              <p className="text-stone-400">|</p>
              <HsLink link={pages.supportedPlatforms} pageName='Supported Platforms' />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
