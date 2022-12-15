import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuth,
  fetchUsers,
  fetchFriendRelationships,
  fetchFriendships,
  deleteFriendship,
} from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";
import PplMayKnow from "./PplMayKnow";
import FriendRequests from "./FriendRequests";

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
          <span>Friends ({friendList.length}) </span>
          <span>
            <Link className="link" to="/user/friendrequests">
              Friend Requests ({pendingFriendList && pendingFriendList.length})
            </Link>
          </span>
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
                <h5>Friends</h5>
                <li>
                  <Link to={`/users/${friend.id}`}>{friend.username}</Link>
                  {friend.img ? (
                    <img
                      className="people-you-may-know-img"
                      src={friend.img}
                      alt="Pic of User"
                      width="200"
                      height="200"
                    />
                  ) : (
                    <img
                      className="people-you-may-know-img"
                      src="../static/DUET/blankprofile.png"
                      alt="Pic of User"
                      width="200"
                      height="200"
                    />
                  )}
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
      <PplMayKnow />
    </div>
  );
};

export default User;
