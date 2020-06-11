import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import Constant from "../../config/Constant";
import { connect } from "react-redux";
import ACTION_TYPE from "../../redux/actions/indexactions";
import { HeaderHome, HeaderSearch } from "../../components/header";
import { DrawHorizontalLine } from "../../components/line";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //Constant.TEMP_TOKEN = this.props.token;
  }

  render() {
    return (
      <Container>
        <HeaderHome />
        <View style={AppStyle.dummyScreenTitle}>
          <Text>{`Home Screen`}</Text>
        </View>
        {this.homeHeader()}
        <DrawHorizontalLine />
      </Container>
    );
  }
  homeHeader = () => (
    <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
      <View style={{ flex: 0.8 }}>
        <Text>TITLE</Text>
        <Text>Items</Text>
      </View>
      <View style={{ flex: 0.12, borderRadius: 100, borderWidth: 0.5, overflow: "hidden" }}>
        <Image
          style={{
            width: "100%",
            aspectRatio: 1,
          }}
          resizeMode={"cover"}
          source={{ uri: Constant.URL_BLANK_PROFIL }}
        />
      </View>
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
