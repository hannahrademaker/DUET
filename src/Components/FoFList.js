import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest,
  deleteFriendship,
  sendFriendRequest,
} from "../store";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardActions, Typography } from "@mui/material/";

const FoFList = () => {
  const { auth, friendships, users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  const friend = users.find((user) => id === user.id);

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

  const confirmedFriends = friendships.filter((friendship) => {
    if (friendship.status === "accepted" && friendship.ids.includes(auth.id)) {
      return friendship;
    }
  });

  const myFriends = users.reduce((acc, user) => {
    for (let i = 0; i < confirmedFriends.length; i++) {
      if (confirmedFriends[i].ids.includes(user.id) && user.id !== auth.id) {
        acc.push(user);
      }
    }
    return acc;
  }, []);

  const myFriendsIds = myFriends.map((myFriendsId) => myFriendsId.id);

  const sentRequests = friendships.filter((friendship) => {
    if (friendship.requesterId === auth.id && friendship.status === "pending") {
      return friendship;
    }
  });

  const sentRequestsIds = sentRequests.map((user) => user.accepterId);

  const sendFR = (user, auth) => {
    let friendship = {
      accepterId: user.id,
      requesterId: auth.id,
    };
    dispatch(sendFriendRequest(friendship));
  };

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

  const confirmedFOF = friendships.filter((friendship) => {
    if (friend)
      if (
        friendship.status === "accepted" &&
        friendship.ids.includes(friend.id)
      ) {
        return friendship;
      }
  });

  const friendsOfFriends = users.reduce((acc, user) => {
    for (let i = 0; i < confirmedFOF.length; i++) {
      if (confirmedFOF[i].ids.includes(user.id) && user.id !== friend.id) {
        acc.push(user);
      }
    }
    return acc;
  }, []);

  return (
    <div className="list-6-friends" sx={{ padding: "0 15px 0 15px" }}>
      {friendsOfFriends.map((request) => {
        return (
          <Card key={request.id} sx={{ width: 150, height: 200 }}>
            <Link
              to={`/users/${request.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h5">{request.username}</Typography>
              <img
                src={
                  request.img ? request.img : "../static/DUET/blankprofile.png"
                }
                className="friend-img"
                alt="Pic of User"
                width="100"
                height="100"
              />
            </Link>
            <CardActions>
              {!sentRequestsIds.includes(request.id) &&
                !receivedReqIds.includes(request.id) && (
                  <Button onClick={() => sendFR(request, auth)}>
                    Send Friend Request
                  </Button>
                )}
              {receivedReqIds.includes(request.id) && (
                <Button onClick={() => weFriends(request)}>Accept</Button>
              )}
              {sentRequestsIds.includes(request.id) && (
                <Button disabled={true}>Friend Request Sent</Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default FoFList;
