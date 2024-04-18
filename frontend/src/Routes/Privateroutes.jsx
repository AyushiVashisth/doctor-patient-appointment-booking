import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

export const Privateroutes = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    toast.error("Please login first"); 
    return <Navigate to="/login" />;
  }
  return children;
};
