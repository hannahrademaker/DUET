import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, acceptFriendRequest, deleteFriendship } from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const FriendRequests = () => {
  const { auth, friendships, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  // const friendRequests = auth.Accepter.filter(
  //   (request) => request.friendship.status === "pending"
  // );
  const inboxReqs = friendships.filter((pending) => {
    if (pending.status === "pending" && pending.accepterId === auth.id) {
      return pending;
    }
  });

  const receivedReqIds = inboxReqs.map((user) => user.requesterId);

  const beMyFriend = users.reduce((acc, user) => {
    for (let i = 0; i < inboxReqs.length; i++) {
      if (inboxReqs[i].requesterId === user.id && user.id !== auth.id) {
        acc.push(user);
      }
    }
    return acc;
  }, []);

  const weFriends = (user) => {
    let friendship = friendships.find(
      (friendship) =>
        friendship.requesterId === user.id && friendship.accepterId === auth.id
    );
    friendship.status = "accepted";
    dispatch(acceptFriendRequest(friendship));
  };

  const destroyFriendship = (friend) => {
    let friendship = friendships.find(
      (friendship) =>
        friendship.ids.includes(friend.id) && friendship.ids.includes(auth.id)
    );
    dispatch(deleteFriendship(friendship));
  };

  return (
    <div>
      <ul>
        {beMyFriend.map((request) => {
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
                <Button
                  variant="outlined"
                  onClick={() => destroyFriendship(request)}
                >
                  Decline
                </Button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendRequests;
