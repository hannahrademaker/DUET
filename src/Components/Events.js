import React from "react";

const API_KEY = "fmAEcxmSvwqhltBAynkfzAyvdJLNg28X";

const Events = (props) => {
  const [userLocation, setUserLocation] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [filter, setFilter] = React.useState(null);

  const filterEvents = (events) => {
    if (filter) {
      return events.filter(
        (event) => event.classifications[0].segment.name === filter
      );
    }
    return events;
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  React.useEffect(() => {
    if (userLocation) {
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${userLocation.lat},${userLocation.lng}&radius=10&unit=miles&apikey=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setEvents(data._embedded.events));
    }
  }, [userLocation]);

  return (
    <div className="Events">
      <h1>Concerts Near You</h1>
      <form>
        <label>
          Filter by type:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
            <option value="Film">Film</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </label>
      </form>
      {userLocation && (
        <ul className="Events-list">
          {filterEvents(events).map((event) => (
            <li key={event.id}>
              <h2>{event.name}</h2>
              {event.images.length > 0 && (
                <img src={event.images[0].url} alt={event.name} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
