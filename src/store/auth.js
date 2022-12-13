import axios from "axios";
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "UPDATE_ATTENDING") {
    state.attendings = [...state.attendings, action.attending];
  }
  if (action.type === "FRIEND_REQUEST") {
    //return { ...state, friendships: [...state.friendships, action.friendship] };
    state.friendships = [...state.friendships, action.friendship];
  }
  if (action.type === "FETCH_FRIENDS") {
    state.action;
  }
  if (action.type === "ACCEPT_REQUEST") {
    return state.friendships.map((friendship) =>
      friendship.requesterId === action.friendship.requesterId
        ? action.friendship
        : friendship
    );
  }
  // if (action.type === "DELETE_FRIENDSHIP") {
  //   state.friendships = state.friendships.filter(
  //     (friendship) =>
  //       friendship.requsterId !== action.id ||
  //       friendship.accepterId !== action.id
  //   );
  // }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const updateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/auth", auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/register", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const attendingEvent = (attending) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/events", attending, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "UPDATE_ATTENDING", attending: response.data });
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
    const response = await axios.put(`/api/friendships/`, friendships, {
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

export default auth;
