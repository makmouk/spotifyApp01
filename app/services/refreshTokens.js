import { AsyncStorage } from 'react-native';
import { encode as btoa } from 'base-64';
import { getSpotifyCredentials } from './getSpotifyCredentials';
import { getTokens } from './getTokens'

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