import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../store/posts";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";

const Feed = () => {
  const { posts, users } = useSelector((state) => state);
  const [newPost, setNewPost] = useState([]);
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

  const addNewPost = (post) => {
    setNewPost([...newPost, post]);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="feed">
      <h1>News Feed</h1>
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
            <li className="feedItem" key={index}>
              {post.body}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

//   const [posts, setPosts] = useState([]);

//   // Add a new post to the list of posts
//   const addPost = (post) => {
//     setPosts([...posts, post]);
//   };

//   return (
//     <div>
//       <h1>News Feed</h1>
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           addPost(event.target.elements.post.value);
//           event.target.elements.post.value = "";
//         }}
//       >
//         <label>
//           Add a post:
//           <input type="text" name="post" />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//       <ul>
//         {posts.map((post, index) => (
//           <li key={index}>{post}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default Feed;
