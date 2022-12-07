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
          <span>Friends ()</span>
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
          {users.map((user) => {
            const userProfile = users.find((user) => user.id === auth.id);
            const listFriends = userProfile.requester.concat(
              userProfile.accepter
            );
            return listFriends.map((friend) => {
              if (friend.id === user.id) {
                return (
                  <div key={friend.id} className="friend-card">
                    <li>
                      {friend.username}
                      <img
                        src={friend.avatar}
                        alt="Pic of User"
                        width="200"
                        height="200"
                      />
                    </li>
                  </div>
                );
              }
            });
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
    </div>
  );
};

export default User;
