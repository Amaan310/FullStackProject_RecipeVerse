import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ▼▼▼ ADD THIS INTERCEPTOR ▼▼▼
// This function will run before every single request is sent.
api.interceptors.request.use(
  (config) => {
    // 1. Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // 2. If the token exists, add it to the 'Authorization' header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 3. Send the request with the new header
    return config;
  },
  (error) => {
    // Handle any errors
    return Promise.reject(error);
  }
);
export default api;