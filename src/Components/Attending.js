import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { AvatarGroup, Avatar } from "@mui/material";

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
      <AvatarGroup className="Attending-list" max={5}>
        {attendings.map((user) => (
          <Avatar
            className="profileImg"
            alt="Whos Attending Image"
            src={user.img ? user.img : "../static/DUET/blankprofile.png"}
          />
        ))}
      </AvatarGroup>
    </div>
  );
};

export default Attending;
