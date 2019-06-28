import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import {  Button } from './common';


class LoginForm extends Component {

  renderPress(){
    this.props.loginUser()
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.renderPress.bind(this)}>
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

export default connect(null, { loginUser })(LoginForm);
