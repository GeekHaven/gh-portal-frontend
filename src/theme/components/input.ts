import { StyleFunctionProps } from "@chakra-ui/theme-tools";

export const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "4px",
          fontFamily: "var(--f-body)",
          _focusVisible: {
            borderColor: "var(--accent)",
            boxShadow: "none",
            outline: "2px solid var(--accent)",
            outlineOffset: "1px",
          },
        },
      },

      variants: {
        main: () => ({
          field: {
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--fg)",
            borderRadius: "4px",
            fontSize: "sm",
            p: "10px 14px",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
        }),
        auth: () => ({
          field: {
            fontWeight: "400",
            color: "var(--fg)",
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
        }),
        authSecondary: () => ({
          field: {
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
        }),
        search: () => ({
          field: {
            border: "none",
            py: "8px",
            borderRadius: "4px",
            _placeholder: { color: "var(--muted)" },
          },
        }),
      },
    },
    NumberInput: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "4px",
          fontFamily: "var(--f-body)",
          _focusVisible: {
            borderColor: "var(--accent)",
            boxShadow: "none",
            outline: "2px solid var(--accent)",
            outlineOffset: "1px",
          },
        },
      },

      variants: {
        main: () => ({
          field: {
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--fg)",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
        }),
        auth: () => ({
          field: {
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--fg)",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
        }),
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "4px",
          fontFamily: "var(--f-body)",
          _focusVisible: {
            borderColor: "var(--accent)",
            boxShadow: "none",
            outline: "2px solid var(--accent)",
            outlineOffset: "1px",
          },
        },
      },

      variants: {
        main: () => ({
          field: {
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--fg)",
            borderRadius: "4px",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
          icon: {
            color: "var(--muted)",
          },
        }),
        auth: () => ({
          field: {
            bg: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--fg)",
            borderRadius: "4px",
            _placeholder: { color: "var(--muted)" },
            _hover: {
              borderColor: "var(--border-strong)",
            },
          },
          icon: {
            color: "var(--muted)",
          },
        }),
      },
    },
  },
};
