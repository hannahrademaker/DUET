import React, { useState, useEffect } from "react";

const API_KEY = "fmAEcxmSvwqhltBAynkfzAyvdJLNg28X";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const latitude = 40.7128;
  const longitude = -74.006;
  const radius = 5000;
  const keyword = "concert";
  //   const postalcode = 10014;

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&latlong=${latitude},${longitude}&keyword=${keyword}&radius=${radius}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data["_embedded"]["events"]);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          {event.name} - {event["_embedded"]["venues"][0]["name"]}
        </li>
      ))}
    </ul>
  );
};

export default Events;
