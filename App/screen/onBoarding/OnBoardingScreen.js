import React, { Component } from "react";
import { View, Text } from "react-native";
import ACTION_TYPE from "../../redux/actions/indexactions";
import { connect } from "react-redux";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import { Buttons } from "../../components/button";
import { ROUTE_NAME } from "../../config/Keys";
import Constant from "../../config/Constant";

class OnBoardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
      Constant.TEMP_TOKEN = this.props.token
  }
  onDone(){
      this.props.updateFirstOpen(false)
      this.props.navigation.navigate(ROUTE_NAME.Screen_Apps)
  }
  render() {
    return (
      <Container statusbarHidden>
        <View style={AppStyle.dummyScreenTitle}>
          <Text >{`OnBoarding Screen`}</Text>
        </View>
        <Buttons enableStick onPress={this.onDone.bind(this)} />
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
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
export default connect(mapStateToProps, mapDispatchTopProps)(OnBoardingScreen);
