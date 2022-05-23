import React, { createContext } from "react";

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticated, recoverUser, handleLogin, handleLogout } = useAuth();

  return (
    <Context.Provider value={{ authenticated, recoverUser, handleLogin, handleLogout }}>
      { children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };