import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const Events = ({
  filter,
  radius,
  userLocation,
  filteredEvents,
  setFilter,
  setRadius,
}) => {
  const attendingEvent = (e) => {
    console.log(e.id);
  };

  const interestedInAttending = (e) => {
    console.log(e.name);
  };

  return (
    <div className="Events">
      <h1>Concerts Near You</h1>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                <IconButton
                  aria-label="attending"
                  onClick={() => attendingEvent(event)}
                >
                  <AddCircleIcon color="secondary" />
                </IconButton>
                <IconButton
                  aria-label="interested-in-attending"
                  onClick={() => interestedInAttending(event)}
                >
                  <FavoriteIcon color="secondary" />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
