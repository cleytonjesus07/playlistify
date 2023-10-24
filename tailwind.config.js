/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary-color": "#f4c4d4",
        "secondary-color": "#ea92ab",
        "tertiary-color": "#af7fc2",
        "quaternary-color": "#9085d0",
        "quinary-color": "#8c76be",
        "senary-color": "#61567d"
      },
      animation: {
        toRight: "to-right 200ms linear forwards"
      },
      keyframes: {
        "to-right": {
          "from": {
            left: "-50%"
          },
          "to": {
            left: "1rem"
          }
        }
      }
    },
  },
  plugins: [],
}
