// PostForm.js
import React from "react";
import { TextField, Button } from "@mui/material";

const PostForm = ({ onSubmit, newPost, onChange }) => {
  return (
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
  );
};

export default PostForm;
