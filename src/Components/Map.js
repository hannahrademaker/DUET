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

const markersFromEvents = (events) => {
  console.log(events);
  // return events.map((event) => {
  //   return {
  //     lat: event._embedded.venues[0].location.latitude,
  //     lng: event._embedded.venues[0].location.longitude,
  //   };
  // });
};

const Map = () => {
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBM-kc17ICi5elvOP04xO4yj_HZR3F2hTw",
    libraries,
  });

  if (loadError) return <div>Error Loading Maps</div>;

  if (!isLoaded) return <div>Loading...</div>;
  return <Maps />;
};

export default Map;

function Maps() {
  const events = useSelector((state) => state.events);
  const markers = useMemo(() => markersFromEvents(events), [events]);
  console.log(events);
  const center = useMemo(() => ({ lat: 40.69, lng: -74 }), []);
  return (
    <GoogleMap
      zoom={10.5}
      center={center}
      mapContainerClassName="map-container"
      options={options}
    >
      {/* {markers.map((marker) => (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
      ))} */}

      <Marker position={{ lat: 40.734929, lng: -74.0059575 }} />
    </GoogleMap>
  );
}
