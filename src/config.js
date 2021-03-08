import { LOGIN_USERNAME, LOGIN_PASSWORD, SOCKET_IO_SERVER, RTMP_SERVER, API_SERVER } from '@env';

export default {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  SOCKET_IO_SERVER: SOCKET_IO_SERVER || 'socket.seetv.dk',
  RTMP_SERVER: RTMP_SERVER || 'rtmp.seetv.dk',
  API_SERVER: API_SERVER || 'https://api.seetv.dk',
};
