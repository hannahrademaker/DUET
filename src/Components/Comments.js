import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../store";
import { createComment } from "../store";

const Comments = ({ eventId }) => {
  const { comments } = useSelector((state) => state);
  const [newComment, setNewComment] = useState("");

  const eventComments = comments.filter(
    (comment) => comment.eventId === eventId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdAt = new Date();
    // const userId = getUser
    const comment = {
      caption: newComment,
      eventId,
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
          <h1 key={comment.id}>
            {/* <Link to={`/users/${username!!`}>
              <h3>{comment.user}</h3>
            </Link> */}
            <p>{comment.caption}</p>
          </h1>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input type="text" value={newComment} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
