import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useLocation } from "react-router-dom";

import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import onlineUsers from "../store/onlineUsers";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

const socket = io.connect("http://localhost:3001");

const drawerWidth = 240;

export default function Chat() {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("Join a Channel");
  const [showChat, setShowChat] = useState(false);
  const { onlineUsers } = useSelector((state) => state);
  const location = useLocation();
  let from;

  useEffect(() => {
    setUsername(auth.username);
  });

  useEffect(() => {
    joinRoom();
  }, [room]);

  if (location.state) {
    const { from } = location.state;
    console.log(from);
  }

  if (from) {
    return setRoom(from);
  }

  const channels = [
    { label: "All", value: "All" },
    { label: "Music", value: "Music" },
    { label: "Sports", value: "Sports" },
    { label: "Arts & Theatre", value: "Arts & Theatre" },
    { label: "Film", value: "Film" },
    { label: "Miscellaneous", value: "Miscellaneous" },
  ];

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", room);
    }
  };

  const leaveRoom = () => {
    socket.emit("leave", room);
    setRoom("");
  };

  const roomName = (a, b) => {
    const list = [a, b].sort();
    return (
      list[0].slice(0, 1).toUpperCase(0, 1) +
      list[0].slice(1) +
      ", " +
      list[1].slice(0, 1).toUpperCase(0, 1) +
      list[1].slice(1)
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          top: "100",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="h1"
            style={{ color: "#00c4cc", margin: "auto" }}
          >
            {room}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: 100,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ margin: "auto" }}
          >
            <Button onClick={leaveRoom}>
              <NoMeetingRoomIcon />
              &nbsp; Exit Chat
            </Button>
          </Typography>
        </Toolbar>
        <Divider />
        <Typography className="chatCategory">
          <ForumIcon />
          &nbsp; Channels
        </Typography>
        <List>
          {channels.map((channel) => {
            return (
              <ListItem key={channel.value}>
                <Button
                  variant="text"
                  style={{ justifyContent: "flex-start", width: "100%" }}
                  value={channel.value}
                  onClick={() => {
                    setRoom(channel.value);
                  }}
                >
                  {channel.label}
                </Button>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Typography className="chatCategory">
          <PeopleIcon />
          &nbsp; Online Users{" "}
          {onlineUsers.length ? `(${onlineUsers.length})` : null}
        </Typography>
        <List>
          {onlineUsers.length
            ? onlineUsers.map((user) => {
                return (
                  <ListItem key={user.id}>
                    <Button
                      variant="text"
                      style={{ justifyContent: "flex-start", width: "100%" }}
                      value={roomName(username, user.username)}
                      onClick={(ev) => setRoom(event.target.value)}
                    >
                      {user.username}
                    </Button>
                  </ListItem>
                );
              })
            : null}
        </List>
      </Drawer>
      <Box
        className="chat-window"
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default" }}
      >
        <Toolbar />
        <ChatRoom socket={socket} username={username} room={room} />
      </Box>
    </Box>
  );
}
