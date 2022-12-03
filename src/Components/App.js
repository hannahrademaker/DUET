import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Register from "./Register";
import Map from "./Map";
import Nav from "./Nav";
import Home from "./Home";
import LoggedOut from "./LoggedOut";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#12163F",
      contrastText: "#ED3DC9",
    },
    // secondary: {
    //   main:
    // }
  },
});

const App = () => {
  const { auth } = useSelector((state) => state);

  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={!!auth.id ? <Home /> : <LoggedOut />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
