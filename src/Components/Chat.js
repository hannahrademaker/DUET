import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import FormControl from "@mui/material";
import InputLabel from "@mui/material";
import NativeSelect from "@mui/material";
import MenuItem from "@mui/material";
import { Grid } from "@mui/material";
import onlineUsers from "../store/onlineUsers";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("All");
  const [showChat, setShowChat] = useState(false);
  const { onlineUsers } = useSelector((state) => state);

  useEffect(() => {
    setUsername(auth.username);
  });

  const channels = [
    { label: "All", value: "All" },
    { label: "Music", value: "Music" },
    { label: "Sports", value: "Sports" },
    { label: "Arts & Theatre", value: "Arts & Theatre" },
    { label: "Film", value: "Film" },
    { label: "Miscellaneous", value: "Miscellaneous" },
  ];

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  // const leaveRoom = () => {
  //   socket.emit("leave_room", room);
  // };

  return (
    <div className="ChatApp">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <div className="chat-sidebar">
            <h3>
              <ForumIcon />
              Channels
            </h3>
            <ul>
              {channels.map((channel) => {
                return (
                  <li key={channel.value}>
                    <button
                      value={channel.value}
                      onClick={() => {
                        setRoom(channel.value);
                        joinRoom();
                      }}
                    >
                      {channel.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <h3>
              <PeopleIcon />
              Online Users{" "}
              {onlineUsers.length ? `(${onlineUsers.length})` : null}
            </h3>
            <ul>
              {onlineUsers.length
                ? onlineUsers.map((user) => {
                    return <li key={user.id}>{user.username}</li>;
                  })
                : null}
            </ul>
          </div>
        </Grid>
        <Grid item xs={9} className="chat-window">
          <ChatRoom socket={socket} username={username} room={room} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
