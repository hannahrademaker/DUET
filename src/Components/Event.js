import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
const API_KEY = "fmAEcxmSvwqhltBAynkfzAyvdJLNg28X";
import Comments from "./Comments";
import { fetchEvent } from "../Helpers/TicketMaster";
import { useSelector } from "react-redux";
import Attending from "./Attending";

const Event = (props) => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchEvent(id)
      .then((response) => response.json())
      .then((data) => setEvent(data));
  }, []);

  if (!event) {
    return <div />;
  }

  return (
    <div className="indvEvent">
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        Buy Tickets
      </a>
      <Typography className="indvEventName" variant="h2">
        {event.name}
      </Typography>
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
      <Attending eventId={id} />
      <img className="eventImg" src={event.images[0].url} alt="event" />
      <center>
        <Comments eventId={id} />
      </center>
    </div>
  );
};

export default Event;
