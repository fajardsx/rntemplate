import React, { Component } from "react";
import { View, Text } from "react-native";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import NavigationServices from "../../NavigationServices";
import { ROUTE_NAME } from "../../config/Keys";
import { PhotoProfil } from "../../components/imagesManager";
import { convertHeight, convertWidth } from "../../config/global";
import { LabelText } from "../../components/labelManager";

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
      if (this.props.user == null) {
        console.log("profilscreen.js => to login ");
        NavigationServices.navigate(ROUTE_NAME.LOGIN_SCREEN);
      }
    }
  }
  render() {
    if (this.props.token == "") {
      return <Container></Container>;
    }
    return (
      <Container>
        <View
          style={{
            alignItems: "center",
            width: convertWidth(100),
            height: 150,
            justifyContent: "flex-end",
            paddingBottom: 10,
          }}>
          <PhotoProfil />
        </View>
        <View style={{ padding: 5 }}>
          {this.addLabelWithTitle("Name :", "nama user")}
          {this.addLabelWithTitle("Birth Date :", "11 Agustus 1990")}
          {this.addLabelWithTitle("Address:", "Jalan Cideng")}
        </View>
      </Container>
    );
  }
  //
  addLabelWithTitle = (title = "", text = "test") => (
    <View
      style={{
        paddingVertical: 10,
        borderTopWidth: 0.7,
      }}>
      <LabelText style={{ fontWeight: "bold" }} text={title} />
      <LabelText text={text} />
    </View>
  );
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
export default connect(mapStateToProps, mapDispatchTopProps)(ProfilScreen);
