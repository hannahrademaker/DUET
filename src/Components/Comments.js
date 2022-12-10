import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../store";

const Comments = ({ eventId }) => {
  const { comments } = useSelector((state) => state);
  const eventComments = comments.filter(
    (comment) => comment.eventId === eventId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
    <div className="Comments">
      <h1>Comments</h1>
      <ul className="Comments-list">
        {eventComments.map((comment) => (
          <h1 key={comment.id}>
            {/* <Link to={`/users/${comment.userId}`}>
              <h3>{comment.user}</h3>
            </Link> */}
            <p>{comment.caption}</p>
          </h1>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
