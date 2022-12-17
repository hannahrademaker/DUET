import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  fetchFriendships,
} from "../store";
import { Link } from "react-router-dom";
import { Button } from "@mui/material/";
import PplMayKnow from "./PplMayKnow";
import UserFriends from "./UserFriends";
import FriendRequests from "./FriendRequests";
import UserEvents from "./UserEvents";
import { Typography } from "@mui/material";

const User = () => {
  const { auth, users, friendships, attending } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchFriendships());
  // }, []);

  // const friendList = auth.Accepter.concat(auth.Requester).filter(
  //   (friend) => friend.friendship.status === "accepted"
  // );
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

  const sentRequests = friendships.filter((friendship) => {
    if (friendship.requesterId === auth.id && friendship.status === "pending") {
      return friendship;
    }
  });
  const sentRequestsIds = sentRequests.map((user) => user.accepterId);

  // const pendingFriendList = auth.Accepter.concat(auth.Requester).filter(
  //   (friend) => friend.friendship.status === "pending"
  // );

  //friend requests sent
  // const outbox = auth.Requester.filter(
  //   (invite) => invite.friendship.status === "pending"
  // );
  //const outboxIds = outbox.map((outboxId) => outboxId.id);
  //inbox of friend request invitations
  // const inbox = auth.Accepter.filter(
  //   (request) => request.friendship.status === "pending"
  // );
  // const inboxIds = inbox.map((inboxId) => inboxId.id);
  const inboxReqs = friendships.filter((pending) => {
    if (pending.status === "pending" && pending.accepterId === auth.id) {
      return pending;
    }
  });
  //const friendListIds = friendList.map((friendId) => friendId.id);

  // const pendingFriendListIds = pendingFriendList.map(
  //   (pendingId) => pendingId.id
  // );
  //        <UserEvents userId={auth.id} />
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

  return (
    <div className="user-page">
      <div className="username-top">
        {auth.img && <img src={auth.img} alt="Pic of User" />}
        <Typography variant="h1">{auth.username}</Typography>
      </div>
      <div>
        <div>
          <span>Events ()</span>
          <span>Events ({auth.attendings.length})</span>
          <span>Friends ({myFriends.length})</span>
          <span>
            <Link className="link" to="/user/friendrequests">
              Friend Requests ({inboxReqs && inboxReqs.length})
            </Link>
          </span>
        </div>
      </div>
      <div>
        <p>{auth.bio}</p>
      </div>
      <div className="toggle-user-details">
        {!toggle && (
          <button
            className="see-user-details-button"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            See Your About Info
          </button>
        )}
        {toggle && (
          <div className="user-details">
            <div>
              <h4>Email address</h4>
              <p>{auth.email}</p>
            </div>
            <h4>Address</h4>
            <p>
              {auth.address} {auth.addressDetails}
            </p>
            <p>
              {auth.city}, {auth.state} {auth.zip}
            </p>
            <button
              className="hide-user-details-button"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Hide User Details
            </button>
          </div>
        )}
      </div>
      <div>
        <Link to="/user/update">
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      <UserFriends />
      <div>{auth.id && <PplMayKnow />}</div>
    </div>
  );
};

export default User;
