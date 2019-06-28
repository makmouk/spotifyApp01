import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { encode as btoa } from 'base-64';
import { AuthSession } from 'expo';
import SpotifyWebAPI from 'spotify-web-api-js';
import {
  SEARCH_CHANGED,
  FETCHED_DATA,
  FETCHED_ALBUMS
} from './types';

const getSpotifyCredentials = () => {
  const clientId = '133a7006f1624817ab0317d40cb1f74e';
  const clientSecret = '6c1cf172f9a34fd3bc60ee4967a2b838';
  const redirectUri = AuthSession.getRedirectUrl();
  const spotifyCredentials = { clientId, clientSecret, redirectUri };
  return spotifyCredentials
}

const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
  'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
  'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  try {
    const credentials = await getSpotifyCredentials()
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    })
    return result.params.code
  } catch (err) {
    console.error(err)
  }
}

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode();
    const credentials = await getSpotifyCredentials();
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
        }`,
    });
    const responseJson = await response.json();
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;

    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('expirationTime', expirationTime);
  } catch (err) {
    console.error(err);
  }
}

export const refreshTokens = async () => {
  try {
    const credentials = await getSpotifyCredentials();
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await AsyncStorage.removeItem('accessToken').then(() => {
        AsyncStorage.setItem('accessToken', newAccessToken);
      });

      if (newRefreshToken) {
        await AsyncStorage.removeItem('refreshToken').then(() => {
          AsyncStorage.setItem('refreshToken', newRefreshToken);
        });
      }
      await AsyncStorage.removeItem('expirationTime').then(() => {
        AsyncStorage.setItem('expirationTime', expirationTime + '');
      });
    }
  } catch (err) {
    console.error(err)
  }
}

export const loginUser = () => {
  return () => {
    loginUserSuccess();
  };
};

const loginUserSuccess = async () => {
  const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
  if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
    await refreshTokens();
    Actions.main();
  } else {
    Actions.main();
  }
};

export const getValidSPObj = async () => {
  const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
  if (new Date().getTime() > tokenExpirationTime) {
    await refreshTokens();
  }
  const accessToken = await AsyncStorage.getItem('accessToken');

  var sp = new SpotifyWebAPI();
  await sp.setAccessToken(accessToken);
  return sp;
}

export const searchText = (text) => {

  return (dispatch) => {
    dispatch({ type: SEARCH_CHANGED, payload: text })
    searchArtist(text, dispatch);
  };
};


const searchArtist = async (text, dispatch) => {
  const sp = await getValidSPObj();
  const txt = text.value.replace(" ", "%20");
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  const FETCH_URL = BASE_URL + 'q=' + txt + '&type=artist&limit=10';
  var accessToken = sp.getAccessToken();
  var myOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    mode: 'cors',
    cache: 'default'
  };
  fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => dispatch({ type: FETCHED_DATA, payload: json }))
};

export const getAlbums = (id, name) => {

  return (dispatch) => {
    searchAlbum(id, dispatch, name);
  }
};

const searchAlbum = async (id, dispatch, name) => {
  const sp = await getValidSPObj();
  const BASE_URL = 'https://api.spotify.com/v1/artists/' + id + '/albums?';
  const FETCH_URL = BASE_URL + 'include_groups=single%2Cappears_on&limit=10';
  var accessToken = sp.getAccessToken();
  var myOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    mode: 'cors',
    cache: 'default'
  };
  fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => dispatch({ type: FETCHED_ALBUMS, payload: { json, name } }))
    .then(Actions.Albums());
};