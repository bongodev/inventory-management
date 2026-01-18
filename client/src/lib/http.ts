import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5692',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.defaults.withCredentials = true;

export default http;
