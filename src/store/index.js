import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import events from "./events";
import users from "./users";
import onlineUsers from "./onlineUsers";

const reducer = combineReducers({
  auth,
  events,
  users,
  onlineUsers,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./events";
export * from "./users";
export * from "./onlineUsers";
