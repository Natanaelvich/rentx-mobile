import axios from 'axios';
import getIPhost from '../utils/getIPhost';

const host = getIPhost();

const api = axios.create({
  baseURL: `http://${host}:3333`,
});

export default api;
