import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuth,
  fetchUsers,
  friendRequest,
  fetchFriendships,
} from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const User = () => {
  const { auth, users, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const friendList = auth.accepter.concat(auth.requester);

  const friendListIds = friendList.map((friendId) => friendId.id);
  // useEffect(() => {
  //   dispatch(fetchFriendships());
  // });

  const addFriend = async (ev) => {
    try {
      //ev.preventDefault();
      //console.log(ev);
      await ev.requester.push(auth);
      await dispatch(friendRequest(ev));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="user-page">
      <div className="username-top">
        <h3>{auth.username}</h3>
      </div>
      <div>
        <div className="profile-page-details-top">
          <img src={auth.avatar} alt="Pic of User" width="200" height="200" />
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
            See User Info
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
            if (!friendListIds.includes(user.id) && user.id !== auth.id) {
              return (
                <div key={user.id}>
                  <li>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                    <img
                      src={user.avatar}
                      alt="Pic of User"
                      width="200"
                      height="200"
                    />
                    <button
                      disabled={user.requester.includes(auth)}
                      onClick={() => addFriend(user)}
                    >
                      Send Friend Request
                    </button>
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
