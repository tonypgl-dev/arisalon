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
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 16px rgba(42,39,37,0.06), 0 1px 3px rgba(42,39,37,0.04)',
        elegant: '0 4px 24px rgba(42,39,37,0.08), 0 1px 4px rgba(42,39,37,0.04)',
        float: '0 8px 40px rgba(42,39,37,0.10), 0 2px 6px rgba(42,39,37,0.05)',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(180deg, rgba(249,247,244,0.08) 0%, rgba(84,63,42,0.18) 40%, rgba(36,27,18,0.55) 100%)',
        'soft-radial': 'radial-gradient(circle at top, rgba(255,255,255,0.82), rgba(255,255,251,0.95) 48%, #fffffb 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
