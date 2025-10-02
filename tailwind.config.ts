import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['var(--font-plus-jakarta)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0044B5',
          dark: '#003399',
        },
        secondary: {
          DEFAULT: '#00B191',
          dark: '#00997A',
        },
        text: {
          primary: '#202124',
          secondary: '#5F6368',
        },
      },
      fontSize: {
        'button-s': ['16px', '130%'],
      },
      fontWeight: {
        'button': '700',
      },
    },
  },
  plugins: [],
}

export default config