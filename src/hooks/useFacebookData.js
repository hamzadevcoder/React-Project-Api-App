import { useState, useEffect, useCallback } from 'react';
import { useFacebookContext } from '../context/FacebookDataContext';

/**
 * Hook to fetch specific sections of Graph API data from our proxy backend.
 * @param {string} section - One of: 'profile', 'friends', 'posts', 'photos', 'pages', 'likes'
 */
export const useFacebookData = (section, options = {}) => {
  const { connected } = useFacebookContext();
  const { refreshIntervalMs = 30000 } = options;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    // Only attempt fetch if connected
    if (!connected) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/facebook/${section}`, { credentials: 'include' });
      const json = await res.json();

      if (!res.ok) {
        // Return structured error handling mapped from backend
        throw json.error || new Error('Failed to fetch Facebook data');
      }

      setData(json.data || json); // Handle {data: []} or raw objects
    } catch (err) {
      console.error(`Error fetching ${section}:`, err);
      // Map it to a unified error shape for the UI handling
      setError({
        message: err.message || 'An unknown error occurred.',
        code: err.code || 500,
        isAuthError: err.isAuthError || false,
      });
    } finally {
      setLoading(false);
    }
  }, [section, connected]);

  // Initial fetch when connection becomes true or component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Keep data fresh while connected to provide real-time-like updates.
  useEffect(() => {
    if (!connected || refreshIntervalMs <= 0) return undefined;

    const intervalId = window.setInterval(() => {
      fetchData();
    }, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [connected, refreshIntervalMs, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
