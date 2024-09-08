import axios from 'axios';

const api = axios.create({
  baseURL: 'https://admin-escola-backend.onrender.com',
  //timeout: 10000,
  headers: {
    'Content-Type': 'application/json',

  },

});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
