import { LOGIN_USERNAME, LOGIN_PASSWORD, RTMP_SERVER, API_SERVER } from '@env';

export default {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  RTMP_SERVER: RTMP_SERVER || 'rtmp.seetv.dk',
  API_SERVER: API_SERVER || 'https://api.seetv.dk',
};
