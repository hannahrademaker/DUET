import axios from "axios";

const friendships = (state = [], action) => {
  if (action === "SET_FRIENDSHIPS") {
    return action.friendships;
  }
  return state;
};

export const fetchFriends = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/friends", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_FRIENDSHIPS", friendships: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default friendships;
