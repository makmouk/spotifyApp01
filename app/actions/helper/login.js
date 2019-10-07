import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { refreshTokens } from '../../services';

export const login = async () => {
  const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
  if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
    await refreshTokens();
    Actions.main();
  } else {
    Actions.main();
  }
};