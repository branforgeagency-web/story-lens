/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030304',
          DEFAULT: '#050505',
          charcoal: '#0A0A0C',
          surface: '#121216',
          border: 'rgba(255, 255, 255, 0.07)',
        },
        gold: {
          light: '#F5E298',
          champagne: '#D4AF37',
          antique: '#E5C158',
          muted: '#8A7029',
          border: 'rgba(212, 175, 55, 0.15)',
          glow: 'rgba(212, 175, 55, 0.25)',
        },
        silver: {
          DEFAULT: '#D1D5DB',
          muted: '#8E919A',
          dark: '#4B4D56',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Syne"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widestTechnical: '0.25em',
      },
      boxShadow: {
        'gold-subtle': '0 0 25px rgba(212, 175, 55, 0.12)',
        'gold-focused': '0 0 35px rgba(212, 175, 55, 0.25)',
        'obsidian-deep': '0 30px 60px -15px rgba(0, 0, 0, 0.85)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rec-blink': 'recBlink 1.4s ease-in-out infinite',
        'reticle-spin': 'spin 24s linear infinite',
      },
      keyframes: {
        recBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.15' },
        }
      }
    },
  },
  plugins: [],
}
