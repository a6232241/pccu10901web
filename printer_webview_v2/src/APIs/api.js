import axios from 'axios';

const api = {};

const API_TIMEOUT_DUR = 30000;
const instance = axios.create({
  timeout: API_TIMEOUT_DUR,
  header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
});

api.fire = async (options, API_HOST = 'http://10.0.0.12:5000') => {
  return instance
    .request({
      ...options,
      headers: {
        ...options.headers,
      },
      url: `${API_HOST}${options.url}`,
    })
    .catch((error) => {
      throw error;
    });
};

export default api;
