import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Login = () => {
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
    dispatch(attemptLogin(credentials));
    navigate("/");
  };
  return (
    <div id="login">
      <h2>Login</h2>
      <form onSubmit={login}>
        <TextField
          variant="outlined"
          margin="dense"
          label="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="dense"
          type="password"
          label="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
