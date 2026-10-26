/**
 * OpenCode 2026 - Japanese Editorial & Minimalist Design Tokens
 * Principles: Ma (間, negative space), Kanso (簡素, simplicity), Seijaku (静寂, calm restraint)
 * Accent: Vermilion / Shu (#C8412B) - single signature accent token
 */

export const opencodeTokens = {
  colors: {
    // Backgrounds & Surfaces (Warm Washi & Natural Paper)
    background: {
      base: 'var(--bg)',
      surface: 'var(--surface)',
      surfaceRaised: 'var(--surface-raised)',
      subtle: 'var(--surface-subtle)',
      glassDark: 'var(--surface)',
      glassLight: 'var(--surface-subtle)',
    },
    // Single Accent: Vermilion / Shu (#C8412B)
    accent: {
      primary: 'var(--accent)',
      hover: 'var(--accent-hover)',
      soft: 'var(--accent-soft)',
      ink: 'var(--accent-ink)',
      hairline: 'var(--accent-hairline)',
      sakura: 'var(--accent)',
      sakuraHover: 'var(--accent-hover)',
    },
    // Neutral Text Hierarchy (Sumi Ink)
    text: {
      primary: 'var(--fg)',
      secondary: 'var(--muted)',
      subtle: 'var(--subtle)',
      inverse: 'var(--accent-ink)',
    },
    // Hairline Dividers & Borders
    border: {
      light: 'var(--border-light)',
      primary: 'var(--border)',
      medium: 'var(--border)',
      strong: 'var(--border-strong)',
      accent: 'var(--border-accent)',
    },
    // Status Indicators (Subtle & Dignified, No Neon)
    status: {
      live: {
        bg: 'var(--status-live-bg)',
        text: 'var(--status-live-text)',
        border: 'var(--status-live-border)',
      },
      upcoming: {
        bg: 'var(--status-upcoming-bg)',
        text: 'var(--status-upcoming-text)',
        border: 'var(--status-upcoming-border)',
      },
      concluded: {
        bg: 'var(--status-concluded-bg)',
        text: 'var(--status-concluded-text)',
        border: 'var(--status-concluded-border)',
      },
    },
    // Leaderboard Medals (Muted Natural Metals)
    rank: {
      gold: '#C88A2B',
      silver: '#7A8288',
      bronze: '#9E6446',
    },
  },
  typography: {
    fontFamily: 'var(--f-body), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'var(--f-display), "Shippori Mincho", "Noto Serif JP", serif',
    jp: 'var(--f-jp), "Shippori Mincho", "Noto Serif JP", serif',
    mono: 'var(--f-mono), "DM Mono", ui-monospace, Menlo, monospace',
    letterSpacing: {
      tighter: '-0.02em',
      normal: '0',
      wide: '0.08em',
      wider: '0.14em',
      widest: '0.22em',
    },
  },
  borders: {
    hairline: '1px solid var(--border)',
    radius: {
      none: '0px',
      xs: '2px',
      sm: '3px',
      md: '4px', // Maximum corner radius as required by modern Japanese minimalism
      lg: '4px',
      full: '4px',
    },
  },
  shadows: {
    none: 'none',
    subtle: 'var(--shadow-subtle)',
    card: 'var(--shadow-card)',
    glass: 'none',
  },
  transitions: {
    default: '180ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type OpencodeTokens = typeof opencodeTokens;
