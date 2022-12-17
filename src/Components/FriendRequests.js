import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, acceptFriendRequest } from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const FriendRequests = () => {
  const { auth, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();

  const friendRequests = auth.Accepter.filter(
    (request) => request.friendship.status === "pending"
  );
  const weFriends = (user) => {
    let friendship = friendships.find(
      (friendship) =>
        friendship.requesterId === user.id && friendship.accepterId === auth.id
    );
    friendship.status = "accepted";
    dispatch(acceptFriendRequest(friendship));
  };

  return (
    <div>
      <ul>
        {friendRequests.map((request) => {
          return (
            <div id="friend-request" key={request.id}>
              <li>
                <Link to={`/users/${request.id}`}>
                  {request.username}
                  <img
                    src={request.img}
                    alt="Pic of User"
                    width="200"
                    height="200"
                  />
                </Link>
                <Button variant="contained" onClick={() => weFriends(request)}>
                  Accept
                </Button>
                <Button variant="outlined">Decline</Button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendRequests;
