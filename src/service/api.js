import axios from "axios";

const api = axios.create({
  baseURL: 'http://3.237.51.217:80/',
});

api.interceptors.request.use(
  (config) => {
  const token = sessionStorage.getItem('token');

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
