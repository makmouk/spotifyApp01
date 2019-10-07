import { AuthSession } from 'expo';


export const getSpotifyCredentials = () => {
    const clientId = '133a7006f1624817ab0317d40cb1f74e';
    const clientSecret = '6c1cf172f9a34fd3bc60ee4967a2b838';
    const redirectUri = AuthSession.getRedirectUrl();
    const spotifyCredentials = { clientId, clientSecret, redirectUri };
    return spotifyCredentials
  }