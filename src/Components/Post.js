import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";

const Post = ({ post, getUserName, getProfileImg }) => {
  return (
    <div key={post.id}>
      <Card>
        <CardHeader
          avatar={
            <Link
              to={`/users/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Avatar src={getProfileImg(post.userId)} />
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
    </div>
  );
};

export default Post;
