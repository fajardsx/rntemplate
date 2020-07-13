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
import { convertWidth, formateDate, addSpace } from "../../config/global";
import { LabelText } from "../../components/labelManager";
import { CellHome } from "../../components/cell";
import ListCell from "./tabcomponent/ListCell";
import UserDashboard from "../components/UserDashboard";

const HomeBody = (props) => <ListCell data={props.data} />;
//
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    let data = [];
    this.onInitSchedule();
  }
  onInitSchedule() {
    const { visitschedule } = this.props;
    let data = JSON.parse(visitschedule).visit_schedule;
    console.log("Schedule ", data);
    this.setState({
      data,
    });
  }
  render() {
    console.log("Home Render");
    return (
      <View style={AppStyle.container}>
        <HeaderHome title={"Home"} />
        <UserDashboard />
        {addSpace(2)}
        <LabelText style={{ fontSize: 21 }}>{formateDate(new Date(), "MMMM YYYY")}</LabelText>
        <Container>
          {this.state.data && <HomeBody user={this.props.user} data={this.state.data} />}
        </Container>
      </View>
    );
  }
  homeHeader = () => <UserDashboard />;
}

function mapStateToProps(state) {
  return {
    token: state.Token,
    user: state.User,
    visitschedule: state.VisitSchedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFirstOpen: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_FIRST,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
