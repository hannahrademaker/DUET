import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { auth } = useSelector((state) => state);

  return auth.id ? <Outlet /> : null;
};

export default PrivateRoute;
