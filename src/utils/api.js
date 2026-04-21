import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
const baseURL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 
  Global error interceptor to handle unauthorized access (401)
  or other common Graph/Server errors.
*/
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const networkError = new Error('Network error: cannot reach API server. Verify VITE_API_BASE_URL and backend deployment.');
      networkError.status = 0;
      networkError.details = error.message;
      return Promise.reject(networkError);
    }

    const message = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    
    // Create a standardized error object for the frontend
    const mappedError = new Error(typeof message === 'string' ? message : message.message || 'Internal Server Error');
    mappedError.status = error.response?.status;
    mappedError.details = error.response?.data?.details;
    
    return Promise.reject(mappedError);
  }
);

export default api;
