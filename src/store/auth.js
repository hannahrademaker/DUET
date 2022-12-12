import axios from "axios";
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "CREATE_ATTENDING") {
    state.attendings = [...state.attendings, action.attending];
  }
  if (action.type === "UPDATE_ATTENDING") {
    state.attendings = state.attendings.map((a) =>
      a.id === action.attending.id ? action.attending : a
    );
  }
  if (action.type === "FRIEND_REQUEST") {
    state.friendships = [...state.friendships, action.friendship];
  }
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
    dispatch({ type: "CREATE_ATTENDING", attending: response.data });
  };
};

export const updateAttending = (attending) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/events/${attending.id}`, attending, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "UPDATE_ATTENDING", attending: response.data });
  };
};

export const sendFriendRequest = (friend) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/friendships", friend, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FRIEND_REQUEST", friendship: response.data });
  };
};

export default auth;
