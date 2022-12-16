import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";
import PplMayKnow from "./PplMayKnow";
import FriendRequests from "./FriendRequests";
import UserEvents from "./UserEvents";
import { Typography } from "@mui/material";

const User = () => {
  const { auth, users, friendships, attending } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const friendList = auth.Accepter.concat(auth.Requester).filter(
    (friend) => friend.friendship.status === "accepted"
  );

  const pendingFriendList = auth.Accepter.concat(auth.Requester).filter(
    (friend) => friend.friendship.status === "pending"
  );

  return (
    <div className="user-page">
      <div className="username-top">
        <Typography variant="h1">{auth.username}</Typography>
      </div>
      <div>
        <div className="profile-page-details-top">
          {auth.img && <img src={auth.img} alt="Pic of User" />}
        </div>
        <div>
          <span>Events ({auth.attendings.length})</span>
          <span>Friends ({friendList.length}) </span>
          <span>
            <Link className="link" to="/user/friendrequests">
              Friend Requests ({pendingFriendList && pendingFriendList.length})
            </Link>
          </span>
        </div>
      </div>
      <div>
        <p>{auth.bio}</p>
        <UserEvents userId={user.id} />
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
      <div>{auth.id && <PplMayKnow auth={auth.id} />}</div>
    </div>
  );
};

export default User;
