import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
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
import Register from "./Register";

const AppProps = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <Login />
    </Dialog>
  );
};

const App = () => {
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
            DUET: The Ultimate Events Social
          </Typography>
          {!auth.id ? (
            <>
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
              <Button color="inherit">
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </Button>
              <AppProps open={open} onClose={handleClose} />
            </>
          ) : (
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
};

export default App;
