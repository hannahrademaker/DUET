import React, { useState } from "react";

const Post = () => {
  const [postText, setPostText] = useState("");
  const [comments, setComments] = useState([]);

  const handlePostChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();

    // Add the post to the list of comments
    setComments([...comments, postText]);
    setPostText("");
  };

  const handleCommentChange = (event) => {
    // Update the comment text in the list of comments
    const updatedComments = [...comments];
    updatedComments[event.target.id] = event.target.value;
    setComments(updatedComments);
  };

  return (
    <div>
      <form onSubmit={handlePostSubmit}>
        <label>
          Write a post:
          <input type="text" value={postText} onChange={handlePostChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment}
            <form>
              <label>
                Leave a comment:
                <input
                  id={index}
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </label>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};
