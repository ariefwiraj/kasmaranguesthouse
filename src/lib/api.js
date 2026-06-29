import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

let memoryToken = null;

export const setAuthToken = (token) => {
  memoryToken = token;
};

// Request interceptor to add token
api.interceptors.request.use((config) => {
  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401 Unauthorized
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    memoryToken = null;
    if (window.location.pathname !== '/admin-login') {
       window.location.href = '/admin-login';
    }
  }
  return Promise.reject(error);
});

export default api;
