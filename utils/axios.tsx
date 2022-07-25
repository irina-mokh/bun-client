import axios from 'axios';
// import { routes } from 'routes';
// import { store } from '../store';
// import { expiredToken } from '../store/auth/reducer';

export const axiosClient = axios.create({
  baseURL: 'https://bun-app.herokuapp.com/api/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
