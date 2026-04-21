import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const api = axios.create({
  baseURL: configuredBaseUrl || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const method = (config.method || 'GET').toUpperCase();
  const base = config.baseURL || '';
  const url = config.url || '';
  console.log(`[API Request] ${method} ${base}${url}`);
  return config;
});

/* 
  Global error interceptor to handle unauthorized access (401)
  or other common Graph/Server errors.
*/
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 'NO_RESPONSE';
    const method = (error.config?.method || 'GET').toUpperCase();
    const base = error.config?.baseURL || '';
    const url = error.config?.url || '';
    console.error(`[API Error] ${method} ${base}${url} -> ${status}`, error.response?.data || error.message);

    const message = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    
    // Create a standardized error object for the frontend
    const mappedError = new Error(typeof message === 'string' ? message : message.message || 'Internal Server Error');
    mappedError.status = error.response?.status;
    mappedError.details = error.response?.data?.details;
    
    return Promise.reject(mappedError);
  }
);

export default api;
