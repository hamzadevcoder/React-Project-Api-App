import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
    const message = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    
    // Create a standardized error object for the frontend
    const mappedError = new Error(typeof message === 'string' ? message : message.message || 'Internal Server Error');
    mappedError.status = error.response?.status;
    mappedError.details = error.response?.data?.details;
    
    return Promise.reject(mappedError);
  }
);

export default api;
