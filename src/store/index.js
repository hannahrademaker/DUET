import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import events from "./events";
import friendships from "./friendships";

const reducer = combineReducers({
  auth,
  events,
  friendships,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./events";
export * from "./friendships";
