import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const User = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="account-container">
      <div className="profile-head">
        <h3>Profile</h3>
        <Link to="/user/update">
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      <div>
        <h4>Email address</h4>
        <p>{auth.email}</p>
      </div>

      <h4>Username</h4>
      <p>{auth.username}</p>
      <h4>Name</h4>
      <p>
        {auth.firstName} {auth.lastName}
      </p>
      <h4>Address</h4>
      <p>
        {auth.address} {auth.addressDetails}
      </p>
      <p>
        {auth.city}, {auth.state} {auth.zip}
      </p>
    </div>
  );
};

export default User;
