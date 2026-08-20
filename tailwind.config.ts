import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#171717',
        'carbon-light': '#2a2a2a',
        'carbon-mid': '#3a3a3a',
        offwhite: '#F5F3EE',
        sand: '#D8D0C3',
        terracota: '#B85C38',
        'terracota-light': '#c96a44',
        olive: '#4F5A45',
        'text-primary': '#F5F3EE',
        'text-secondary': '#D8D0C3',
        'text-muted': '#9a9189',
        border: 'rgba(216, 208, 195, 0.15)',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: { content: '1200px' },
    },
  },
  plugins: [],
};

export default config;
