// Comment.js
import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ comment, getUserName }) => {
  return (
    <li className="commentItem" key={comment.id}>
      <Link to={`/users/${comment.userId}`}>{getUserName(comment.userId)}</Link>
      : {comment.caption}
    </li>
  );
};

export default Comment;
