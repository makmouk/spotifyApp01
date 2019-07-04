import { AuthSession } from 'expo';
import { getSpotifyCredentials } from './getSpotifyCredentials';

const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');

export const getAuthorizationCode = async () => {
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