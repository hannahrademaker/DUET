import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../store";
import { createComment } from "../store";
import { fetchUsers } from "../store";
import {
  TextField,
  Button,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from "@mui/material";

const Comments = ({ eventId }) => {
  const { comments, users } = useSelector((state) => state);
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const eventComments = comments.filter(
    (comment) => comment.eventId === eventId
  );

  const getUserName = (userId) => {
    if (userId === null) return "Anonymous";
    else {
      const theUser = users.find((user) => user.id === userId);
      const userName = theUser.username;
      return userName;
    }
  };

  const getUserImg = (userId) => {
    if (userId === null) return "../static/DUET/blankprofile.png";
    else {
      const theUser = users.find((user) => user.id === userId);
      const userImg = theUser.img
        ? theUser.img
        : "../static/DUET/blankprofile.png";
      return userImg;
    }
  };

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdAt = new Date();
    const userId = user.id;
    const comment = {
      caption: newComment,
      eventId,
      userId,
      createdAt,
    };
    dispatch(createComment(comment));
    setNewComment("");
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div className="Comments">
      <h1>Comments</h1>
      <div className="Comments-list">
        {eventComments.map((comment) => (
          <Card key={comment.id} href={`/#/users/${comment.userId}`}>
            <CardHeader
              avatar={<Avatar src={getUserImg(comment.userId)} />}
              title={getUserName(comment.userId)}
            />
            {/* <div>{getUserName(comment.userId)}</div> */}
            <CardContent>
              <div>{comment.caption}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <form style={{ width: "500px", margin: "5% 0" }} onSubmit={handleSubmit}>
        <TextField
          sx={{ backgroundColor: "white" }}
          placeholder="Type your comment!"
          multiline
          rows={2}
          value={newComment}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" value="Submit">
          Post!
        </Button>
      </form>
    </div>
  );
};

export default Comments;
