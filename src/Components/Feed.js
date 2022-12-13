import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../store/posts";
import { useDispatch } from "react-redux";

const Feed = () => {
  const { posts } = useSelector((state) => state);
  const [newPost, setNewPost] = useState([]);
  const dispatch = useDispatch();

  const addNewPost = (post) => {
    setNewPost([...newPost, post]);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <h1>News Feed</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            {post.caption}
            {post.body}
          </li>
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
