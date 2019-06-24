import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
//import getAuthorizationCode from '../auth/getAuthorizationCode';
//import getTokens from '../auth/getTokens';
import { encode as btoa } from 'base-64';
import { AuthSession } from 'expo';
import axios from 'axios'

export const spotifyCredentials = {
  clientId: '133a7006f1624817ab0317d40cb1f74e',
  clientSecret: '6c1cf172f9a34fd3bc60ee4967a2b838',
  redirectUri: 'https://exp.host/@mahmoudmakmouk/spotifyApp01'
}

const router = require('express').Router()

router.get('/api/spotify-credentials', (req, res, next) => {
  const clientId = process.env.clientId;
  const clientSecret = process.env.clientSecret;
  const redirectUri = process.env.redirectUri;
  const spotifyCredentials = { clientId, clientSecret, redirectUri };
  res.json(spotifyCredentials);
});

const getSpotifyCredentials = async () => {
  const res = await axios.get('/api/spotify-credentials')
  const spotifyCredentials = res.data
  return spotifyCredentials
}

const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
  'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
  'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  try {
    const credentials = await getSpotifyCredentials() //we wrote this function above
    const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
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
  } catch (err) {
    console.error(err)
  }
  return result.params.code
}

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    const credentials = await getSpotifyCredentials() //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
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
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData('accessToken', accessToken);
    await setUserData('refreshToken', refreshToken);
    await setUserData('expirationTime', expirationTime);
  } catch (err) {
    console.error(err);
  }
}

export const refreshTokens = async () => {
  try {
    const credentials = await getSpotifyCredentials() //we wrote this function above
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const refreshToken = await getUserData('refreshToken');
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
      await setUserData('accessToken', newAccessToken);
      if (newRefreshToken) {
        await setUserData('refreshToken', newRefreshToken);
      }
      await setUserData('expirationTime', expirationTime);
    }
  } catch (err) {
    console.error(err)
  }
}


class LoginForm extends Component {
  state = { accessTokenAvailable: false };
  async componentDidMount() {
    const tokenExpirationTime = await getUserData('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }
  }

  onButtonPress() {
    this.setState({ accessTokenAvailable: false });
    //this.props.loginUser();
    //console.log(getAuthorizationCode());
    //getTokens();
  }


  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.onButtonPress.bind(this)}>
          Login
      </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(null, { loginUser })(LoginForm);
