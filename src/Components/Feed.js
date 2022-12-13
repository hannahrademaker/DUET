import React, { useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Add a new post to the list of posts
  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  return (
    <div>
      <h1>News Feed</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addPost(event.target.elements.post.value);
          event.target.elements.post.value = "";
        }}
      >
        <label>
          Add a post:
          <input type="text" name="post" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
