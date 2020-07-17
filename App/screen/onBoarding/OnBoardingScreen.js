import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import ACTION_TYPE from "../../redux/actions/indexactions";
import { connect } from "react-redux";
import { Container } from "../../containers/screen";
import { AppStyle } from "../../styles/styles";
import { Buttons } from "../../components/button";
import { ROUTE_NAME } from "../../config/Keys";
import Constant from "../../config/Constant";
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 32,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
});
const slides = [
  {
    key: "one",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Title 2",
    text: "Other cool stuff",
    image: "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
    backgroundColor: "#22bcb5",
  },
];
class OnBoardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    Constant.TEMP_TOKEN = this.props.token;
  }
  onDone = () => {
    this.props.updateFirstOpen(false);
    this.props.navigation.navigate(ROUTE_NAME.Screen_FirstLogin);
  };
  renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={AppStyle.dummyScreenTitle}>
          <Text>{`OnBoarding Screen`}</Text>
        </View>
        <Buttons label={"Next"} onPress={this.onDone.bind(this)} /> */}
        <AppIntroSlider renderItem={this.renderItem} slides={slides} onDone={this.onDone} />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {};
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
