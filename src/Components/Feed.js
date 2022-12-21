import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../store/posts";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";
import { createPost } from "../store/posts";
import { fetchComments } from "../store/comments";
import { createComment } from "../store/comments";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";

const Feed = () => {
  const { posts, users, comments } = useSelector((state) => state);
  const [newPost, setNewPost] = useState({
    caption: "",
    body: "",
    img: "",
    userId: null,
  });
  const [newComment, setNewComment] = useState("");
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
    setNewComment({
      caption: "",
      postId: null,
      userId: null,
    });
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
      <Typography className="feedTitle" variant="h3">
        Let's Meet!
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          variant="filled"
          type="text"
          name="caption"
          placeholder="Caption"
          value={newPost.caption}
          onChange={onChange}
        />
        <TextField
          variant="filled"
          type="text"
          name="body"
          placeholder="Body"
          value={newPost.body}
          onChange={onChange}
        />
        <TextField
          variant="filled"
          type="text"
          name="img"
          placeholder="Image URL"
          value={newPost.img}
          onChange={onChange}
        />

        <Button variant="contained" type="submit">
          Post
        </Button>
      </form>
      <ul className="feedList">
        {posts.map((post, index) => (
          <div key={post.id}>
            <Card>
              <CardHeader
                avatar={
                  <Link
                    to={`/users/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Avatar src={getProfileImg(post.userId)} />{" "}
                  </Link>
                }
                title={post.caption}
                subheader={
                  <Link
                    to={`/users/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {getUserName(post.userId)}
                  </Link>
                }
              />
              <CardMedia
                component="img"
                sx={{ width: "500px", height: "auto" }}
                image={post.img}
              />
              <CardContent>
                <Typography variant="body1">{post.body}</Typography>
              </CardContent>
            </Card>
            <ul className="commentList">
              {postComments.map((comment) => {
                if (comment.postId === post.id) {
                  return (
                    <li className="commentItem" key={comment.id}>
                      <Link to={`/users/${comment.userId}`}>
                        {getUserName(comment.userId)}
                      </Link>
                      : {comment.caption}
                    </li>
                  );
                }
              })}
            </ul>
            <form
              onSubmit={(event) => handleCommentSubmit(event, post.id)}
              className="commentForm"
            >
              <TextField
                variant="filled"
                type="text"
                name="caption"
                placeholder="Comment"
                value={newComment.caption}
                onChange={onChangeComment}
              />
              <Button variant="contained" type="submit">
                Comment
              </Button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
