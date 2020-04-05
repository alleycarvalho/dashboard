import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GOREST_API_ACCESS_TOKEN}`,
  },
});

export default api;
