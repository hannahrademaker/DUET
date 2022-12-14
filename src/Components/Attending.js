import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";

const Attending = ({ eventId }) => {
  const { users } = useSelector((state) => state);
  const { attending } = useSelector((state) => state);
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

  console.log("attendings", attendings);

  console.log(attendings);
  return (
    <div>
      <h1>Whos Attending</h1>
    </div>
  );
};

export default Attending;
