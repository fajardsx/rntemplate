import React, { Component } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import { HeaderHome, HeaderSearch } from "../../components/header";
import { DrawHorizontalLine } from "../../components/line";
import { PhotoProfil } from "../../components/imagesManager";
import { convertWidth } from "../../config/global";
import { LabelText } from "../../components/labelManager";
import { CellHome } from "../../components/cell";
import ListCell from "./tabcomponent/ListCell";

const HomeBody = (props) => (
  <View>
    <LabelText>Home</LabelText>
    <ListCell data={props.data} />
  </View>
);
//
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    //Constant.TEMP_TOKEN = this.props.token;
    let data = [];
    for (var i = 0; i < 20; i++) {
      data.push({ id: i, name: "User_" + i, isSelect: false });
    }
    this.setState({ data });
  }

  render() {
    console.log("Home Render");
    return (
      <Container>
        <HeaderHome title={"Home"} />
        {this.homeHeader()}
        <DrawHorizontalLine />
        {this.state.data && <HomeBody data={this.state.data} />}
      </Container>
    );
  }
  homeHeader = () => (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center",
      }}>
      <View style={{ width: convertWidth(70) }}>
        <LabelText>Name user</LabelText>
        <LabelText>Data user</LabelText>
      </View>

      <PhotoProfil
        styles={{
          width: convertWidth(15),
          height: convertWidth(15),
        }}
      />
    </View>
  );
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
export default connect(mapStateToProps, mapDispatchTopProps)(HomeScreen);
