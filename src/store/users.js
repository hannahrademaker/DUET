import axios from "axios";

const users = (state = [], action) => {
  if (action === "SET_USERS") {
    state = action.users;
  }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/friends", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_USERS", users: response.data });
  };
};

export default users;
