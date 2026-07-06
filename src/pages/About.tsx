import ExternalPlatformDisplay from "@/components/ExternalPlatformDisplay";

export default function About() {
  const link_style = 'underline underline-offset-1 text-blue-600 visited:text-purple-800 focus:text-purple-800'
  return (
    <>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">
        About
      </p>
      <p>
        Hi! This is a web app I made to be able to share songs with people,
        regardless of what streaming platform they use.
        You can use the search form to find a specific song,
        or just add '<text className='font-semibold' >songbridge.ca/ </text>'
        in front of any song link you want
        to share, assuming the link is from a supported platform.
        If you want to see the list of supported plaforms,
        you can check out the page for that!
      </p>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">
        About the Author
      </p>
      <p>
        Nicholas (Cole) Burgi recently graduated from the University of Guelph's
        Computer Engineering program and is a big fan of music, so he wanted to
        make it easier to share music with others.
      </p>
      <p className="font-semibold">
        More about him can be found below:
      </p>
      <ExternalPlatformDisplay />
      <p className="text-2xl font-bold pt-3 pb-3 text-center">
        Details for nerds
      </p>
      <p>
        This web app uses
        <text> </text>
        <a className={link_style} href="https://react.dev/">React</a>
        <text> </text>
        and
        <text> </text>
        <a className={link_style} href="https://tailwindcss.com/">TailwindCSS</a>
        <text> </text>
        for the Front End,
        and
        <text> </text>
        <a className={link_style} href="https://bun.sh/">Bun</a>
        <text> </text>
        for the Back End... all with
        <text> </text>
        <a className={link_style} href="https://www.typescriptlang.org/">TypeScript</a>
        . The pages and queries are all handled via the URL so they can
        be manually set by the user, allowing for the above mentioned
        ability to add the site name before a link to search with it.
      </p>
    </>
  )
}
