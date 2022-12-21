import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendship,
} from "../store";
import { Card, Button, CardActions, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircle from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const PplMayKnow = () => {
  const { auth, users, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();
  let buttonColor = "primary";

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

  const inboxReqs = friendships.filter((pending) => {
    if (pending.status === "pending" && pending.accepterId === auth.id) {
      return pending;
    }
  });

  const destroyFriendship = (friend) => {
    let friendship = friendships.find(
      (friendship) =>
        friendship.ids.includes(friend.id) && friendship.ids.includes(auth.id)
    );
    dispatch(deleteFriendship(friendship));
  };

  const receivedReqIds = inboxReqs.map((user) => user.requesterId);

  const sendFR = (user, auth) => {
    let friendship = {
      accepterId: user.id,
      requesterId: auth.id,
    };
    buttonColor = "secondary";
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
    <div className="people-you-may-know-cards">
      <Typography variant="h5">People you may know</Typography>
      <ul className="may-know-list">
        {users.map((user) => {
          //set up a max of 6 people you may know?? or just show all?
          if (!myFriendsIds.includes(user.id) && user.id !== auth.id) {
            return (
              <Card key={user.id} className="ppl-may-know">
                <Link className="ppl-may-know-link" to={`/users/${user.id}`}>
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {user.username}
                  </Typography>
                  {user.img && (
                    <img className="people-you-may-know-img" src={user.img} />
                  )}
                  {!user.img && (
                    <img
                      className="people-you-may-know-img"
                      src="../static/DUET/blankprofile.png"
                      alt="blank profile"
                    />
                  )}
                </Link>
                <CardActions>
                  {!sentRequestsIds.includes(user.id) &&
                    !receivedReqIds.includes(user.id) && (
                      <Button
                        className="Attending-button"
                        aria-label="attending"
                        variant="contained"
                        color={buttonColor}
                        size="small"
                        startIcon={<AddCircleIcon />}
                        onClick={() => sendFR(user, auth)}
                      >
                        Add
                      </Button>
                    )}
                  {receivedReqIds.includes(user.id) && (
                    <div className="accept-deny">
                      <div className="accept">
                        <Button
                          startIcon={<AddCircleIcon />}
                          onClick={() => weFriends(user)}
                          variant="contained"
                          size="small"
                        >
                          Accept
                        </Button>
                      </div>
                      <Button
                        variant="outlined"
                        onClick={() => destroyFriendship(user)}
                        startIcon={<RemoveCircleOutlineIcon />}
                        className="deny"
                        size="small"
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                  {sentRequestsIds.includes(user.id) && (
                    <Button
                      className="Attending-button"
                      aria-label="attending"
                      variant="contained"
                      color="secondary"
                      startIcon={<CheckCircle />}
                      onClick={() => destroyFriendship(user)}
                      size="small"
                    >
                      Sent
                    </Button>
                  )}
                </CardActions>
              </Card>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default PplMayKnow;
