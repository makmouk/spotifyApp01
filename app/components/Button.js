import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import SpotifyLogo from '../assets/images/logo.png';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle, logoImg } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={SpotifyLogo} style={logoImg} />
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgrounColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft: 10,
    marginRight: 10
  },
  logoImg: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 90
  }
};

export { Button };
