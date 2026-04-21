import { useState, useEffect, useCallback } from 'react';
import { useFacebookContext } from '../context/FacebookDataContext';

const API_VERSION = 'v25.0';

const safeParseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const bodyText = await response.text();

  if (!bodyText) {
    return {};
  }

  if (contentType.includes('application/json')) {
    return JSON.parse(bodyText);
  }

  try {
    return JSON.parse(bodyText);
  } catch {
    const preview = bodyText.trim().slice(0, 120);
    const nonJsonError = new Error(
      `Facebook returned a non-JSON response. Preview: ${preview || 'empty response'}`
    );
    nonJsonError.code = response.status || 500;
    throw nonJsonError;
  }
};

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
        return { endpoint: '/me', params: 'fields=id,name,email,birthday,picture.width(200).height(200)' };
      case 'friends':
        return { endpoint: '/me/friends', params: 'fields=name,picture.width(100).height(100)' };
      case 'posts':
        return { endpoint: '/me/posts', params: 'limit=10&fields=message,created_time,full_picture' };
      case 'photos':
        return { endpoint: '/me/photos', params: 'type=uploaded&limit=12&fields=images,created_time' };
      case 'pages':
        return { endpoint: '/me/accounts', params: 'fields=name,category,followers_count,fan_count,picture.width(100).height(100)' };
      case 'likes':
        return { endpoint: '/me/likes', params: 'fields=name,category,picture.width(100).height(100)&limit=15' };
      case 'adaccounts':
        return { endpoint: '/me/adaccounts', params: 'fields=name,account_id,account_status,amount_spent,balance,currency,insights.limit(1){spend,impressions,clicks,ctr,reach}' };
      case 'leads':
        return { endpoint: '/me/accounts', params: 'fields=name,leadgen_forms{name,status,lead_count,created_time}' };
      case 'conversations':
        return { endpoint: '/me/accounts', params: 'fields=name,conversations.limit(10){senders,unread_count,updated_time,snippets,messages.limit(1){message,created_time,from}}' };
      case 'business_insights':
        return { endpoint: '/me/accounts', params: 'fields=name,insights.metric(page_impressions,page_engaged_users,page_posts_impressions,page_fan_adds){values}' };
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
      const json = await safeParseResponse(res);

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
