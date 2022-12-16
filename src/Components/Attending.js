import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";

const Attending = ({ eventId }) => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const attendings = users.filter((user) => {
    if (user.attendings) {
      const attending = user.attendings.find(
        (item) => item.eventId === eventId
      );
      if (attending !== undefined) {
        return user;
      }
    }
  });

  return (
    <div>
      <button
        className="Attending-button"
        onClick={() => {
          console.log("clicked");
        }}
      >
        Im Going!
      </button>

      {attendings.length === 0 ? (
        <div>Be the first DUET user to attend</div>
      ) : (
        <div>Whos Attending</div>
      )}
      <div className="Attending-list">
        {attendings.map((user) => (
          <div className="Attending-item">
            <div className="Attending-item-name">{user.username}</div>
            <div className="Attending-item-image">
              <img
                className="profileImg"
                src={user.img ? user.img : "../static/DUET/blankprofile.png"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attending;