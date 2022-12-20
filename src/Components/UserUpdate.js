import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateAuth } from "../store";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material/";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const [el, setEl] = useState(null);
  const [data, setData] = useState("");

  const [inputs, setInputs] = useState({
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
    address: auth.address,
    addressDetails: auth.addressDetails,
    city: auth.city,
    state: auth.state,
    zip: auth.zip,
  });

  const update = async (ev) => {
    ev.preventDefault();
    const updated = { id: auth.id, ...inputs };
    try {
      dispatch(updateAuth(updated));
      navigate("/user/");
    } catch (ex) {
      console.log(ex);
    }
  };

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

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ img: data }));
    el.value = "";
    setData("");
  };

  return (
    <div className="user-update">
      <div className="profile-head">
        <h3>PROFILE</h3>
        <Link to="/user/password">
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: "none", width: "100%" }}
          >
            CHANGE PASSWORD
          </Button>
        </Link>
      </div>
      <form onSubmit={update}>
        <TextField
          id="standard-firstName-input"
          autoComplete="firstName"
          variant="filled"
          placeholder="First Name"
          name="firstName"
          value={inputs.firstName}
          onChange={onChange}
        />

        <TextField
          id="standard-lastName-input"
          autoComplete="lastName"
          variant="filled"
          placeholder="Last Name"
          name="lastName"
          value={inputs.lastName}
          onChange={onChange}
        />

        <TextField
          id="standard-email-input"
          autoComplete="email"
          variant="filled"
          placeholder="Email"
          type="email"
          name="email"
          value={inputs.email}
          onChange={onChange}
        />

        <TextField
          id="standard-address-input"
          autoComplete="address"
          variant="filled"
          placeholder="Address"
          name="address"
          value={inputs.address}
          onChange={onChange}
        />

        <TextField
          id="standard-addressDetails-input"
          autoComplete="addressDetails"
          variant="filled"
          placeholder="Apartment"
          name="addressDetails"
          value={inputs.addressDetails}
          onChange={onChange}
        />

        <TextField
          id="standard-city-input"
          autoComplete="city"
          variant="filled"
          placeholder="City"
          name="city"
          value={inputs.city}
          onChange={onChange}
        />

        <TextField
          id="standard-state-input"
          autoComplete="state"
          variant="filled"
          placeholder="State"
          name="state"
          value={inputs.state}
          onChange={onChange}
        />

        <TextField
          id="standard-zip-input"
          autoComplete="zip"
          variant="filled"
          placeholder="Zip"
          name="zip"
          value={inputs.zip}
          onChange={onChange}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ textTransform: "none" }}
        >
          UPDATE
        </Button>
      </form>
      <form className="avatar-form" onSubmit={save}>
        <input type="file" ref={(x) => setEl(x)} />

        <Button
          type="submit"
          variant="contained"
          style={{ textTransform: "none" }}
          disabled={!data}
        >
          Update Profile Photo
        </Button>
      </form>
      {data ? <h6>Profile Image Preview</h6> : null}
      <img src={data} className={data ? "avatar-preview" : null} />
    </div>
  );
};

export default UserUpdate;
