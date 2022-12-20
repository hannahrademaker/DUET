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
  const { auth, attending, users } = useSelector((state) => state);

  useEffect(() => {
    const user = users.find((user) => user.id === userId);
    const attend = attending.filter(
      (att) => user && att.userId === user.id && att.isAttending === true
    );
    const eventIds = attend.map((item) => item.eventId);
    Promise.all(
      eventIds.map(async (indvEvent) => {
        const res = await fetchEvent(indvEvent);
        return await res.json();
      })
    ).then((data) => setEvents(data));
  }, [auth, attending]);

  if (!userId) return null;

  return (
    <div>
      <Typography variant="h3">Events</Typography>
      {events.length < 1 ? (
        <Typography variant="h5" sx={{ margin: "5% 0" }}>
          You aren't attending any events!
        </Typography>
      ) : (
        <List
          sx={{
            margin: "auto",
            width: "100%",
            maxWidth: 400,
            bgcolor: "background.paper",
          }}
        >
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
      )}
    </div>
  );
};

export default UserEvents;
