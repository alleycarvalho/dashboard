import axios from 'axios';
import store from '~/store';

const { token } = store.getState().auth;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default api;
