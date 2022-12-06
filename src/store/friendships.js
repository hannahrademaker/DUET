import axios from "axios";

const friendships = (state = [], action) => {
  if (action === "SET_FRIENDSHIPS") {
    return action.friendships;
  }
  return state;
};

export const fetchFriends = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/friends", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_FRIENDSHIPS", friendships: response.data });
  };
};

export default friendships;
