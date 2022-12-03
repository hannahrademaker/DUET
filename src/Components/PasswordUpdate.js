import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateAuth } from "../store";

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

        <button>Change Password</button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
