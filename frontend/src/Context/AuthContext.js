import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [Authdata, setAuthData] = useState();

  const login = () => {
    setisAuth(true);
  };

  const logout = () => {
    setisAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, Authdata, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
