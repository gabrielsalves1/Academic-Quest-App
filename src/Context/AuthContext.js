import React, { createContext, useState } from "react";

import api from '../service/api';
import history from '../service/history';

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  function handleLogin(res) {
    console.log(res);
    if (res.status == 200) {
      setAuthenticated(true);

      localStorage.setItem('token', JSON.stringify(res.data.access_token));
      localStorage.setItem('role', JSON.stringify(res.data.role));
      localStorage.setItem('userFirstName', JSON.stringify(res.data.userFirtsName));
    
      api.defaults.headers.Authorization = `Bearer ${JSON.stringify(res.data.access_token)}`;
      history.push('/');
    }
  }

  function handleLogout() {
    setAuthenticated(false);

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userFirstName');

    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      { children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };