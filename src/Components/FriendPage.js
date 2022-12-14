import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  sendFriendRequest,
  blockUser,
  deleteFriendship,
  fetchFriendships,
} from "../store";

const FriendPage = () => {
  const { users, auth, friendships } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchFriendships());
  }, []);

  const destroyFriendship = (friend, cUser) => {
    const [friendship] = friendships.filter((friendship) => {
      if (friendship.ids.includes(friend) && friendship.ids.includes(cUser)) {
        return friendship;
      }
    });
    dispatch(deleteFriendship(friendship));
  };

  const outbox = auth.Requester.filter(
    (invite) => invite.friendship.status === "pending"
  );
  const outboxIds = outbox.map((outboxId) => outboxId.id);

  return (
    <div id="user-page">
      {users.map((friend) => {
        if (friend.id === id) {
          console.log(friend);
          let friendList = friend.Accepter.concat(friend.Requester).filter(
            (friend) => friend.friendship.status === "accepted"
          );
          let pendingFriendList = auth.Accepter.concat(auth.Requester).filter(
            (friend) => friend.friendship.status === "pending"
          );
          console.log(pendingFriendList);
          let requested = false;

          const friendListIds = friendList.map((friendId) => friendId.id);
          // <button onClick={() => dispatch(blockUser(friend))}>
          //                 Block {friend.username}
          //               </button>
          return (
            <div key={friend.id}>
              <div className="username-top">
                <h3>{friend.username}</h3>
              </div>
              <div className="profile-page-details-top">
                <img
                  src={friend.avatar}
                  alt="Pic of friend"
                  width="200"
                  height="200"
                />
              </div>
              <div>
                <span>Events ()</span>
                <span>Friends ({friendList.length})</span>
              </div>
              <div>
                <h4>
                  {friend.firstName} {friend.lastName}
                </h4>
                <p>{friend.bio}</p>
              </div>
              <div className="list-6-friends">
                <div>
                  {friendList.map((friendOfFriend) => {
                    if (friendOfFriend.id !== auth.id) {
                      return (
                        <div key={friendOfFriend.id} className="friend-card">
                          <ul>
                            <li>
                              <Link to={`/users/${friendOfFriend.id}`}>
                                {friendOfFriend.username}
                              </Link>
                              <img
                                src={friendOfFriend.avatar}
                                alt="Pic of Friend"
                                width="200"
                                height="200"
                              />
                            </li>
                          </ul>
                        </div>
                      );
                    } else if (friendOfFriend.id === auth.id) {
                      return (
                        <div key={auth.id} className="friend-card">
                          <ul>
                            <li>
                              <Link to={`/user`}>{auth.username}</Link>
                              <img
                                src={auth.avatar}
                                alt="Pic of Friend"
                                width="200"
                                height="200"
                              />
                            </li>
                          </ul>
                        </div>
                      );
                    }
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
                    See Friend Info
                  </button>
                )}
                {toggle && (
                  <div className="user-details">
                    <div>
                      <h4>Email address</h4>
                      <p>{friend.email}</p>
                    </div>
                    <h4>Address</h4>
                    <p>
                      {friend.address} {friend.addressDetails}
                    </p>
                    <p>
                      {friend.city}, {friend.state} {friend.zip}
                    </p>

                    <button
                      onClick={() => destroyFriendship(friend.id, auth.id)}
                    >
                      Unfriend
                    </button>
                    <br />
                    <button
                      className="hide-user-details-button"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      See {friend.username}'s About Info'
                    </button>
                  </div>
                )}
              </div>
              <div className="people-you-may-know-cards">
                <p>People you may know</p>
                <ul>
                  {users.map((user) => {
                    // friendships.forEach((friendship) => {
                    //   if (
                    //     friendship.ids.includes(auth.id) &&
                    //     friendship.ids.includes(user.id) &&
                    //     friendship.status === "pending"
                    //   ) {
                    //     requested = true;
                    //   }
                    // });
                    if (
                      !friendListIds.includes(user.id) &&
                      user.id !== auth.id &&
                      user.id !== friend.id
                    ) {
                      return (
                        <div key={user.id}>
                          <li>
                            <Link to={`/users/${user.id}`}>
                              {user.username}
                              <img
                                src={user.avatar}
                                alt="Pic of User"
                                width="200"
                                height="200"
                              />
                            </Link>
                            {!outboxIds.includes(user.id) && (
                              <button
                                onClick={() =>
                                  dispatch(sendFriendRequest(user))
                                }
                              >
                                Send Friend Request
                              </button>
                            )}
                            {outboxIds.includes(user.id) && (
                              <button disabled={true}>
                                Friend Request Sent
                              </button>
                            )}
                          </li>
                        </div>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FriendPage;
