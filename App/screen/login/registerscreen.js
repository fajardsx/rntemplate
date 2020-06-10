import React, { Component } from "react";
import { View, Text, Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import Forminput from "../../components/Forminput";
import { addSpace, convertWidth } from "../../config/global";
import { Buttons } from "../../components/button";
import colors from "../../styles/colors";
import { ROUTE_NAME } from "./../../config/Keys";

class RegisterScreen extends Component {
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
            <Text>{`Register`}</Text>
          </View>
          <Forminput
            placeholder={"Full Name"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
          />
          <Forminput
            placeholder={"Email"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
          />
          <Forminput
            placeholder={"Password"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
          />
          <Forminput
            placeholder={"Confirm Password"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
          />
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
            label={"Sign Up"}
            style={{
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
  return {};
}

function mapDispatchTopProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchTopProps)(RegisterScreen);
