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
      <h2>Register</h2>
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
