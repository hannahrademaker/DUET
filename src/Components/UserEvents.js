import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEvent } from "../Helpers/TicketMaster";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserEvents = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const { auth, attending } = useSelector((state) => state);
  const attend = attending.filter((att) => att.userId === auth.id);
  const eventIds = attend.map((item) => item.eventId);

  // useEffect(() => {
  //   eventIds.forEach((event) => {
  //     fetchEvent(event)
  //       .then((response) => response.json())
  //       .then((data) => setEvents((events) => [...events, data]));
  //   });
  // }, [eventIds]);

  useEffect(() => {
    Promise.all(
      eventIds.map(async (indvevent) => {
        const response = await fetchEvent(indvevent);
        return await response.json();
      })
    ).then((data) => setEvents(data));
  }, [eventIds]);

  return (
    <div>
      <Typography variant="h3">My Events</Typography>
      <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
        {events.map((event) => {
          return (
            <ListItem key={event.id} alignItems="flex-start">
              <ListItemButton
                href={`/#/event/${event.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemAvatar>
                  <Avatar alt="event-img" src={event.images[0].url} />
                </ListItemAvatar>
                <ListItemText
                  primary={event.name}
                  secondary={
                    <Typography
                      sx={{ textShadow: "none", textTransform: "none" }}
                    >
                      {event._embedded.venues[0].name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default UserEvents;
