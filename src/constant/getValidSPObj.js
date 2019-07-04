import SpotifyWebAPI from 'spotify-web-api-js';
import { AsyncStorage } from 'react-native';
import { refreshTokens } from './refreshTokens';

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