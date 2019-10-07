import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { loginUser } from "../actions";
import { Button } from "../components";
import I18n from "../i18n/I18n";

class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.loginUser}>{I18n.t("login")}</Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white"
  }
};

export default connect(
  null,
  { loginUser }
)(LoginForm);
