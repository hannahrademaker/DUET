import axios from "axios";

const SET_POSTS = "GET_POSTS";
const CREATE_POST = "CREATE_POST";
const DELETE_POST = "DELETE_POST";

const posts = (state = [], action) => {
  if (action.type === SET_POSTS) {
    return action.posts;
  }
  if (action.type === CREATE_POST) {
    return [action.post, ...state];
  }
  if (action.type === DELETE_POST) {
    return state.filter((post) => post.id !== action.id);
  }
  return state;
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/posts", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "GET_POSTS", posts: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/posts", post, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "CREATE_POST", post: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "DELETE_POST", id });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default posts;
