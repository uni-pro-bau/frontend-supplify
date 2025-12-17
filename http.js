import axios from 'axios';

// هنا تضع الرابط الأساسي للـ API
export const api = axios.create({
  baseURL: 'https://192.168.56.1:7035', // رابط الـ API المعدل
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);
