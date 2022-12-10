// import axios from 'axios';

// export const fetchEvents = radius => {
//   return axios
//     .get(
//       `https://app.ticketmaster.com/discovery/v2/events.json?radius=${radius}&apikey=your_api_key`
//     )
//     .then(response => response.data._embedded.events)
//     .catch(error => {
//       console.error(error);
//     });
// };

// import React, { useState, useEffect } from 'react';
// import { fetchEvents } from './api';

// function EventsList() {
//   const [events, setEvents] = useState([]);
//   const [radius, setRadius] = useState(10);

//   useEffect(() => {
//     fetchEvents(radius).then(events => {
//       setEvents(events);
//     });
//   }, [radius]);

//   return (
//     <div>
//       <label>
//         Radius:
//         <input
//           type="number"
//           value={radius}
//           onChange={event => setRadius(event.target.value)}
//         />
//       </label>
//       <ul>
//         {events.map(event => (
//           <li key={event.id}>{event.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
