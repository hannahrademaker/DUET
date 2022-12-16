import axios from "axios";

const friendships = (state = [], action) => {
  if (action.type === "GET_FRIENDSHIPS") {
    state = action.friendships;
  }
  if (action.type === "FRIEND_REQUEST") {
    state = [...state, action.friendship];
  }
  if (action.type === "DELETE_FRIENDSHIP") {
    state = state.filter(
      (friendship) => friendship.id !== action.friendship.id
    );
  }
  if (action.type === "ACCEPT_REQUEST") {
    state = state.map((friendship) =>
      friendship.id === action.friendship.id ? action.friendship : friendship
    );
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

export const sendFriendRequest = (friendship) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/friendships", friendship, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "FRIEND_REQUEST",
      friendship: response.data,
    });
  };
};

export const deleteFriendship = (friendship) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/friendships/${friendship.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "DELETE_FRIENDSHIP", friendship });
  };
};

export const acceptFriendRequest = (friendship) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/friendships`, friendship, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "ACCEPT_REQUEST", friendship: response.data });
  };
};

export default friendships;
