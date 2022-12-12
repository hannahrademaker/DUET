import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../store";
import { createComment } from "../store";
import { fetchUsers } from "../store";

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
          <div key={comment.id}>
            <Link to={`/users/${comment.userId}`}>
              {getUserName(comment.userId)}
            </Link>
            {/* <div>{getUserName(comment.userId)}</div> */}
            <div>{comment.caption}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="commentsLabel">
          Comment:
          <input
            className="commmentInput"
            type="text"
            value={newComment}
            onChange={handleChange}
          />
        </label>
        <input className="commentsSubmit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
