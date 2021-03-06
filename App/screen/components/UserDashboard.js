import React from "react";
import Pages from "../container/pages";
import { View } from "react-native";
import { LabelText } from "../../components/labelManager";
import { PhotoProfil } from "../../components/imagesManager";
import { convertHeight, convertWidth } from "../../config/global";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import { Buttons } from "../../components/button";
import colors from "../../styles/colors";
import Constant from "../../config/Constant";

class UserDashboard extends Pages {
  constructor(props) {
    super(props);

    this.state = {
      isConnect: true,
    };
  }
  getTextButtonUser() {
    let ROLE = this.props.user ? this.props.user.currentRole : 1;
    switch (ROLE) {
      case Constant.ROLE_INLOGIN:
        return "Start Your Day";
      case Constant.ROLE_INSELECTSCHEDULE:
        return "Set";
      case Constant.ROLE_ADDDOCTORAGAIN:
        return "Set";
      case Constant.ROLE_READYSTARTSCHEDULE:
        return "Finish";
      case Constant.ROLE_FINISHTODAY:
        return "End This Today";
      case Constant.ROLE_YESTERDAY:
        return "Today is End";
      default:
        return "Start";
    }
  }
  getbgColorUser() {
    let ROLE = this.props.user ? this.props.user.currentRole : 1;
    switch (ROLE) {
      case Constant.ROLE_INLOGIN:
        return colors.USERBUTTON_ACTIVE_COLOR;
      case Constant.ROLE_INSELECTSCHEDULE:
        return colors.USERBUTTON_ACTIVE_COLOR;
      case Constant.ROLE_ADDDOCTORAGAIN:
        return colors.USERBUTTON_ACTIVE_COLOR;
      case Constant.ROLE_READYSTARTSCHEDULE:
        return colors.USERBUTTON_ACTIVE_COLOR;
      case Constant.ROLE_FINISHTODAY:
        return colors.USERBUTTON_UNACTIVE_COLOR;
      case Constant.ROLE_YESTERDAY:
        return colors.USERBUTTON_UNACTIVE_COLOR;
      default:
        return colors.USERBUTTON_ACTIVE_COLOR;
    }
  }
  onButtonPress() {
    let ROLE = this.props.user ? this.props.user.currentRole : 1;
    this.props.callShow();
  }
  //
  render() {
    const { isConnect } = this.state;
    return (
      <View
        style={{
          margin: 10,
          width: convertWidth(95),
          justifyContent: "center",
          borderRadius: 5,
          backgroundColor: colors.COLOR_PRIMARY_2,
        }}>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <PhotoProfil
                style={{
                  width: convertWidth(15),
                  height: convertWidth(15),
                }}
              />
              {
                // CONNECTION STATUS
              }
              <View
                style={{
                  bottom: 0,
                  position: "absolute",
                  width: 20,
                  aspectRatio: 1,
                  borderRadius: 25,
                  backgroundColor: isConnect ? colors.IS_CONNECT : colors.IS_DISCONNECT,
                }}
              />
            </View>

            <View style={{ paddingLeft: 10 }}>
              <LabelText>{`${this.props.user ? this.props.user.name : ""}`}</LabelText>
              <LabelText>{`${this.props.user ? this.props.user.position : ""}`}</LabelText>
            </View>
          </View>
          {
            // BUTTON ACTION USER
          }
          <Buttons
            stylelabel={{
              fontSize: 14,
            }}
            style={{
              width: "30%",
              borderRadius: 50,
              height: 40,
              backgroundColor: this.getbgColorUser(),
            }}
            label={this.getTextButtonUser()}
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.Token,
    user: state.User,
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
export default connect(mapStateToProps, mapDispatchTopProps)(UserDashboard);
