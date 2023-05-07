import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOnlineUsers } from "../store";
import io from "socket.io-client";

const useSocket = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      const socket = io();
      socket.emit("auth", window.localStorage.getItem("token"));
      dispatch(fetchOnlineUsers());
      socket.on("userEntered", (user) => {
        dispatch({ type: "USER_ENTERED", user });
      });
      socket.on("userLeft", (user) => {
        dispatch({ type: "USER_LEFT", user });
      });

      return () => {
        socket.close();
      };
    }
  }, [auth]);
};

export default useSocket;
