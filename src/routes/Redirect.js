import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const Redirect = ({ to }) => {
  const location = useLocation();

  return <Navigate to={to} state={{ from: location }} replace />;
};

export default Redirect;
