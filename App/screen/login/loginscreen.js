import React, { Component } from "react";
import { View, Text, Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import Forminput from "../../components/Forminput";
import { addSpace, convertWidth } from "./../../config/global";
import { Buttons } from "./../../components/button";
import colors from "./../../styles/colors";
import { ROUTE_NAME } from "./../../config/Keys";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //Constant.TEMP_TOKEN = this.props.token;
  }
  onSignUp() {
    this.props.navigation.navigate(ROUTE_NAME.SIGNUP_SCREEN);
  }
  //
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={AppStyle.dummyScreenTitle}>
            <Text>{`Login`}</Text>
          </View>
          <Forminput
            placeholder={"Email"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
          />
          {addSpace(5)}
          <Forminput
            placeholder={"Password"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
            secureTextEntry
          />
          {addSpace(5)}
          <Buttons
            label={"Sign in"}
            style={{ width: convertWidth(80), alignSelf: "center", borderRadius: 10 }}
          />
          <Buttons
            label={"Forgot Password?"}
            stylelabel={{
              color: colors.COLOR_TEXT_3,
            }}
            style={{
              backgroundColor: "transparent",
              width: convertWidth(80),
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
          <Buttons
            label={"Sign Up"}
            stylelabel={{
              color: colors.COLOR_TEXT_1,
            }}
            style={{
              backgroundColor: "transparent",
              width: convertWidth(80),
              alignSelf: "center",
              borderRadius: 10,
            }}
            onPress={this.onSignUp.bind(this)}
          />

          <View style={{ flex: 1 }} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.Token,
  };
}

function mapDispatchTopProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchTopProps)(LoginScreen);
