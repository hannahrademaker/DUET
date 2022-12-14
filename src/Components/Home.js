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

  // const { events } = useSelector(state => state);

  // useEffect(()=>{
  //   dispatch(fetchTicketMasterEvents())
  // }, []);
  // console.log(auth);
  //console.log(userProfile.city);

  return (
    <div className="home_container">
      <h2>What do you want to do?!</h2>
      <div id="map_events_container">
        <Map filteredEvents={filteredEvents} />
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
      </div>
    </div>
  );
};

export default Home;
