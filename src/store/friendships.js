import axios from "axios";

const friendships = (state = { friendships: [] }, action) => {
  if (action.type === "SET_FRIENDSHIPS") {
    state = action.friendships;
  }
  return state;
};

export const fetchFriendships = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/users/friendships", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_FRIENDSHIPS", friendships: response.data });
  };
};

export default friendships;
