import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../store/posts";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";
import { createPost } from "../store/posts";
import { fetchComments } from "../store/comments";
import { createComment } from "../store/comments";

const Feed = () => {
  const { posts, users, comments } = useSelector((state) => state);
  const [newPost, setNewPost] = useState({
    caption: "",
    body: "",
    img: "",
    userId: null,
  });
  const [newComment, setNewComment] = useState({
    caption: "",
    userId: null,
    postId: null,
  });
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const postComments = comments.filter((comment) => comment.postId !== null);

  const onChange = (ev) => {
    setNewPost({ ...newPost, [ev.target.name]: ev.target.value });
  };

  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();
    const userId = user.id;
    const comment = {
      caption: newComment,
      postId,
      userId,
    };
    dispatch(createComment(comment));
    setNewComment("");
  };

  const onChangeComment = (ev) => {
    setNewComment(ev.target.value);
  };

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

  useEffect(() => {
    dispatch(fetchPosts());
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
            <ul className="commentList">
              {postComments.map((comment) => {
                if (comment.postId === post.id) {
                  return (
                    <li className="commentItem" key={comment.id}>
                      {comment.caption}
                    </li>
                  );
                }
              })}
            </ul>
            <form
              onSubmit={(event) => handleCommentSubmit(event, post.id)}
              className="commentForm"
            >
              <input
                type="text"
                name="caption"
                placeholder="Comment"
                value={newComment.caption}
                onChange={onChangeComment}
              />
              <button type="submit">Comment</button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
