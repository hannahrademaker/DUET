import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchTicketMasterEvents, fetchFriends } from "../store";
import axios from "axios";
import Events from "./Events";
import Map from "./Map";

const Home = () => {
  const { auth, friendships } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(auth);

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  console.log(friendships);
  // const { events } = useSelector(state => state);

  // useEffect(()=>{
  //   dispatch(fetchTicketMasterEvents())
  // }, []);

  // console.log(events)

  return (
    <div className="home_container">
      <h2>What are we doing this weekend?</h2>
      <div id="map_events_container">
        <Map />
        <Events />
      </div>
    </div>
  );
};

export default Home;
