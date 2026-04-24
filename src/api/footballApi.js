import axios from 'axios';

const footballApi = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-apisports-key': import.meta.env.VITE_API_KEY,
  },
});

// Axios interceptor for error logging and rate limiting
footballApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error('API Rate Limit Exceeded (429)');
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch matches for AFCON 2026 Quarter-finals
 * League ID: 6 (CAN)
 * Season: 2025 (for 2026 tournament cycle)
 */
export const getQuarterFinalMatches = async () => {
  try {
    const response = await footballApi.get('/fixtures', {
      params: {
        league: 6,
        season: 2025,
        round: 'Quarter-finals',
      },
    });
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching quarter-final matches:', error);
    return null;
  }
};

export const getMatchDetails = async (fixtureId) => {
  try {
    const response = await footballApi.get('/fixtures', {
      params: { id: fixtureId },
    });
    return response.data.response?.[0] || null;
  } catch (error) {
    console.error(`Error fetching match details (${fixtureId}):`, error);
    return null;
  }
};

export const getMatchStatistics = async (fixtureId) => {
  try {
    const response = await footballApi.get('/fixtures/statistics', {
      params: { fixture: fixtureId },
    });
    return response.data.response || [];
  } catch (error) {
    console.error(`Error fetching match statistics (${fixtureId}):`, error);
    return null;
  }
};

export const getMatchEvents = async (fixtureId) => {
  try {
    const response = await footballApi.get('/fixtures/events', {
      params: { fixture: fixtureId },
    });
    return response.data.response || [];
  } catch (error) {
    console.error(`Error fetching match events (${fixtureId}):`, error);
    return null;
  }
};

export const getMatchLineups = async (fixtureId) => {
  try {
    const response = await footballApi.get('/fixtures/lineups', {
      params: { fixture: fixtureId },
    });
    return response.data.response || [];
  } catch (error) {
    console.error(`Error fetching match lineups (${fixtureId}):`, error);
    return null;
  }
};

export default footballApi;
