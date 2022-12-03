import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateAuth } from "../store";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
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

  return (
    <div className="account-update">
      <div className="profile-head">
        <h3>Profile</h3>
        <Link to="/user/password">
          <button>Change Password</button>
        </Link>
      </div>
      <form onSubmit={update}>
        <label>First Name:</label>
        <input
          placeholder="Please enter a valid first name"
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
        />

        <label>Last Name:</label>
        <input
          placeholder="Please enter a valid last name"
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          placeholder="Please enter your email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <label>Address Line 1:</label>
        <input
          placeholder="Street and number, P.O box, c/o"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        <label>Address details:</label>
        <input
          placeholder="Apt, suite, unit, building, floor, etc."
          value={addressDetails}
          onChange={(ev) => setAddressDetails(ev.target.value)}
        />

        <label>City:</label>
        <input
          placeholder="Please enter your city"
          value={city}
          onChange={(ev) => setCity(ev.target.value)}
        />

        <label>State:</label>
        <input
          placeholder="Please enter your state"
          value={state}
          onChange={(ev) => setState(ev.target.value)}
        />

        <label>ZIP Code:</label>
        <input
          placeholder="Please enter your zipcode"
          value={zip}
          onChange={(ev) => setZip(ev.target.value)}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UserUpdate;
