import { useState } from "react";
import axios from "axios";
import api from "../../service/api";

import history from '../../service/history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(true);

  function handleLogin(res) {
    if (res.status === 200) {
      setAuthenticated(true);

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', JSON.stringify(res.data.role));
      localStorage.setItem('userFirstName', JSON.stringify(res.data.userFirtsName));

      history.push('/projects');
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.clear();
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

  function recoverUser(token) {
    axios.get(`https://ms-academicquest.herokuapp.com/verificar/token/${token}`)
    .then(res => {
      if(res.status === 200) {
        return true;
      }
    })
    .catch(err => {
      localStorage.clear();
      history.push('/login');
      return false;
    });
  }

  return { authenticated, recoverUser, handleLogin, handleLogout }
}