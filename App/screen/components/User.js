import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UserData extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  static getUserLocation = () => {
    return this.props.userlocation;
  };
  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    token: state.Token,
    user: state.User,
    visitschedule: state.VisitSchedule,
    userlocation: state.UserLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFirstOpen: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_FIRST,
        value: data,
      }),
    updateVisitSchedule: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_VISIT_SCHEDULE,
        value: data,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
