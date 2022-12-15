import axios from "axios";

const friendships = (state = [], action) => {
  if (action.type === "GET_FRIENDSHIPS") {
    state = action.friendships;
  }
  if (action.type === "FRIEND_REQUEST") {
    state.friendships = [...state.friendships, action.friendship];
  }
  if (action.type === "FETCH_FRIENDS") {
    state.action;
  }
  if (action.type === "ACCEPT_REQUEST") {
    state.friendships = state.friendships.map((friendship) => {
      if (friendship.id === action.friendship.id) {
        return action.friendship;
      } else {
        return friendship;
      }
    });
  }
  if (action.type === "DELETE_FRIENDSHIP") {
    state.friendships = state.friendships.filter(
      (friendship) =>
        friendship.requsterId !== action.id ||
        friendship.accepterId !== action.id
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

export const sendFriendRequest = (friendships) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/friendships", friendships, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FRIEND_REQUEST", friendships: response.data });
  };
};

export const acceptFriendRequest = (friendships) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/friendships`, friendships, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "ACCEPT_REQUEST", friendships: response.data });
  };
};

// export const deleteFriendship = (id) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     await axios.delete(`/api/friendships`, id, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "DELETE_FRIENDSHIP", id });
//   };
// };

export const fetchFriendRelationships = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/friendships", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FETCH_FRIENDS", friendships: response.data });
  };
};

// export const blockUser = (user) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     const response = await axios.post("/api/auth/", user, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "BLOCK_USER", user: response.data });
//   };
// };

export default friendships;
