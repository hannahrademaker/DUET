import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
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
  const navigate = useNavigate();

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

  const _logout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="link">
              <img className="logo" src="./static/logo.png" />
            </Link>
          </Typography>
          {!auth.id ? (
            <>
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
              <Button color="inherit">
                <Link to="/register" className="link">
                  Register
                </Link>
              </Button>
              <NavProps open={open} onClose={handleClose} />
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link className="link" to="/chat/">
                  Chat
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="link" to="/user/">
                  Profile
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="link" to="/feed/">
                  Feed
                </Link>
              </Button>
              <Button color="inherit" onClick={() => _logout()}>
                Logout
              </Button>
              {!!auth.img && <img className="profile-image" src={auth.img} />}
            </>
          )}{" "}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
