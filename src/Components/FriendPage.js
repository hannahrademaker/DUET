import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFriendship,
  sendFriendRequest,
  acceptFriendRequest,
} from "../store";
import FriendOfFriend from "./FriendOfFriend";
import { Typography, Card, CardActions, Button } from "@mui/material";
import UserEvents from "./UserEvents";
import FoFList from "./FoFList";

const FriendPage = () => {
  const { id } = useParams();
  const { users, auth, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const friend = users.find((user) => id === user.id);

  const destroyFriendship = (friend) => {
    if (
      confirm(
        `Are you sure you want to unfriend ${friend.username}? This action cannot be undone.`
      )
    ) {
      let friendship = friendships.find(
        (friendship) =>
          friendship.ids.includes(friend.id) && friendship.ids.includes(auth.id)
      );
      dispatch(deleteFriendship(friendship));
    }
  };

  const sendFR = () => {
    let friendship = {
      accepterId: friend.id,
      requesterId: auth.id,
    };
    dispatch(sendFriendRequest(friendship));
  };

  const weFriends = () => {
    let friendship = friendships.find(
      (friendship) =>
        friendship.requesterId === friend.id &&
        friendship.accepterId === auth.id
    );
    friendship.status = "accepted";
    dispatch(acceptFriendRequest(friendship));
  };

  const confirmedFriends = friendships.filter((friendship) => {
    if (friendship.status === "accepted" && friendship.ids.includes(auth.id)) {
      return friendship;
    }
  });

  const sentRequests = friendships.filter((friendship) => {
    if (friendship.requesterId === auth.id && friendship.status === "pending") {
      return friendship;
    }
  });

  const sentRequestsIds = sentRequests.map((user) => user.accepterId);

  const inboxReqs = friendships.filter((pending) => {
    if (pending.status === "pending" && pending.accepterId === auth.id) {
      return pending;
    }
  });

  const receivedReqIds = inboxReqs.map((user) => user.requesterId);

  const myFriends = users.reduce((acc, user) => {
    for (let i = 0; i < confirmedFriends.length; i++) {
      if (confirmedFriends[i].ids.includes(user.id) && user.id !== auth.id) {
        acc.push(user);
      }
    }
    return acc;
  }, []);

  const myFriendsIds = myFriends.map((myFriendsId) => myFriendsId.id);

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

  const mutualFriends = myFriends.reduce((acc, buddy) => {
    for (let i = 0; i < friendsOfFriends.length; i++) {
      if (buddy === friendsOfFriends[i] && !acc.includes(buddy)) {
        acc.push(buddy);
      }
    }
    return acc;
  }, []);

  const friendsIds = friendsOfFriends.map((myFriendsId) => myFriendsId.id);

  const roomName = (a, b) => {
    const list = [a, b].sort();
    return (
      list[0].slice(0, 1).toUpperCase(0, 1) +
      list[0].slice(1) +
      ", " +
      list[1].slice(0, 1).toUpperCase(0, 1) +
      list[1].slice(1)
    );
  };

  const chatRoom = roomName(auth.username, friend.username);

  // const friendListIds = friendList.map((friendId) => friendId.id);
  if (!friend) return null;
  if (friend)
    return (
      <div className="user-page">
        <div className="username-top">
          {friend.img && (
            <img
              src={friend.img ? friend.img : "../static/DUET/blankprofile.png"}
              alt="Pic of friend"
              width="200"
              height="200"
            />
          )}
          <div className="name-photo">
            <Typography variant="h1">{friend.username}</Typography>
            {!sentRequestsIds.includes(friend.id) &&
              !receivedReqIds.includes(friend.id) &&
              !myFriendsIds.includes(friend.id) && (
                <Button onClick={() => sendFR()}>Send Friend Request</Button>
              )}
            {receivedReqIds.includes(friend.id) && (
              <Button onClick={() => weFriends()}>Accept</Button>
            )}
            {sentRequestsIds.includes(friend.id) && (
              <Button disabled={true}> Friend Request Sent</Button>
            )}
          </div>
        </div>
        <div>
          <span>
            {auth.attendings.length !== 1
              ? `${auth.attendings.length} Events`
              : `${auth.attendings.length} Event`}
          </span>
          <span>
            <Link
              style={{ textDecoration: "none", color: "#12163f" }}
              to={`/foflist/${friend.id}`}
            >
              {" "}
              {friendsOfFriends.length !== 1
                ? `${friendsOfFriends.length} Friends (${mutualFriends.length} mutual)`
                : `${friendsOfFriends.length} Friend (${mutualFriends.length} mutual) `}
            </Link>{" "}
          </span>
        </div>
        <div>
          <h4>
            {friend.firstName} {friend.lastName}
          </h4>
          <Button variant="contained" className="see-user-details-button">
            <Link className="link" to="/chat/" state={{ from: chatRoom }}>
              SEND {friend.username} A MESSAGE
            </Link>
          </Button>

          <p>{friend.bio}</p>
        </div>
        {myFriends.includes(friend) && (
          <div className="toggle-user-details">
            {!toggle && (
              <Button
                variant="contained"
                className="see-user-details-button"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                See Friend Info
              </Button>
            )}
            {toggle && (
              <div className="user-details">
                <div>
                  <h4>Email address</h4>
                  <p>{friend.email}</p>
                </div>
                <Button onClick={() => destroyFriendship(friend)}>
                  Unfriend
                </Button>
                <br />
                <Button
                  variant="contained"
                  className="hide-user-details-button"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Hide {friend.username}'s Info'
                </Button>
              </div>
            )}
            <FriendOfFriend id={id} />
            <UserEvents userId={id} />
          </div>
        )}
      </div>
    );
};

export default FriendPage;
