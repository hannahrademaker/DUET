import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import users from "./users";
import onlineUsers from "./onlineUsers";
import comments from "./comments";
import posts from "./posts";
const reducer = combineReducers({
  auth,
  users,
  onlineUsers,
  comments,
  posts,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./users";
export * from "./onlineUsers";
export * from "./comments";
export * from "./posts";
