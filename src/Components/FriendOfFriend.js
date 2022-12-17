import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Card } from "@mui/material";

const FriendOfFriend = ({ id }) => {
  const { users, auth, friendships } = useSelector((state) => state);

  const friend = users.find((user) => id === user.id);

  const confirmedFriends = friendships.filter((friendship) => {
    if (
      friendship.status === "accepted" &&
      friendship.ids.includes(friend.id)
    ) {
      return friendship;
    }
  });

  const friendsOfFriends = users.reduce((acc, user) => {
    for (let i = 0; i < confirmedFriends.length; i++) {
      if (confirmedFriends[i].ids.includes(user.id) && user.id !== friend.id) {
        acc.push(user);
      }
    }
    return acc;
  }, []);

  return (
    <div className="list-6-friends">
      <Typography variant="h4">Friends</Typography>
      {friendsOfFriends.map((friendOfFriend) => {
        return (
          <Card
            key={friendOfFriend.id}
            className="friend-card"
            sx={{ width: 150, height: 200 }}
          >
            <Link
              to={
                friendOfFriend.id !== auth.id
                  ? `/users/${friendOfFriend.id}`
                  : `/user`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h5" sx={{ margin: "5% 0" }}>
                {friendOfFriend.username}
              </Typography>
              <img
                className="people-you-may-know-img"
                src={
                  friendOfFriend.img
                    ? friendOfFriend.img
                    : "../static/DUET/blankprofile.png"
                }
                alt="Pic of Friend"
                width="100"
                height="100"
              />
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default FriendOfFriend;
