import axios from "axios";

const users = (state = [], action) => {
  if (action.type === "SET_USERS") {
    state = action.users;
  }
  if (action.type === "UPDATE_USER") {
    state = state.map(
      (user) => (user.id === action.user.id ? action.user : user)
      //state.requester = [...state.requester, action.user];
    );
    //return action.user;
  }
  return state;
};

//const requesters = (state = {friendship: []})

export const fetchUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/users", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_USERS", users: response.data });
  };
};

// export const friendRequest = (user) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     const response = await axios.put(`/api/friends/${user.id}`, user, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "UPDATE_USER", user: response.data });
//   };
// };

export default users;
