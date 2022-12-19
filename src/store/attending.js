import axios from "axios";

const attending = (state = [], action) => {
  if (action.type === "SET_ATTENDING") {
    state = action.attending;
  }
  if (action.type === "CREATE_ATTENDING") {
    state = [...state, action.attending];
  }
  if (action.type === "UPDATE_ATTENDING") {
    state = state.map((a) =>
      a.id === action.attending.id ? action.attending : a
    );
  }
  return state;
};

export const fetchAttending = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/events", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_ATTENDING", attending: response.data });
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

export default attending;
