import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { AvatarGroup, Avatar, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { attendingEvent, updateAttending } from "../store";

const Attending = ({ eventId }) => {
  const { auth, users, attending } = useSelector((state) => state);
  const dispatch = useDispatch();
  const attId = attending.filter(
    (att) => att.eventId === eventId && att.isAttending === true
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const attendings = users.filter((user) => {
    if (attending) {
      const att = attId.find((item) => item.userId === user.id);
      if (att !== undefined) {
        return user;
      }
    }
  });

  const att = attendings.find((u) => u.id === auth.id);

  const isAttending = (eventId) => {
    if (att) {
      att.isAttending = !att.isAttending;
      dispatch(updateAttending(event));
    } else {
      const letsGo = { userId: auth.id, eventId, isAttending: true };
      dispatch(attendingEvent(letsGo));
    }
  };

  return (
    <div>
      {att === undefined ? (
        <Button
          className="Attending-button"
          aria-label="attending"
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => isAttending(eventId)}
        >
          Im Going!
        </Button>
      ) : null}

      {attendings.length === 0 ? (
        <div>Be the first DUET user to attend</div>
      ) : (
        <div>Whos Attending</div>
      )}
      <AvatarGroup
        className="Attending-list"
        max={5}
        sx={{ justifyContent: "center" }}
      >
        {attendings.map((user) => (
          <Link
            key={user.id}
            to={user.id !== auth.id ? `/users/${user.id}` : `/user`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Avatar
              className="profileImg"
              alt="Whos Attending Image"
              src={user.img ? user.img : "../static/DUET/blankprofile.png"}
            />
          </Link>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default Attending;
