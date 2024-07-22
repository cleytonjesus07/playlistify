/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'background': '#000',
      'darkgray': '#121212',
      'unselected': '#a7a7a7'
    },
    extend: {
      animation: {
        "toShow": "toUpAndShow 200ms ease-in forwards",
        "toHide": "toDownAndHide 200ms ease-in forwards"
      },
      keyframes: {
        "toUpAndShow": {
          'from': { opacity: "0", bottom: "90px", visibilty: 'hidden' },
          'to': { opacity: "1", bottom: "100px", visibilty: 'visible' }
        },
        "toDownAndHide": {
          'from': { opacity: "1", bottom: "100px", visibilty: 'visible' },
          'to': { opacity: "0", bottom: "90px", visibilty: 'hidden' }
        }
      }

    }
  },
  plugins: [],
};
