import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts, createPost } from "../store/posts";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { fetchComments, createComment } from "../store/comments";
import Post from "./Post";
import Comment from "./Comment";
import PostForm from "./PostForm";
import { Button, TextField, Typography } from "@mui/material";

const Feed = () => {
  const { posts, users, comments } = useSelector((state) => state);
  const [newPost, setNewPost] = useState({
    caption: "",
    body: "",
    img: "",
    userId: null,
  });
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchComments()),
          dispatch(fetchUsers()),
          dispatch(fetchPosts()),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const postComments = comments.filter((comment) => comment.postId !== null);

  useEffect(() => {
    dispatch(fetchComments()).catch((error) => {
      console.error("Error fetching comments:", error);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchUsers()).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchPosts()).catch((error) => {
      console.error("Error fetching posts:", error);
    });
  }, []);

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
  if (loading) {
    return (
      <div className="loading">
        <Typography>Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="feed">
      <Typography className="feedTitle" variant="h3">
        Let's Meet!
      </Typography>
      <PostForm onSubmit={onSubmit} newPost={newPost} onChange={onChange} />
      <ul className="feedList">
        {posts.map((post, index) => (
          <div key={post.id}>
            <Post
              post={post}
              getUserName={getUserName}
              getProfileImg={getProfileImg}
            />
            <ul className="commentList">
              {postComments.map((comment) => {
                if (comment.postId === post.id) {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      getUserName={getUserName}
                    />
                  );
                }
                return null;
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
                value={newComment}
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
