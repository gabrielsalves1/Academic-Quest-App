import { useState } from "react";
import axios from "axios";
import api from "../../service/api";

import history from '../../service/history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(true);

  function handleLogin(res) {
    if (res.status === 200) {
      setAuthenticated(true);

      sessionStorage.setItem('token', res.data.access_token);
      sessionStorage.setItem('role', JSON.stringify(res.data.role).replace(/"/g, ''));
      sessionStorage.setItem('userFirstName', JSON.stringify(res.data.userFirtsName).replace(/"/g, ''));

      history.push('/');
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    sessionStorage.clear();
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
      sessionStorage.clear();
      history.push('/login');
      return false;
    });
  }

  return { authenticated, recoverUser, handleLogin, handleLogout }
}