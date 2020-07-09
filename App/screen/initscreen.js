import React, { Component } from "react";
import { View, Text } from "react-native";
import { RESTKEY, ROUTE_NAME } from "../config/Keys";
import callAPI from "../services/api";
import Constant from "../config/Constant";
import { Container } from "../containers/screen";
import { AppStyle } from "../styles/styles";
import { loadingScreen } from "../config/global";
import { connect } from "react-redux";

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
    let envi = await callAPI(Constant.P, RESTKEY.ENVI, {});
    if (envi) {
      console.log("Envi ", envi);
      this.setState({ isloading: true });
      if (this.props.isfirst) {
        this.props.navigation.navigate(ROUTE_NAME.Screen_OnBoarding);
      } else {
        this.props.navigation.navigate(ROUTE_NAME.Screen_Apps);
      }
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
  };
}
function mapDispatchTopProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchTopProps)(InitScreen);
