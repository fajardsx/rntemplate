import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  BackHandler,
  Keyboard,
} from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import Forminput from "../../components/Forminput";
import {
  addSpace,
  convertWidth,
  handleBackButtonClick,
  checkPermission,
  showToast,
  validateEmail,
  loadingScreen,
} from "./../../config/global";
import { Buttons } from "./../../components/button";
import colors from "./../../styles/colors";
import { ROUTE_NAME, RESTKEY } from "./../../config/Keys";
import { LabelText } from "../../components/labelManager";
import callAPI from "../../services/api";
import NavigationServices from "../../NavigationServices";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: {
        location: null,
        storage: null,
      },
      permissionNotification: false,
      txtEmail: "",
      txtPassword: "",
      isLoading: false,
    };
  }
  async componentDidMount() {
    //Constant.TEMP_TOKEN = this.props.token;
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    this.onCheckPermission();
  }
  componentWillUnmount() {
    //Constant.TEMP_TOKEN = this.props.token;
    //BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  }
  async onCheckPermission() {
    //CHECK PERMISSION
    const permission = await checkPermission();
    console.log("LoginScreen permission ", permission);
    this.setState({
      permission,
    });
  }
  onReqPermissionStorage() {
    request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((response) => {
      console.log(response);
      this.onCheckPermission();
    });
  }
  onReqPermissionLocation() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((response) => {
      console.log(response);
      this.onRequestGPS();
      this.onCheckPermission();
    });
  }
  onRequestGPS() {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log("cordinate : ", newCoordinate);
        this.props.updateLocation(newCoordinate);
      },
      (error) => showToast(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100,
      }
    );
  }
  // onSignUp() {
  //   this.props.navigation.navigate(ROUTE_NAME.SIGNUP_SCREEN);
  // }
  onForgotPass() {
    this.props.navigation.navigate(ROUTE_NAME.FORGOT_SCREEN);
  }
  async onLogin() {
    const { txtEmail, txtPassword, isLoading } = this.state;

    Keyboard.dismiss();
    if (txtEmail.length < 2) {
      return showToast("Please Input Your Email", colors.TOAST_WARNING);
    } else if (validateEmail(txtEmail) == false) {
      return showToast("Your Email Invalid", colors.TOAST_WARNING);
    } else if (txtPassword.length < 2) {
      return showToast("Please Input Your Password", colors.TOAST_WARNING);
    }

    let body = new FormData();
    body.append("email", txtEmail);
    body.append("password", txtPassword);

    this.setState({ isLoading: true });
    let login = await callAPI(Constant.P, RESTKEY.API.login_rsa, body);
    console.log("loginscreen => result  ", login);
    if (login.api_message == "success") {
      let dataUser = {
        attend: login.attend,
        country: login.country,
        email: login.email,
        id: login.id,
        name: login.name,
        pdf_files: login.pdf_files,
        photo: login.photo,
        position: login.position,
        status: login.status,
        currentRole: 1,
      };
      console.log("User ", dataUser);
      this.props.updateUser(dataUser); // SAVE USER DATA
      showToast(login.api_message, colors.TOAST_SUCCESS);
      this.setState({ isLoading: false });
      if (NavigationServices.getNavigatorRef()) {
        NavigationServices.navigateAndReset(ROUTE_NAME.TAB_SCREEN);
      } else {
        this.props.navigation.navigate(ROUTE_NAME.Screen_Authorize);
      }
    } else {
      showToast(login.api_message, colors.TOAST_WARNING);
    }
  }
  //
  render() {
    const { permission, isLoading } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={AppStyle.dummyScreenTitle}>
            <LabelText>Login</LabelText>
          </View>
          <Forminput
            placeholder={"Email"}
            keyboardtype={"email-address"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
            onChangeText={(e) => {
              this.setState({ txtEmail: e });
            }}
          />
          {addSpace(5)}
          <Forminput
            placeholder={"Password"}
            stylecontainer={[
              AppStyle.loginContainerdefault,
              { width: convertWidth(80), alignSelf: "center" },
            ]}
            secureTextEntry
            onChangeText={(e) => {
              this.setState({ txtPassword: e });
            }}
          />
          {addSpace(5)}
          <Buttons
            label={"Sign in"}
            style={{ width: convertWidth(80), alignSelf: "center", borderRadius: 10 }}
            onPress={this.onLogin.bind(this)}
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
            onPress={this.onForgotPass.bind(this)}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            {}
            <Buttons
              label={"Location"}
              disabled={permission.location == "granted" ? true : false}
              style={{
                backgroundColor:
                  permission.location == "granted"
                    ? colors.COLOR_BUTTON_PERMISSION_DISABLE
                    : colors.COLOR_BUTTON_PERMISSION_ACTIVE,
                width: convertWidth(30),
                alignSelf: "center",
                borderRadius: 10,
              }}
              onPress={this.onReqPermissionLocation.bind(this)}
            />
            {/* <Buttons
              label={"Notification"}
              disabled={permissionNotification}
              style={{
                // backgroundColor: "transparent",
                width: convertWidth(30),
                alignSelf: "center",
                borderRadius: 10,
              }}
              onPress={this.onReqPermissionStorage.bind(this)}
            /> */}
          </View>
          {/* <Buttons
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
          /> */}

          <View style={{ flex: 1 }} />
        </SafeAreaView>
        {isLoading && loadingScreen()}
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
  return {
    updateUser: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_USER,
        value: data,
      }),
    updateLocation: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_USERLOCATION,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchTopProps)(LoginScreen);
