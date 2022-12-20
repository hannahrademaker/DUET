import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendRequest, acceptFriendRequest } from "../store";
import { Link } from "react-router-dom";
import { Button, Dialog, Typography } from "@mui/material";
import PplMayKnow from "./PplMayKnow";
import UserFriends from "./UserFriends";
import FriendRequests from "./FriendRequests";
import UserEvents from "./UserEvents";

const RequestProp = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <FriendRequests />
    </Dialog>
  );
};

const User = () => {
  const { auth, users, friendships, attending } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const inboxReqs = friendships.filter((pending) => {
    if (pending.status === "pending" && pending.accepterId === auth.id) {
      return pending;
    }
  });

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
        <Link to="/user/update">
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            EDIT PROFILE
          </Button>
        </Link>
      </div>
      <div>
        <br />
        <div className="you-got-friends">
          <Typography variant="button" component="h3">
            {auth.attendings.length !== 1
              ? `${auth.attendings.length} Events`
              : `${auth.attendings.length} Event`}
          </Typography>
          <Typography variant="button" component="h3">
            {myFriends.length !== 1
              ? `${myFriends.length} Friends`
              : `${myFriends.length} Friend`}
          </Typography>
          <span>
            <Button variant="standard" onClick={handleRequestOpen}>
              Friend Requests ({inboxReqs && inboxReqs.length})
            </Button>
            <RequestProp open={open} onClose={handleClose} />
          </span>
        </div>
      </div>
      <div>
        <p>{auth.bio}</p>
      </div>
      <div className="toggle-user-details">
        {!toggle && (
          <Button
            variant="contained"
            className="see-user-details-button"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            See Your About Info
          </Button>
        )}
        {toggle && (
          <div className="user-details">
            <div>
              <h4>Email address</h4>
              <p>{auth.email}</p>
            </div>
            <Button
              variant="contained"
              className="hide-user-details-button"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Hide User Details
            </Button>
          </div>
        )}
      </div>
      <UserFriends />
      <UserEvents userId={auth.id} />
      <div>{auth.id && <PplMayKnow />}</div>
    </div>
  );
};

export default User;
