import axios from 'axios';

import { AuthServices } from '../../services';

const invAxios = axios.create();

invAxios.defaults.baseURL = 'http://localhost:8000/api';

invAxios.interceptors.request.use(
  (config) => {
    const token = AuthServices.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

invAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default invAxios;
