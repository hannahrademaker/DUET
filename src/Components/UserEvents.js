import React, { useState, useEffect } from "react";

function UserEvents(props) {
  const { userId } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Assuming you have a function called getEventsForUser that takes a userId and
      // returns a list of events that the user is attending
      const events = await getEventsForUser(userId);
      setEvents(events);
    }
    fetchData();
  }, [userId]);

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.name}</li>
      ))}
    </ul>
  );
}

export default UserEvents;
