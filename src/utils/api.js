import { format } from 'date-fns';
import { Alert } from 'react-native';
import ApiClient from './ApiClient';

const client = new ApiClient();
export default client;

export const csrf = async () => {
  const token = await client.get('csrf-token');

  ApiClient.csrfToken = token;

  return token;
};

export const login = async ({ username, password }) => {
  try {
    const { token } = await client.post('/api/Login', { username, password });

    ApiClient.authToken = token;

    return token;
  } catch (err) {
    if (err.status === 422) {
      Alert.alert('', `Forkert kodeord eller email`, [{ text: 'ok' }]);
    } else {
      throw err;
    }
  }
};

export const register = async ({ email, username, password }) => {
  const { token } = await client.post('/api/Register', { email, username, password });

  ApiClient.authToken = token;

  return token;
};

export const user = async () => {
  const data = await client.get('/api/User');

  return data;
};

export const authenticate = async (token) => {
  ApiClient.authToken = token;

  const data = await user();

  return data;
};

export const getBroadcasts = async ({ id, date }) => {
  const formattedDate = format(date, 'MM/dd/yyyy');

  const broadcasts = await this.$api.$get(`/Municipalities/${id}/Channels?date=${formattedDate}`);

  return broadcasts;
};

export const getPlannedBroadcasts = async ({ id }) => {
  const { dates, data } = await client.get(`/api/Channels/${id}/Broadcasts/Planned`);

  return {
    dates,
    broadcasts: data,
  };
};

export const getHistoricalBroadcasts = async ({ id, page, perPage }) => {
  const { meta, data } = await client.get(
    `/api/Channels/${id}/Broadcasts/History?page=${page || 1}&per_page=${perPage || 15}`
  );

  return {
    page: meta.current_page,
    total: meta.total,
    broadcasts: data,
  };
};
