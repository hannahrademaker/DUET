import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import users from "./users";
import onlineUsers from "./onlineUsers";
import comments from "./comments";
import friendships from "./friendships";
import posts from "./posts";
import attending from "./attending";

const reducer = combineReducers({
  auth,
  users,
  onlineUsers,
  comments,
  friendships,
  posts,
  attending,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./users";
export * from "./onlineUsers";
export * from "./comments";
export * from "./friendships";
export * from "./posts";
export * from "./attending";
