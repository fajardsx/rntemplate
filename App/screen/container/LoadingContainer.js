import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import { loadingScreen } from "../../config/global";

class LoadingContainer extends Component {
  render() {
    if (this.props.isloading == true) {
      return loadingScreen();
    } else {
      return null;
    }
  }
}
function mapStateToProps(state) {
  return {
    user: state.User,
    isloading: state.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);
