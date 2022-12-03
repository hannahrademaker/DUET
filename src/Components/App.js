import React from "react";
import Register from "./Register";
import Map from "./Map";
import Nav from "./Nav";
import Home from "./Home";
import LoggedOut from "./LoggedOut";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={!!auth.id ? <Home /> : <LoggedOut />} />
      </Routes>
    </div>
  );
};

export default App;
