import React, { Component } from "react";
import { View, Text, Alert, Linking, BackHandler } from "react-native";
import { RESTKEY, ROUTE_NAME } from "../config/Keys";
import callAPI from "../services/api";
import Constant from "../config/Constant";
import { Container } from "../containers/screen";
import { AppStyle } from "../styles/styles";
import { loadingScreen } from "../config/global";
import { connect } from "react-redux";
import ACTION_TYPE from "../redux/actions/indexactions";

class InitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
    };
  }
  componentDidMount() {
    this.init();
  }
  async init() {
    this.setState({ isloading: true });
    let envi = await callAPI(Constant.G, RESTKEY.API.req_setting, {});
    if (envi.api_message == "success") {
      console.log("initscreen.js => Envi ", envi.data);
      this.setState({ isloading: true });
      this.props.updateEnvi(envi.data);
      this.versioning();
    }
  }
  versioning() {
    //Check version
    const server_version = Constant.getEnvi(this.props.envi, "version");
    console.log("server_version ", parseFloat(server_version));
    console.log("APP_VERSION ", parseFloat(Constant.APP_VERSION));
    if (parseFloat(server_version) > parseFloat(Constant.APP_VERSION)) {
      console.log("Need Update");
      const forceupdate = Constant.getEnvi(this.props.envi, "force_update");
      if (forceupdate == "Yes") {
        let version =
          "Current Version Installed : " +
          server_version +
          "\n New Version found, Please update for continue. ";
        Alert.alert("Update Version", version, [
          {
            text: "Yes",
            onPress: () => {
              Linking.openURL(getLinkApp());
              BackHandler.exitApp();
            },
          },
          { text: "No", onPress: () => BackHandler.exitApp() },
        ]);
      } else {
        this.checkStatusServer();
      }
    } else {
      this.checkStatusServer();
    }
  }
  checkStatusServer() {
    //Check server
    const isMaintence = Constant.getEnvi(this.props.envi, "environtment");
    if (isMaintence == "Maintenance") {
      Alert.alert(Constant.NAME_APPS, "Application is Under Maintance.", [
        {
          text: "Ok",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
    } else {
      this.initApp();
    }
  }

  initApp() {
    if (this.props.isfirst) {
      this.props.navigation.navigate(ROUTE_NAME.Screen_OnBoarding);
    } else {
      this.props.navigation.navigate(ROUTE_NAME.Screen_Authorize);
    }
  }
  render() {
    return (
      <Container statusbarHidden>
        <View style={AppStyle.dummyScreenTitle}>
          <Text>{`Init Screen`}</Text>
        </View>
        {this.state.isloading && loadingScreen()}
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    isfirst: state.FirstOpen,
    envi: state.Envi,
    user: state.User,
  };
}
function mapDispatchTopProps(dispatch) {
  return {
    updateEnvi: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_ENVI,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchTopProps)(InitScreen);
