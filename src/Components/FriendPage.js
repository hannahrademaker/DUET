import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteFriendship } from "../store";
import FriendOfFriend from "./FriendOfFriend";
import { Typography } from "@mui/material";

const FriendPage = () => {
  const { id } = useParams();
  const { users, auth, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const friend = users.find((user) => id === user.id);

  const destroyFriendship = (friend) => {
    let friendship = friendships.find(
      (friendship) =>
        friendship.ids.includes(friend.id) && friendship.ids.includes(auth.id)
    );
    dispatch(deleteFriendship(friendship));
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

  const confirmedFOF = friendships.filter((friendship) => {
    if (
      friendship.status === "accepted" &&
      friendship.ids.includes(friend.id)
    ) {
      return friendship;
    }
  });

  const friendsOfFriends = users.reduce((acc, user) => {
    for (let i = 0; i < confirmedFOF.length; i++) {
      if (confirmedFOF[i].ids.includes(user.id) && user.id !== friend.id) {
        acc.push(user);
      }
    }
    return acc;
  }, []);

  const mutualFriends = myFriends.reduce((acc, buddy) => {
    for (let i = 0; i < friendsOfFriends.length; i++) {
      if (buddy === friendsOfFriends[i] && !acc.includes(buddy)) {
        acc.push(buddy);
      }
    }
    return acc;
  }, []);

  const friendsIds = friendsOfFriends.map((myFriendsId) => myFriendsId.id);

  // const friendListIds = friendList.map((friendId) => friendId.id);
  if (!friend) return null;
  if (friend)
    return (
      <div className="user-page">
        <div className="username-top">
          {friend.img && (
            <img
              src={friend.img ? friend.img : "../static/DUET/blankprofile.png"}
              alt="Pic of friend"
              width="200"
              height="200"
            />
          )}
          <Typography variant="h1">{friend.username}</Typography>
        </div>
        <div>
          <span>Events ()</span>
          <span>Friends ({friendsOfFriends.length})</span>
        </div>
        <div>
          <h4>
            {friend.firstName} {friend.lastName}
          </h4>
          <p>{friend.bio}</p>
        </div>
        {myFriends.includes(friend) && (
          <div className="toggle-user-details">
            {!toggle && (
              <button
                className="see-user-details-button"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                See Friend Info
              </button>
            )}
            {toggle && (
              <div className="user-details">
                <div>
                  <h4>Email address</h4>
                  <p>{friend.email}</p>
                </div>
                <button onClick={() => destroyFriendship(friend)}>
                  Unfriend
                </button>
                <br />
                <button
                  className="hide-user-details-button"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Hide {friend.username}'s Info'
                </button>
              </div>
            )}
            <FriendOfFriend id={id} />
          </div>
        )}
      </div>
    );
};

export default FriendPage;
