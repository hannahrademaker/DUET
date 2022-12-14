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
      <p>People you may know</p>
      <ul className="may-know-list">
        {users.map((user) => {
          //set up a max of 6 people you may know?? or just show all?
          if (!friendListIds.includes(user.id) && user.id !== auth.id) {
            return (
              <Card sx={{ maxWidth: 200 }} key={user.id}>
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
                  {!pendingFriendListIds.includes(user.id) && (
                    <Button onClick={() => dispatch(sendFriendRequest(user))}>
                      Send Friend Request
                    </Button>
                  )}
                  {inboxIds.includes(user.id) && (
                    <Button onClick={() => dispatch(acceptFriendRequest(user))}>
                      Confirm
                    </Button>
                  )}
                  {outboxIds.includes(user.id) && (
                    <Button
                      onClick={() => dispatch(sendFriendRequest(user))}
                      disabled={true}
                    >
                      Friend Request Sent
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
