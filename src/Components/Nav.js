import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Map from "./Map";
import LoggedOut from "./LoggedOut";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import { logout } from "../store";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
} from "@mui/material";

const NavProps = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Login />
    </Dialog>
  );
};

const Nav = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  const [open, setOpen] = useState(false);

  const handleLoginOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              DUET: The Ultimate Events Social
            </Link>
          </Typography>
          {!auth.id ? (
            <>
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
              <Button color="inherit">
                <Link
                  to="/register"
                  className="register-btn"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </Button>
              <NavProps open={open} onClose={handleClose} />
            </>
          ) : (
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}{" "}
          <Button color="inherit">
            <Link to="/map" style={{ textDecoration: "none", color: "white" }}>
              Map
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
