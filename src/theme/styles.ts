import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export const globalStyles = {
  fonts: {
    heading: "var(--f-display), 'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
    body: "var(--f-body), 'Zen Kaku Gothic New', 'Noto Sans JP', 'DM Sans', sans-serif",
    mono: "var(--f-mono), 'DM Mono', monospace",
  },
  colors: {
    brand: {
      50: '#FDF2F0',
      100: '#F9D6D0',
      200: '#F2AEA3',
      300: '#E87D6B',
      400: '#DA553E',
      500: '#C8412B', // Vermilion / Shu
      600: '#A83522',
      700: '#872A1B',
      800: '#661F14',
      900: '#47140C',
    },
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
    secondaryGray: {
      100: '#EFECE5',
      200: '#DDD8CE',
      300: '#BCB6AA',
      400: '#948F86',
      500: '#6B6760',
      600: '#42403C',
      700: '#2A2927',
      800: '#1C1B1A',
      900: '#141413',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        overflowX: 'hidden',
        bg: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: "var(--f-body)",
        lineHeight: '1.75',
        letterSpacing: 'normal',
      },
      input: {
        color: 'var(--fg)',
      },
      html: {
        fontFamily: "var(--f-body)",
      },
    }),
  },
};
