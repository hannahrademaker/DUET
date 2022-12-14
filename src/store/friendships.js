import axios from "axios";

const friendships = (state = [], action) => {
  if (action.type === "GET_FRIENDSHIPS") {
    state = action.friendships;
  }
  if (action.type === "DELETE_FRIENDSHIP") {
    state = state.filter(
      (friendship) => friendship.id !== action.friendship.id
    );
  }
  return state;
};

export const fetchFriendships = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/friendships");
    dispatch({ type: "GET_FRIENDSHIPS", friendships: response.data });
  };
};

export const deleteFriendship = (friendship) => {
  return async (dispatch) => {
    const response = await axios.delete(
      `/api/friendships/${friendship.id}`,
      friendship
    );
    dispatch({ type: "DELETE_FRIENDSHIP", friendship: response.data });
  };
};

export default friendships;
