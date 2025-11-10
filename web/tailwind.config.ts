import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1F3B',
          green: '#2E7D6A',
          blue: '#1C6DD0',
        }
      }
    },
  },
  plugins: [],
} satisfies Config

