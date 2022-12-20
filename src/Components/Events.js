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

  const buttonColor = (event) => {
    const ev = attend.find((e) => e.eventId === event.id);
    if (ev) {
      if (ev.isAttending === true) return "secondary";
    }
    return "primary";
  };

  return (
    <div className="Events">
      <h1>Events Near You</h1>
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
      {userLocation && (
        <ul className="Events-list">
          {filteredEvents.map((event) => (
            <Card key={event.id} sx={{ maxWidth: 300 }}>
              <CardContent>
                <Link className="event_link" to={`/event/${event.id}`}>
                  <Typography variant="h6" component="h1">
                    {event.name}
                  </Typography>
                  {event.images.length > 0 && (
                    <CardMedia
                      component="img"
                      src={event.images[0].url}
                      alt={event.name}
                    />
                  )}
                </Link>
              </CardContent>
              <CardActions>
                <Button
                  aria-label="attending"
                  variant="contained"
                  startIcon={
                    buttonColor(event) === "primary" ? (
                      <AddCircleIcon />
                    ) : (
                      <CheckCircle />
                    )
                  }
                  color={buttonColor(event)}
                  onClick={() => isAttending(event)}
                >
                  {" "}
                  Attending
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
