import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
import { Link } from "react-router-dom";

const User = () => {
  const { auth } = useSelector((state) => state);
  const [el, setEl] = useState(null);
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (el) {
      el.addEventListener("change", (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          setData(reader.result);
        });
      });
    }
  }, [el]);

  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ avatar: data }));
    el.value = "";
    setData("");
  };

  return (
    <div className="account-container">
      <div className="profile-head">
        <h3>Profile</h3>
        <Link to="/user/update">
          <button>Edit Profile</button>
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

      {/* <form className="avatar-form" onSubmit={save}>
        <input type="file" ref={(x) => setEl(x)} />

        <button disabled={!data}>Upload Avatar</button>
      </form>
      {data ? <h6>Avatar Preview</h6> : null}
      <img src={data} className={data ? "avatar-preview" : null} /> */}
    </div>
  );
};

export default User;
