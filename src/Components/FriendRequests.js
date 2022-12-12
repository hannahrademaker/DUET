import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuth,
  fetchUsers,
  friendRequest,
  fetchFriendRelationships,
  sendFriendRequest,
  fetchFriendships,
} from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const FriendRequests = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const friendRequests = auth.Accepter.filter(
    (request) => request.friendship.status === "pending"
  );
  //   const friendsreqs = auth.Accepter;
  //   console.log(friendsreqs);

  return (
    //  <hr />
    <div>
      <ul>
        {friendRequests.map((request) => {
          return (
            <li>
              <Link to={`/users/${request.id}`}>
                {request.username}
                <img
                  src={request.avatar}
                  alt="Pic of User"
                  width="200"
                  height="200"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendRequests;
