import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center'
  },
  containerStyle: {
    backgroundColor: 'white'
  }
};

export { Input };
