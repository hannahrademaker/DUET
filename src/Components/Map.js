import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../Helpers/mapStyles";
import { useSelector } from "react-redux";
// import { ContentCutOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ filteredEvents, userLocation, setUserLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBM-kc17ICi5elvOP04xO4yj_HZR3F2hTw",
    libraries,
  });

  const [selected, setSelected] = useState(null);

  const mapref = useRef();
  const onMapLoad = useCallback((map) => {
    mapref.current = map;
  }, []);

  if (loadError) return <div>Error Loading Maps</div>;

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Maps
      filteredEvents={filteredEvents}
      onMapLoad={onMapLoad}
      selected={selected}
      setSelected={setSelected}
      userLocation={userLocation}
      setUserLocation={setUserLocation}
    />
  );
};

export default Map;

function Maps({
  filteredEvents,
  onMapLoad,
  selected,
  setSelected,
  userLocation,
  setUserLocation,
}) {
  const events = useSelector((state) => state.events);
  const center = useMemo(() => {
    if (userLocation) {
      return {
        lat: userLocation.lat,
        lng: userLocation.lng,
      };
    } else {
      return {
        lat: 40.7128,
        lng: -74.006,
      };
    }
  }, [userLocation]);

  return (
    <GoogleMap
      zoom={11.5}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onMapLoad}
    >
      {filteredEvents.map((event) => (
        <Marker
          key={event.id}
          position={{
            lat: parseFloat(event._embedded.venues[0].location.latitude),
            lng: parseFloat(event._embedded.venues[0].location.longitude),
          }}
          icon={{
            url: "../static/DUET/icons8-map-pin-64.png",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setSelected(event);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{
            lat: parseFloat(selected._embedded.venues[0].location.latitude),
            lng: parseFloat(selected._embedded.venues[0].location.longitude),
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <Link className="mapLink" to={`/event/${selected.id}`}>
              <h2>{selected.name}</h2>
            </Link>
            <p>{selected._embedded.venues[0].name}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
