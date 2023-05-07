import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
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
  DialogTitle,
} from "@mui/material";

const ModalDialog = ({ title, children, onClose, open }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModalOpen = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const _logout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="link">
              <img className="logo" src="./static/logo.png" />
            </Link>
          </Typography>
          {!auth.id ? (
            <>
              <Button onClick={() => handleModalOpen(<Login />)}>Login</Button>
              <Button onClick={() => handleModalOpen(<Register />)}>
                Signup
              </Button>
              <ModalDialog
                title={modalContent === <Login /> ? "Login" : "Register"}
                open={modalOpen}
                onClose={handleModalClose}
              >
                {modalContent}
              </ModalDialog>
            </>
          ) : (
            <>
              <Button>
                <Link className="link" to="/chat/">
                  Chat
                </Link>
              </Button>
              <Button>
                <Link className="link" to="/user/">
                  Profile
                </Link>
              </Button>
              <Button>
                <Link className="link" to="/feed/">
                  Feed
                </Link>
              </Button>
              <Button onClick={() => _logout()}>Logout</Button>
              {!!auth.img && <img className="profile-image" src={auth.img} />}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
