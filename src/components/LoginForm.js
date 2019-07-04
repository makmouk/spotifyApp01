import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';
import { refreshTokens } from '../constant';
import { AsyncStorage } from 'react-native';


class LoginForm extends Component {

  loginUser = async () => {
    const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
      Actions.main();
    } else {
      Actions.main();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.loginUser.bind(this)}>
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

export default LoginForm;
