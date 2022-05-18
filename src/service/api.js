import axios from "axios";

const api = axios.create({
  baseURL: 'https://ms-academicquest.herokuapp.com',
});

api.interceptors.request.use(response => {
  const token = localStorage.getItem('token');

  if(token) {
    response.headers.Authorization = `Bearer ${token}`;
  }

  return response;
});

export default api;
