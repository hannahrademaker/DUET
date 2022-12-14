import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuth,
  fetchUsers,
  fetchFriendRelationships,
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
  // const [requested, setRequested] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const friendList = auth.Accepter.concat(auth.Requester).filter(
    (friend) => friend.friendship.status === "accepted"
  );

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
          <span>Friends ({friendList.length})</span>
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
          {friendList.map((friend) => {
            return (
              <div key={friend.id} className="friend-card" auth={auth.id}>
                <li>
                  <Link to={`/users/${friend.id}`}>{friend.username}</Link>
                  <img
                    src={friend.avatar}
                    alt="Pic of User"
                    width="200"
                    height="200"
                  />
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
            if (!friendListIds.includes(user.id) && user.id !== auth.id) {
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
                    {!pendingFriendListIds.includes(user.id) && (
                      <button onClick={() => dispatch(sendFriendRequest(user))}>
                        Send Friend Request
                      </button>
                    )}
                    {inboxIds.includes(user.id) && (
                      <button
                        onClick={() => dispatch(acceptFriendRequest(user))}
                      >
                        Confirm
                      </button>
                    )}
                    {outboxIds.includes(user.id) && (
                      <button
                        onClick={() => dispatch(sendFriendRequest(user))}
                        disabled={true}
                      >
                        Friend Request Sent
                      </button>
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
