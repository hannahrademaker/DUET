import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchTicketMasterEvents } from "../store";
import axios from "axios";
import Events from "./Events";

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
      <div>
        Welcome {auth.username}!!
        <img src={auth.avatar} alt="moe" width="200" height="200" />
        <Events />
      </div>
    </div>
  );
};

export default Home;
