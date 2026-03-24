import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fffffb',
        sand: '#efe8de',
        taupe: '#d8c9b5',
        bronze: '#6d6950',
        gold: '#c9a84c',
        espresso: '#2a2725',
        inksoft: '#6e6257',
        line: '#e7ddd1',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        didot: ['var(--font-eb-garamond)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(113, 89, 58, 0.10)',
        float: '0 24px 80px rgba(113, 89, 58, 0.18)',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(180deg, rgba(249,247,244,0.08) 0%, rgba(84,63,42,0.18) 40%, rgba(36,27,18,0.55) 100%)',
        'soft-radial': 'radial-gradient(circle at top, rgba(255,255,255,0.82), rgba(255,255,251,0.95) 48%, #fffffb 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
