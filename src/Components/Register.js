import React, { useState } from "react";
import { register } from "../store";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    addressDetails: "",
    city: "",
    state: "",
    zip: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(register(credentials));
    navigate("/");
  };
  return (
    <div className="register">
      <h2>register</h2>
      <form onSubmit={login}>
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-password-input"
          autoComplete="current-password"
          variant="standard"
          placeholder="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-email-input"
          autoComplete="email"
          variant="standard"
          placeholder="email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-firstName-input"
          autoComplete="firstName"
          variant="standard"
          placeholder="First Name"
          name="firstName"
          value={credentials.firstName}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-lastName-input"
          autoComplete="lastName"
          variant="standard"
          placeholder="Last Name"
          name="lastName"
          value={credentials.lastName}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-address-input"
          autoComplete="address"
          variant="standard"
          placeholder="Address"
          name="address"
          value={credentials.address}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-addressDetails-input"
          autoComplete="addressDetails"
          variant="standard"
          placeholder="Apartment"
          name="addressDetails"
          value={credentials.addressDetails}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-city-input"
          autoComplete="city"
          variant="standard"
          placeholder="City"
          name="city"
          value={credentials.city}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-state-input"
          autoComplete="state"
          variant="standard"
          placeholder="State"
          name="state"
          value={credentials.state}
          onChange={onChange}
        />
        <br />
        <TextField
          id="standard-zip-input"
          autoComplete="zip"
          variant="standard"
          placeholder="Zip"
          name="zip"
          value={credentials.zip}
          onChange={onChange}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          style={{ textTransform: "none" }}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Register;
