import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
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
      <Typography variant="h2">{event.name}</Typography>
      <Typography variant="h4">
        {dayjs(event.dates.start.localDate).toString()}
      </Typography>
      <Typography variant="h4">{event._embedded.venues[0].name}</Typography>
      <Typography>
        {event._embedded.venues[0].address.line1 +
          " " +
          event._embedded.venues[0].city.name +
          " " +
          event._embedded.venues[0].state.name +
          " " +
          event._embedded.venues[0].postalCode}
      </Typography>
      <img src={event.images[0].url} alt="event" />
    </div>
  );
};

export default Event;
