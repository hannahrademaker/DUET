import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  fetchFriendships,
  deleteFriendship,
} from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const User = () => {
  const { auth, users, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  // const [status, setStatus] = useState("pending");

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchFriendships());
  }, []);

  const friendList = auth.Accepter.concat(auth.Requester).filter(
    (friend) => friend.friendship.status === "accepted"
  );
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

  const pendingFriendList = auth.Accepter.concat(auth.Requester).filter(
    (friend) => friend.friendship.status === "pending"
  );

  //friend requests sent
  const outbox = auth.Requester.filter(
    (invite) => invite.friendship.status === "pending"
  );
  const outboxIds = outbox.map((outboxId) => outboxId.id);
  //inbox of friend request invitations
  const inbox = auth.Accepter.filter(
    (request) => request.friendship.status === "pending"
  );
  const inboxIds = inbox.map((inboxId) => inboxId.id);

  const friendListIds = friendList.map((friendId) => friendId.id);

  const pendingFriendListIds = pendingFriendList.map(
    (pendingId) => pendingId.id
  );

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
    const friendship = friendships.find(
      (friendship) =>
        friendship.ids.includes(friend.id) && friendship.ids.includes(auth.id)
    );
    dispatch(deleteFriendship(friendship));
  };

  return (
    <div id="user-page">
      <div className="username-top">
        <h3>{auth.username}</h3>
      </div>
      <div>
        <div className="profile-page-details-top">
          {auth.img && (
            <img src={auth.img} alt="Pic of User" width="200" height="200" />
          )}
        </div>
        <div>
          <span>Events ()</span>
          <span>Friends ({myFriends.length})</span>
        </div>
      </div>
      <div>
        <h4>
          {auth.firstName} {auth.lastName}
        </h4>
        <p>{auth.bio}</p>
      </div>
      <div className="list-6-friends">
        <div>
          {myFriends.map((friend) => {
            return (
              <div key={friend.id} className="friend-card">
                <li>
                  <Link to={`/users/${friend.id}`}>{friend.username}</Link>
                  <img
                    src={friend.avatar}
                    alt="Pic of User"
                    width="200"
                    height="200"
                  />
                  <button onClick={() => destroyFriendship(friend)}>X</button>
                </li>
              </div>
            );
          })}
        </div>
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
      <div className="people-you-may-know-cards">
        <p>People you may know</p>
        <ul>
          {users.map((user) => {
            //set up a max of 6 people you may know?? or just show all?
            if (!myFriendsIds.includes(user.id) && user.id !== auth.id) {
              return (
                <div key={user.id}>
                  <li>
                    <Link to={`/users/${user.id}`}>
                      {user.username}
                      {user.img && (
                        <img
                          className="people-you-may-know-img"
                          src={user.img}
                          width="200"
                          height="200"
                        />
                      )}
                      {!user.img && (
                        <img
                          className="people-you-may-know-img"
                          src="../static/DUET/blankprofile.png"
                          alt="blank profile"
                          width="200"
                          height="200"
                        />
                      )}
                    </Link>
                    {!sentRequestsIds.includes(user.id) &&
                      !inboxIds.includes(user.id) && (
                        <button onClick={() => sendFR(user, auth)}>
                          Send Friend Request
                        </button>
                      )}
                    {inboxIds.includes(user.id) && (
                      <button onClick={() => weFriends(user)}>Confirm</button>
                    )}
                    {sentRequestsIds.includes(user.id) && (
                      <button disabled={true}>Friend Request Sent</button>
                    )}
                  </li>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default User;
