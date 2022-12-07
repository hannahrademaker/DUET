import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Events = ({
  filter,
  radius,
  userLocation,
  filteredEvents,
  setFilter,
  setRadius,
}) => {
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
        <label>
          Filter by radius:
          <select value={radius} onChange={(e) => setRadius(e.target.value)}>
            <option value="1">1 Mile</option>
            <option value="5">5 Miles</option>
            <option value="10">10 Miles</option>
            <option value="20">20 Miles</option>
          </select>
        </label>
      </form>
      {userLocation && (
        <ul className="Events-list">
          {filteredEvents.map((event) => (
            <Link to={`/event/${event.id}`}>
              <li key={event.id}>
                <h2>{event.name}</h2>
                {event.images.length > 0 && (
                  <img src={event.images[0].url} alt={event.name} />
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
