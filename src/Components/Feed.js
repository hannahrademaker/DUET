import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../store/posts";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";
import { createPost } from "../store/posts";

const Feed = () => {
  const { posts, users } = useSelector((state) => state);
  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");
  const [newPost, setNewPost] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const getUserName = (userId) => {
    if (userId === null) return "Anonymous";
    else {
      const theUser = users.find((user) => user.id === userId);
      const userName = theUser.username;
      return userName;
    }
  };

  const getProfileImg = (userId) => {
    if (userId === null) return "";
    else {
      const theUser = users.find((user) => user.id === userId);
      const profileImg = theUser.img;
      return profileImg;
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="feed">
      <h1>Lets Meet!</h1>
      {/* <div className="PostInput">
        <textarea
          placeholder="What are you looking to do?"
          className="PostInput-input"
        />
        <div>
          <button>Add a photo</button>
          <button className="PostInput-button" type="submit">
            Post
          </button>
        </div>
      </div> */}
      <ul className="feedList">
        {posts.map((post, index) => (
          <div>
            <Link to={`/users/${post.userId}`}>
              <img className="profileImg" src={getProfileImg(post.userId)} />
              {getUserName(post.userId)}
            </Link>
            <li className="feedCaption" key={index}>
              {post.caption}
            </li>
            {post.img && <img className="feedImg" src={post.img} />}
            <li className="feedItem" key={post.body}>
              {post.body}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
