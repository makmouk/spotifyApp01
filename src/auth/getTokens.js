import { encode as btoa } from 'base-64';
import { AuthSession } from 'expo';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  try {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=133a7006f1624817ab0317d40cb1f74e' +
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
        const authorizationCode = await getAuthorizationCode();
        const credsB64 = btoa(`133a7006f1624817ab0317d40cb1f74e:6c1cf172f9a34fd3bc60ee4967a2b838`);
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=https://exp.host/@mahmoudmakmouk/spotifyApp01`,
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