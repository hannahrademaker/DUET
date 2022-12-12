import axios from "axios";

const friendships = (state = [], action) => {
  if (action.type === "GET_FRIENDSHIPS") {
    state = action.friendships;
  }
  return state;
};

export const fetchFriendships = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/friendships", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "GET_FRIENDSHIPS", friendships: response.data });
  };
};

export default friendships;
