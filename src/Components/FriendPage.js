import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const FriendPage = () => {
  const { users, auth } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  return (
    <div id="user-page">
      {users.map((friend) => {
        if (friend.id === id) {
          const friendList = friend.accepter.concat(friend.requester);
          const friendListIds = friendList.map((friendId) => friendId.id);

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
              <div className="list-6-friends">
                <div>
                  {friendList.map((friendOfFriend) => {
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
                      className="hide-user-details-button"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      Hide Friend Details
                    </button>
                  </div>
                )}
              </div>
              <div className="people-you-may-know-cards">
                <p>People {`${friend.username}`} may know</p>
                <ul>
                  {users.map((user, i) => {
                    if (
                      !friendListIds.includes(user.id) &&
                      user.id !== friend.id
                    ) {
                      return (
                        <div key={user.id}>
                          <li>
                            <Link to={`/users/${user.id}`}>
                              {user.username}
                            </Link>
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
