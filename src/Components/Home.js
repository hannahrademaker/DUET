import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchTicketMasterEvents } from "../store";
import axios from "axios";
import Events from "./Events";
import Map from "./Map";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(auth);
  // const { events } = useSelector(state => state);

  // useEffect(()=>{
  //   dispatch(fetchTicketMasterEvents())
  // }, []);

  // console.log(events)

  return (
    <div>
      <h1>Home</h1>
      <div>Welcome {auth.username}!!</div>
      <Events />
      <Map />
    </div>
  );
};

export default Home;
