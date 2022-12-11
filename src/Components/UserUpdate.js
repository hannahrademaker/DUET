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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const update = async (ev) => {
    ev.preventDefault();
    const updated = {
      firstName,
      lastName,
      email,
      address,
      addressDetails,
      city,
      state,
      zip,
    };
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

  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ avatar: data }));
    el.value = "";
    setData("");
  };

  return (
    <div className="account-update">
      <div className="profile-head">
        <h3>Profile</h3>
        <Link to="/user/password">
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            Change Password
          </Button>
        </Link>
      </div>
      <form onSubmit={update}>
        <TextField
          id="standard-firstName-input"
          autoComplete="firstName"
          variant="standard"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
        />

        <TextField
          id="standard-lastName-input"
          autoComplete="lastName"
          variant="standard"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
        />

        <TextField
          id="standard-email-input"
          autoComplete="email"
          variant="standard"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <TextField
          id="standard-address-input"
          autoComplete="address"
          variant="standard"
          placeholder="Address"
          name="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        <TextField
          id="standard-addressDetails-input"
          autoComplete="addressDetails"
          variant="standard"
          placeholder="Apartment"
          name="addressDetails"
          value={addressDetails}
          onChange={(ev) => setAddressDetails(ev.target.value)}
        />

        <TextField
          id="standard-city-input"
          autoComplete="city"
          variant="standard"
          placeholder="City"
          name="city"
          value={city}
          onChange={(ev) => setCity(ev.target.value)}
        />

        <TextField
          id="standard-state-input"
          autoComplete="state"
          variant="standard"
          placeholder="State"
          name="state"
          value={state}
          onChange={(ev) => setState(ev.target.value)}
        />

        <TextField
          id="standard-zip-input"
          autoComplete="zip"
          variant="standard"
          placeholder="Zip"
          name="zip"
          value={zip}
          onChange={(ev) => setZip(ev.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ textTransform: "none" }}
        >
          Update
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
          Upload Avatar
        </Button>
      </form>
      {data ? <h6>Avatar Preview</h6> : null}
      <img src={data} className={data ? "avatar-preview" : null} />
    </div>
  );
};

export default UserUpdate;
