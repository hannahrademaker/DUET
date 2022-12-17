import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendship } from "../store";
import { Card, Button, Typography, CardActions } from "@mui/material";

const UserFriends = () => {
  const { auth, friendships, users } = useSelector((state) => state);
  const dispatch = useDispatch();

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

  const destroyFriendship = (friend) => {
    const friendship = friendships.find(
      (friendship) =>
        friendship.ids.includes(friend.id) && friendship.ids.includes(auth.id)
    );
    dispatch(deleteFriendship(friendship));
  };

  return (
    <div className="list-6-friends">
      <Typography variant="h4">Friends</Typography>
      {myFriends.length < 1
        ? "Add some friends!"
        : myFriends.map((friend) => {
            return (
              <Card
                sx={{ width: 200 }}
                key={friend.id}
                className="friend-card"
                auth={auth.id}
              >
                <Link
                  to={`/users/${friend.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="h5">{friend.username}</Typography>
                  <img
                    className="friend-img"
                    src={
                      friend.img
                        ? friend.img
                        : "../static/DUET/blankprofile.png"
                    }
                    alt="Pic of User"
                    width="100"
                    height="100"
                  />
                </Link>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    onClick={() => destroyFriendship(friend)}
                  >
                    Unfriend
                  </Button>
                </CardActions>
              </Card>
            );
          })}
    </div>
  );
};

export default UserFriends;
