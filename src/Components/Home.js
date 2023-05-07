import React, { useEffect, useState } from "react";
import { filterEvents, fetchEvents } from "../Helpers/TicketMaster";
import Events from "./Events";
import Map from "./Map";

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [radius, setRadius] = useState(10);

  const filteredEvents = filterEvents(events, filter);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchEvents(userLocation, radius)
        .then((response) => response.json())
        .then((data) => setEvents(data._embedded.events));
    }
  }, [userLocation, radius]);

  return (
    <div className="home_container">
      <Events
        filter={filter}
        radius={radius}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        filteredEvents={filteredEvents}
        setFilter={setFilter}
        setRadius={setRadius}
      />
      <div>{}</div>
      {/* <div id="map_events_container">
        <div className="mapcontainer">
          <Map filteredEvents={filteredEvents} />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
