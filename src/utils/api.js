import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const isLocalHost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const resolvedBaseUrl = configuredBaseUrl || (isLocalHost ? '/api' : '/api');

if (!configuredBaseUrl && !isLocalHost) {
  console.warn('[API Config] VITE_API_BASE_URL is not set in production; requests will use /api on the current domain.');
}

const api = axios.create({
  baseURL: resolvedBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const method = (config.method || 'GET').toUpperCase();
  const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
  console.log(`[API Request] method=${method} url=${fullUrl}`);
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
    const fullUrl = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
    console.error(
      `[API Error] method=${method} url=${fullUrl} status=${status}`,
      error.response?.data || error.message
    );

    const message = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    
    // Create a standardized error object for the frontend
    const mappedError = new Error(typeof message === 'string' ? message : message.message || 'Internal Server Error');
    mappedError.status = error.response?.status;
    mappedError.details = error.response?.data?.details;
    
    return Promise.reject(mappedError);
  }
);

export default api;
