import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import onlineUsers from "../store/onlineUsers";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";

const ChatRoom = ({ socket, username, room }) => {
  const { onlineUsers } = useSelector((state) => state);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const channels = [
    "All",
    "Music",
    "Sports",
    "Arts & Theatre",
    "Film",
    "Miscellaneous",
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <div className="chat-sidebar">
          <h3>
            <ForumIcon />
            Channels
          </h3>
          <ul>
            {channels.map((channel) => {
              return <li key={channel}>{channel}</li>;
            })}
          </ul>

          <h3>
            <PeopleIcon />
            Online Users {onlineUsers.length ? `(${onlineUsers.length})` : null}
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
      <Grid item xs={10} className="chat-window">
        <div className="chat-header">
          <p>{room}</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                  key={Math.random() * Math.random()}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Message"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
