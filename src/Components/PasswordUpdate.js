import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateAuth } from "../store";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [password, setPassword] = useState("");

  const update = async (ev) => {
    ev.preventDefault();
    const updated = {
      password,
    };
    try {
      dispatch(updateAuth(updated));
      navigate("/user/");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="account-update">
      <div className="profile-head">
        <h3>Change Password</h3>
      </div>
      <form onSubmit={update}>
        <label>New Password:</label>
        <input
          placeholder="Please enter your new password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ textTransform: "none" }}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
