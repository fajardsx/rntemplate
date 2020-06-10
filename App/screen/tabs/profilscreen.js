import React, { Component } from "react";
import { View, Text } from "react-native";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import NavigationServices from "../../NavigationServices";
import { ROUTE_NAME } from "../../config/Keys";

class ProfilScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //Constant.TEMP_TOKEN = this.props.token;
    this.list = [
      (this.didFocusDSubscription = this.props.navigation.addListener("didFocus", (payload) => {
        console.log("profilscreen.js => didFocus ");
        this.checkLogin(true);
      })),
    ];

    this.checkLogin();
  }
  componentWillUnmount() {
    this.list.forEach((item) => {
      item.remove();
    });
  }

  checkLogin(force = false) {
    if (force) {
      if (this.props.token == null || (this.props.token != null && this.props.token.length == 0)) {
        NavigationServices.navigate(ROUTE_NAME.LOGIN_SCREEN);
      }
    }
  }
  render() {
    return (
      <Container>
        <View style={AppStyle.dummyScreenTitle}>
          <Text>{`Profil Screen`}</Text>
        </View>
      </Container>
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
    updateFirstOpen: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_FIRST,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchTopProps)(ProfilScreen);
