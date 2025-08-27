import { useContext, } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div><p>Loading...</p></div>;
  }

  return isAuthenticated ? children : <Navigate to="/register" />;
};

export default PrivateRoute;