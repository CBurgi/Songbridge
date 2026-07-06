export default function About() {
  return (
    <>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">
        About
      </p>
      <p>
        Hi! This is a web app I made to be able to share songs with people,
        regardless of what streaming platform they use.
        You can use the search form to find a specific song,
        or just add 'songbridge.ca/' in front of any song link you want
        to share, assuming the link is from a supported platform.
        If you want to see the list of supported plaforms,
        you can check out the page for that!
      </p>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">
        About the Author
      </p>
      <p>
      </p>
      <p className="text-2xl font-bold pt-6 pb-3 text-center">
        Details for nerds
      </p>
      <p>
        This web app uses
        <a href="https://react.dev/"> React </a>
        and
        <a href="https://tailwindcss.com/"> TailwindCSS </a>
        for the Front End,
        and
        <a href="https://bun.sh/"> Bun </a>
        for the Back End... all with
        <a href="https://www.typescriptlang.org/"> TypeScript</a>
        . The pages and queries are all handled via the URL so they can
        be manually set by the user, allowing for the above mentioned
        ability to add the site name before a link to search with it.
      </p>
    </>
  )
}
