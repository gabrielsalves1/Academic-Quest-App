import { useState, useEffect } from "react";

import history from '../../service/history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleLogin(res) {
    console.log(res);
    if (res.status === 200) {
      setAuthenticated(true);

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', JSON.stringify(res.data.role));
      localStorage.setItem('userFirstName', JSON.stringify(res.data.userFirtsName));
    
      setLoading(false);
      history.push('/');
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.clear();

    history.push('/login');
  }

  return { authenticated, loading, handleLogin, handleLogout }
}