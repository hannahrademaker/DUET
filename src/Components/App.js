import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Register from "./Register";
import Map from "./Map";
import Event from "./Event";
import Nav from "./Nav";
import Home from "./Home";
import LoggedOut from "./LoggedOut";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import UserUpdate from "./UserUpdate";
import User from "./User";
import PasswordUpdate from "./PasswordUpdate";
import FriendPage from "./FriendPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#12163F",
      contrastText: "#ED3DC9",
    },
    secondary: {
      main: "#00c4cc",
    },
    error: {
      main: "#E43397",
    },
    success: {
      main: "#00C4CC",
    },
  },
});

const App = () => {
  const { auth } = useSelector((state) => state);

  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Routes>
        {/* <Route path="/map" element={!!auth.id ? <Map /> : null} /> */}
        <Route path="/user" element={!!auth.id ? <User /> : null} />
        <Route
          path="/user/update"
          element={!!auth.id ? <UserUpdate /> : null}
        />
        <Route
          path="/user/password"
          element={!!auth.id ? <PasswordUpdate /> : null}
        />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={!!auth.id ? <Home /> : <LoggedOut />} />
        <Route path="/users/:id" element={<FriendPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
