import axios, { Axios, AxiosError } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5692',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.defaults.withCredentials = true;

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default http;
