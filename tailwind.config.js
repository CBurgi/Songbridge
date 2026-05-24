/** @type {import('tailwindcss').Config} */
export default{
  content: ["./src/**/*.{html,js,tsx,ts}"], //you can also add jsx and any other file types that you need to style with tailwind
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  experimental: {
    applyComplexClasses: true,
  },
}
