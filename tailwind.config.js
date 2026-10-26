/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--f-display)', 'Shippori Mincho', 'Noto Serif JP', 'Georgia', 'serif'],
        sans: ['var(--f-body)', 'Zen Kaku Gothic New', 'Noto Sans JP', 'DM Sans', 'sans-serif'],
        mono: ['var(--f-mono)', 'DM Mono', 'monospace'],
        jp: ['var(--f-jp)', 'Shippori Mincho', 'Noto Serif JP', 'serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        'terminal-bg': 'var(--terminal-bg)',
        'terminal-fg': 'var(--terminal-fg)',
        washi: {
          50: '#FAF9F6',
          100: '#F7F5F0',
          200: '#EFECE5',
          300: '#E5E1D8',
          400: '#DDD8CE',
        },
        sumi: {
          900: '#1C1B1A',
          800: '#2A2927',
          700: '#42403C',
          600: '#6B6760',
          500: '#948F86',
          400: '#B8B3AA',
        },
        vermilion: {
          DEFAULT: '#C8412B',
          hover: '#A83522',
          soft: 'rgba(200, 65, 43, 0.08)',
          hairline: 'rgba(200, 65, 43, 0.25)',
        },
        muted: {
          DEFAULT: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          text: 'var(--accent-text)',
          hover: 'var(--accent-hover)',
          ink: 'var(--accent-ink)',
          soft: 'var(--accent-soft)',
        },
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};