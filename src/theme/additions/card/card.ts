import { StyleFunctionProps } from "@chakra-ui/theme-tools";
const Card = {
  baseStyle: (props: StyleFunctionProps) => ({
    p: "24px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    borderRadius: "var(--r)",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: 'var(--surface)',
    color: 'var(--fg)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
    backgroundClip: "border-box",
  }),
};

export const CardComponent = {
  components: {
    Card,
  },
};
