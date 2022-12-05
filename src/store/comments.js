import axios from "axios";

const comments = (state = [], action) => {
  if (action.type === "SET_COMMENTS") {
    return action.comments;
  }
  if (action.type === "CREATE_COMMENTS") {
    return [...state, action.comments];
  }
  return state;
};

export const fetchComments = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/comments", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_COMMENTS", comments: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default comments;
