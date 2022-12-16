const API_KEY = "fmAEcxmSvwqhltBAynkfzAyvdJLNg28X";

export const filterEvents = (events, filter) => {
  if (filter) {
    return events.filter(
      (event) => event.classifications[0].segment.name === filter
    );
  }
  return events;
};

export const fetchEvents = (userLocation, radius) => {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${userLocation.lat},${userLocation.lng}&radius=${radius}&unit=miles&apikey=${API_KEY}`
  );
};

export const fetchEvent = (id) => {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${API_KEY}`
  );
};

export const fetchUserEvents = (user) => {
  const eventIds = user.attendings.map((item) => item.eventId);
  const events = eventIds.map((event) => {
    return fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${event}?apikey=${API_KEY}`
    );
  });
};
