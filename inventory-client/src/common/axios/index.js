import axios from 'axios';

const invAxios = axios.create();

invAxios.defaults.baseURL = 'http://localhost:8000/api';

export default invAxios;
