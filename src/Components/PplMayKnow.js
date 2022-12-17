import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendFriendRequest, acceptFriendRequest } from "../store";
import { Card, Button, CardActions, Typography } from "@mui/material";

const PplMayKnow = () => {
  const { auth, users, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();

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

  const pendingFriendList = auth.Accepter.concat(auth.Requester).filter(
    (friend) => friend.friendship.status === "pending"
  );

  const pendingFriendListIds = pendingFriendList.map(
    (pendingId) => pendingId.id
  );

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
                  {!sentRequestsIds.includes(user.id) && (
                    <Button onClick={() => sendFR(user, auth)}>
                      Send Friend Request
                    </Button>
                  )}
                  {inboxIds.includes(user.id) && (
                    <Button onClick={() => weFriends(user)}>Confirm</Button>
                  )}
                  {sentRequestsIds.includes(user.id) && (
                    <Button disabled={true}>Friend Request Sent</Button>
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
