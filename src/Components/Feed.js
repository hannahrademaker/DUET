import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../store/posts";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";
import { createPost } from "../store/posts";

const Feed = () => {
  const { posts, users } = useSelector((state) => state);
  const [newPost, setNewPost] = useState({
    caption: "",
    body: "",
    img: "",
    userId: null,
  });
  const user = useSelector((state) => state.auth);

  const onChange = (ev) => {
    setNewPost({ ...newPost, [ev.target.name]: ev.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const createdAt = new Date();
    const userId = user.id;
    const post = {
      caption: newPost.caption,
      body: newPost.body,
      img: newPost.img,
      userId,
      createdAt,
    };
    dispatch(createPost(post));
    setNewPost({
      caption: "",
      body: "",
      img: "",
      userId: null,
    });
  };
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
    if (!userId) return "";
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="caption"
          placeholder="Caption"
          value={newPost.caption}
          onChange={onChange}
        />
        <input
          type="text"
          name="body"
          placeholder="Body"
          value={newPost.body}
          onChange={onChange}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={newPost.img}
          onChange={onChange}
        />

        <button type="submit">Post</button>
      </form>
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
