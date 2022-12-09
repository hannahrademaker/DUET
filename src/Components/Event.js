import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = "fmAEcxmSvwqhltBAynkfzAyvdJLNg28X";

const Event = (props) => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setEvent(data));
  }, []);
  if (!event) {
    return <div />;
  }
  return (
    <div className="indvEvent">
      {console.log(event)}
      <h1>{event.name}</h1>
      <h2>{event.dates.start.localDate}</h2>
      <h3>{event._embedded.venues[0].name}</h3>
      <h4>{event._embedded.venues[0].city.name}</h4>
      <h5>{event._embedded.venues[0].state.name}</h5>
      <h6>{event._embedded.venues[0].address.line1}</h6>
      <p>{event._embedded.venues[0].postalCode}</p>
      <p>{event._embedded.venues[0].country.name}</p>
      <img src={event.images[0].url} alt="event" />
    </div>
  );
};

export default Event;
