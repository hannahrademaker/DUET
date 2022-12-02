import React from "react";
import Register from "./Register";
import Map from "./Map";
import Nav from "./Nav";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
