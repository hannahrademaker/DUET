import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, connect, useDispatch } from "react-redux";
import Register from "./Register";
import Map from "./Map";
import Feed from "./Feed";
import Event from "./Event";
import Nav from "./Nav";
import Home from "./Home";
import LoggedOut from "./LoggedOut";
import FriendRequests from "./FriendRequests";
import User from "./User";
import Chat from "./Chat";
import FriendPage from "./FriendPage";
import FoFList from "./FoFList";
import UserUpdate from "./UserUpdate";
import PasswordUpdate from "./PasswordUpdate";
import {
  fetchOnlineUsers,
  fetchAttending,
  fetchUsers,
  fetchFriendships,
} from "../store";

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
  const { auth, onlineUsers, attending } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchAttending());
      dispatch(fetchUsers());
      dispatch(fetchFriendships());
    }
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Routes>
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
        <Route path="/feed" element={!!auth.id ? <Feed /> : null} />
        <Route path="/" element={!!auth.id ? <Home /> : <LoggedOut />} />
        <Route path="/chat" element={!!auth.id ? <Chat /> : null} />
        <Route path="/event/:id" element={!!auth.id ? <Event /> : null} />
        <Route path="/users/:id" element={!!auth.id ? <FriendPage /> : null} />
        <Route
          path="/user/friendrequests"
          element={!!auth.id ? <FriendRequests /> : null}
        />
        <Route path="/foflist/:id" element={!!auth.id ? <FoFList /> : null} />
      </Routes>
    </ThemeProvider>
  );
};

export default connect((state) => state)(Socket);
