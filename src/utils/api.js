import { Alert } from 'react-native';
import config from 'app/config';

export const login = async ({ username, password }) => {
  const loginResponse = await fetch(`${config.API_SERVER}/api/Login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // email: email,
      username,
      password,
    }),
  });
  // console.log(loginResponse);
  if (loginResponse.status === 422) {
    Alert.alert('', `Forkert kodeord eller email`, [{ text: 'ok' }]);
    return null;
  }

  const json = await loginResponse.json();

  //console.log(loginResponse);
  if (loginResponse.ok) {
    return json.token;
  }
  // console.log(loginResponse);
  Alert.alert('', `Fejl: ${loginResponse.Error}`, [{ text: 'ok' }]);
  //console.log('ggwsaeg');
  //throw new Error(json);
};

export const register = async ({ email, username, password }) => {
  const registerResponse = await fetch(`${config.API_SERVER}/api/Register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  const json = await registerResponse.json();

  if (registerResponse.ok) {
    return json.token;
  }

  throw new Error(json);
};

export const fetchUser = async (token) => {
  const userResponse = await fetch(`${config.API_SERVER}/api/User`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (userResponse.status === 500) {
    throw new Error(userResponse.statusText);
  }

  return userResponse.ok ? await userResponse.json() : null;
};

export const fetchGuideBroadcasts = async (MunicipalityID) => {
  const Response = await fetch(
    `${config.API_SERVER}/api/Municipalities/${MunicipalityID}/Channels`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include', // include, *same-origin, omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  // console.log(`${config.API_SERVER}/api/Municipalities/${MunicipalityID}/Channels`);

  if (Response.ok) {
    const data = await Response.json();
    return data;
  }

  throw new Error(Response.statusText);
};
