import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setUsername(auth.username);
  });

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
          <h3>Join A Chat</h3>
          {/* <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /> */}
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatRoom socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Chat;
