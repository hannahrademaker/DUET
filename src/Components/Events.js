import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  CardActions,
  Button,
} from "@mui/material";
import { attendingEvent, updateAttending } from "../store";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Events = ({
  filter,
  radius,
  userLocation,
  setUserLocation,
  filteredEvents,
  setFilter,
  setRadius,
}) => {
  const { auth, attending } = useSelector((state) => state);
  const dispatch = useDispatch();
  const attend = attending.filter((att) => att.userId === auth.id);

  const isAttending = (e) => {
    const event = attend.find((ev) => ev.eventId === e.id);
    if (event) {
      event.isAttending = !event.isAttending;
      dispatch(updateAttending(event));
    } else {
      const letsGo = { userId: auth.id, eventId: e.id, isAttending: true };
      dispatch(attendingEvent(letsGo));
    }
  };

  const dotAnimation = {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 1.5, opacity: 0 },
    transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
  };

  const buttonColor = (event) => {
    const ev = attend.find((e) => e.eventId === event.id);
    if (ev) {
      if (ev.isAttending === true) return "primary";
    }
    return "secondary";
  };

  return (
    <div className="Events">
      {filteredEvents.length === 0 ? (
        <Typography variant="h5" component="div" sx={{ flexGrow: 0.5, mt: 10 }}>
          Finding Events
          <motion.span
            {...dotAnimation}
            transition={{ ...dotAnimation.transition, delay: 0.0 }}
          >
            .
          </motion.span>
          <motion.span
            {...dotAnimation}
            transition={{ ...dotAnimation.transition, delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            {...dotAnimation}
            transition={{ ...dotAnimation.transition, delay: 0.4 }}
          >
            .
          </motion.span>
        </Typography>
      ) : (
        <>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0.5 }}>
            Events Near You
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 200, backgroundColor: "white" }}>
            <InputLabel id="filter-by-type">Filter by Type:</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Arts & Theatre">Arts & Theatre</MenuItem>
              <MenuItem value="Film">Film</MenuItem>
              <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200, backgroundColor: "white" }}>
            <InputLabel id="filter-by-radius">Filter by Radius:</InputLabel>
            <Select value={radius} onChange={(e) => setRadius(e.target.value)}>
              <MenuItem value="1">1 Mile</MenuItem>
              <MenuItem value="5">5 Miles</MenuItem>
              <MenuItem value="10">10 Miles</MenuItem>
              <MenuItem value="20">20 Miles</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      {userLocation && (
        <ul className="Events-list">
          {filteredEvents.map((event) => (
            <Card key={event.id} sx={{ maxWidth: 300 }}>
              <CardContent>
                <Link className="event_link" to={`/event/${event.id}`}>
                  {event.images.length > 0 && (
                    <CardMedia
                      component="img"
                      src={event.images[0].url}
                      alt={event.name}
                    />
                  )}
                  <Typography variant="h6" component="h1">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event.dates.start.localDate}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event._embedded.venues[0].name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event._embedded.venues[0].city.name},{" "}
                    {event._embedded.venues[0].state.name}
                  </Typography>
                </Link>
              </CardContent>
              <CardActions>
                <Button
                  aria-label="attending"
                  variant="contained"
                  startIcon={
                    buttonColor(event) === "primary" ? (
                      <CheckCircle />
                    ) : (
                      <AddCircleIcon />
                    )
                  }
                  color={buttonColor(event)}
                  onClick={() => isAttending(event)}
                >
                  {" "}
                  {buttonColor(event) === "primary"
                    ? "Attending"
                    : "Add to Events"}
                </Button>
              </CardActions>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
