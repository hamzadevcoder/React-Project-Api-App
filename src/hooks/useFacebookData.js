import { useState, useEffect, useCallback } from 'react';
import { useFacebookContext } from '../context/FacebookDataContext';

const API_VERSION = 'v25.0';

/**
 * Hook to fetch specific sections of Graph API data.
 * It primarily fetches directly from Graph API using the client-side access token
 * to bypass backend connectivity issues.
 * 
 * @param {string} section - One of: 'profile', 'friends', 'posts', 'photos', 'pages', 'likes'
 */
export const useFacebookData = (section, options = {}) => {
  const { connected, fbData } = useFacebookContext();
  const { refreshIntervalMs = 60000 } = options;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSectionConfig = useCallback((s) => {
    switch (s) {
      case 'profile':
        return { endpoint: '/me', params: 'fields=id,name,email,picture.width(200).height(200),birthday' };
      case 'friends':
        return { endpoint: '/me/friends', params: 'fields=name,picture.width(100).height(100)' };
      case 'posts':
        return { endpoint: '/me/posts', params: 'limit=10&fields=message,created_time,full_picture' };
      case 'photos':
        return { endpoint: '/me/photos', params: 'type=uploaded&limit=12&fields=images,created_time' };
      case 'pages':
        return { endpoint: '/me/accounts', params: 'fields=name,category,followers_count,picture.width(100).height(100)' };
      case 'likes':
        return { endpoint: '/me/likes', params: 'fields=name,category,picture.width(100).height(100)&limit=15' };
      default:
        return null;
    }
  }, []);

  const fetchData = useCallback(async () => {
    const accessToken = fbData?.accessToken;
    if (!connected || !accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const config = getSectionConfig(section);
      if (!config) throw new Error('Invalid section');

      const url = `https://graph.facebook.com/${API_VERSION}${config.endpoint}?${config.params}&access_token=${accessToken}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        throw json.error || new Error('Failed to fetch Facebook data');
      }

      setData(json);
    } catch (err) {
      console.error(`Error fetching ${section}:`, err);
      setError({
        message: err.message || 'An unknown error occurred.',
        code: err.code || 500,
        isAuthError: err.code === 190,
      });
    } finally {
      setLoading(false);
    }
  }, [section, connected, fbData?.accessToken, getSectionConfig]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!connected || refreshIntervalMs <= 0) return undefined;
    const intervalId = window.setInterval(fetchData, refreshIntervalMs);
    return () => window.clearInterval(intervalId);
  }, [connected, refreshIntervalMs, fetchData]);

  return { data, loading, error, refetch: fetchData };
};
