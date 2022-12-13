import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import FormControl from "@mui/material";
import InputLabel from "@mui/material";
import NativeSelect from "@mui/material";
import MenuItem from "@mui/material";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setUsername(auth.username);
  });

  const channels = [
    { label: "All", value: "all" },
    { label: "Music", value: "music" },
    { label: "Sports", value: "sports" },
    { label: "Arts & Theatre", value: "artsAndTheatre" },
    { label: "Film", value: "film" },
    { label: "Miscellaneous", value: "misc" },
  ];

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="ChatApp">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <select onChange={(ev) => setRoom(ev.target.value)}>
            <option value={""}>Select Channel</option>
            {channels.map((channel) => {
              return (
                <option value={channel.value} key={channel.value}>
                  {channel.label}
                </option>
              );
            })}
          </select>
          <Button onClick={joinRoom}>Join A Room</Button>
        </div>
      ) : (
        <ChatRoom socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Chat;
