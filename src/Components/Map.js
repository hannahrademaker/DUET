import React, { useEffect, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "../store/mapStyles";
import { useDispatch, useSelector } from "react-redux";

const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ filteredEvents }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBM-kc17ICi5elvOP04xO4yj_HZR3F2hTw",
    libraries,
  });

  if (loadError) return <div>Error Loading Maps</div>;

  if (!isLoaded) return <div>Loading...</div>;
  return <Maps filteredEvents={filteredEvents} />;
};

export default Map;

function Maps({ filteredEvents }) {
  const events = useSelector((state) => state.events);
  // console.log(events);
  const center = useMemo(() => ({ lat: 40.69, lng: -74 }), []);
  return (
    <GoogleMap
      zoom={10.5}
      center={center}
      mapContainerClassName="map-container"
      options={options}
    >
      {filteredEvents.map((event) => (
        <Marker
          key={event.id}
          position={{
            lat: parseFloat(event._embedded.venues[0].location.latitude),
            lng: parseFloat(event._embedded.venues[0].location.longitude),
          }}
        />
      ))}

      <Marker position={{ lat: 40.734929, lng: -74.0059575 }} />
    </GoogleMap>
  );
}
