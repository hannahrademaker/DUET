import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import { Grid } from "@mui/material";
import onlineUsers from "../store/onlineUsers";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";
import { Typography } from "@mui/material";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("Join a Channel");
  const [showChat, setShowChat] = useState(false);
  const { onlineUsers } = useSelector((state) => state);

  useEffect(() => {
    setUsername(auth.username);
  });

  useEffect(() => {
    joinRoom();
  }, [room]);

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
    <div className="ChatApp">
      <Grid container spacing={0} sx={{ width: 1 }}>
        <Grid item xs={2}>
          <div className="chat-sidebar">
            <Typography
              variant="h6"
              component="h1"
              style={{ textAlign: "left", paddingLeft: "1rem" }}
            >
              <ForumIcon />
              &nbsp; Channels
            </Typography>
            <ul>
              {channels.map((channel) => {
                return (
                  <li key={channel.value}>
                    <Button
                      variant="text"
                      style={{ justifyContent: "flex-start" }}
                      value={channel.value}
                      onClick={() => {
                        setRoom(channel.value);
                      }}
                    >
                      {channel.label}
                    </Button>
                  </li>
                );
              })}
            </ul>

            <Typography
              variant="h6"
              component="h1"
              style={{ textAlign: "left", paddingLeft: "1rem" }}
            >
              <PeopleIcon />
              &nbsp; Online Users{" "}
              {onlineUsers.length ? `(${onlineUsers.length})` : null}
            </Typography>
            <ul>
              {onlineUsers.length
                ? onlineUsers.map((user) => {
                    return (
                      <li key={user.id}>
                        <Button
                          variant="text"
                          style={{ justifyContent: "flex-start" }}
                          value={roomName(username, user.username)}
                          onClick={(ev) => setRoom(event.target.value)}
                        >
                          {user.username}
                        </Button>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </Grid>
        <Grid item xs={10} className="chat-window">
          <ChatRoom socket={socket} username={username} room={room} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
