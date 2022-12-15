import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEvent } from "../Helpers/TicketMaster";

function UserEvents({ userId }) {
  const [events, setEvents] = useState([]);
  const user = useSelector((state) => state.auth);
  const eventIds = user.attendings.map((item) => item.eventId);

  useEffect(() => {
    eventIds.forEach((event) => {
      fetchEvent(event)
        .then((response) => response.json())
        .then((data) => setEvents((events) => [...events, data]));
    });
  }, []);

  console.log(events);
  console.log(eventIds);

  return (
    <div>
      {events.map((event) => {
        return (
          <div>
            <h3>{event.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default UserEvents;
