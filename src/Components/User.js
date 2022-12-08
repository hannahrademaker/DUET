import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth, fetchUsers } from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const User = () => {
  const { auth, users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const friendList = auth.requester.concat(auth.accepter);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
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
            buddy = friend;
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
                </li>
              </div>
            );
          })}
        </div>
      </div>

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
            let stranger;
            for (let i = 0; i < friendList.length; i++) {
              stranger = friendList[i];
            }
            if (stranger.id !== user.id && user.id !== auth.id) {
              return <li key={user.id}>{user.username}</li>;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default User;
