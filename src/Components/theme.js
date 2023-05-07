import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#848598",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#E57373",
    },
    success: {
      main: "#81C784",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        borderRadius: "12px",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
