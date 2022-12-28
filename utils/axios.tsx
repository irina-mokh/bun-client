import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://donut-back-production.up.railway.app/api/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
