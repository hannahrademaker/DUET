import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Register from "./Register";
import Map from "./Map";
import Event from "./Event";
import Nav from "./Nav";
import Home from "./Home";
import LoggedOut from "./LoggedOut";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import UserUpdate from "./UserUpdate";
import User from "./User";
import PasswordUpdate from "./PasswordUpdate";
import Chat from "./Chat";
import { fetchOnlineUsers } from "../store";
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

class Socket extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.auth.id && !this.props.auth.id) {
      window.socket.close();
    }
    if (!prevProps.auth.id && this.props.auth.id) {
      window.socket = io();
      window.socket.emit("auth", window.localStorage.getItem("token"));
      this.props.dispatch(fetchOnlineUsers());
      window.socket.on("userEntered", (user) => {
        this.props.dispatch({ type: "USER_ENTERED", user });
      });
      window.socket.on("userLeft", (user) => {
        this.props.dispatch({ type: "USER_LEFT", user });
      });
    }
  }
  render() {
    return <App />;
  }
}

const App = () => {
  const { auth, onlineUsers } = useSelector((state) => state);

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
        <Route path="/chat" element={!!auth.id ? <Chat /> : null} />
        <Route path="/event/:id" element={!!auth.id ? <Event /> : null} />
        <Route path="/users/:id" element={<FriendPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default connect((state) => state)(Socket);
