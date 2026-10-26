import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "4px",
        fontFamily: "var(--f-body), sans-serif",
        fontWeight: "500",
        transition: "all 0.18s ease",
        boxSizing: "border-box",
        boxShadow: "none",
        _focus: {
          boxShadow: "none",
        },
        _focusVisible: {
          outline: "2px solid var(--accent)",
          outlineOffset: "2px",
        },
        _active: {
          boxShadow: "none",
        },
      },
      variants: {
        outline: () => ({
          borderRadius: "4px",
          border: "1px solid var(--border)",
          bg: "var(--surface)",
          color: "var(--fg)",
          boxShadow: "none",
          _hover: {
            bg: "var(--surface-2)",
            borderColor: "var(--border-strong)",
            color: "var(--fg)",
          },
        }),
        brand: (props: StyleFunctionProps) => ({
          bg: "var(--accent)",
          color: "var(--accent-ink)",
          borderRadius: "4px",
          border: "1px solid var(--accent)",
          boxShadow: "none",
          _hover: {
            bg: "var(--accent-hover)",
            borderColor: "var(--accent-hover)",
          },
          _active: {
            bg: "var(--accent-hover)",
          },
        }),
        darkBrand: () => ({
          bg: "var(--fg)",
          color: "var(--bg)",
          borderRadius: "4px",
          boxShadow: "none",
          _hover: {
            opacity: 0.9,
          },
        }),
        lightBrand: () => ({
          bg: "var(--accent-soft)",
          color: "var(--accent)",
          borderRadius: "4px",
          border: "1px solid var(--border-accent)",
          boxShadow: "none",
          _hover: {
            bg: "var(--accent)",
            color: "var(--accent-ink)",
          },
        }),
        light: () => ({
          bg: "var(--surface-2)",
          color: "var(--fg)",
          borderRadius: "4px",
          border: "1px solid var(--border)",
          boxShadow: "none",
          _hover: {
            borderColor: "var(--border-strong)",
          },
        }),
        action: () => ({
          fontWeight: "500",
          borderRadius: "4px",
          bg: "var(--accent-soft)",
          color: "var(--accent)",
          boxShadow: "none",
          _hover: {
            bg: "var(--accent)",
            color: "var(--accent-ink)",
          },
        }),
        setup: () => ({
          fontWeight: "500",
          borderRadius: "4px",
          bg: "transparent",
          border: "1px solid var(--border)",
          color: "var(--fg)",
          boxShadow: "none",
          _hover: {
            bg: "var(--surface-2)",
          },
        }),
        secondary: () => ({
          bg: "var(--surface)",
          color: "var(--fg)",
          borderRadius: "4px",
          fontWeight: "500",
          border: "1px solid var(--border)",
          boxShadow: "none",
          _hover: {
            bg: "var(--surface-2)",
            borderColor: "var(--border-strong)",
          },
        }),
      },
    },
  },
};
