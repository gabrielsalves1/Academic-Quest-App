import React, { createContext } from "react";

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticated, recoverUser, loading, handleLogin, handleLogout } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, recoverUser, handleLogin, handleLogout }}>
      { children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };