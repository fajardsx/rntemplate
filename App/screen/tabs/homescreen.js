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
import { ModalStart } from "../components/ModalActionHome";
import ModalContainer from "./tabcomponent/ModalContainer";
import { Buttons } from "../../components/button";
import colors from "../../styles/colors";

const HomeBody = (props) => (
  <ListCell
    user={props.user}
    data={props.data}
    onUpdate={props.onUpdate}
    onOpenFeedBack={props.onOpenFeedBack}
  />
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
    let data = [];
    this.onInitSchedule();
    // IF ATTEND IN EXPIRED
    if (this.props.user.currentRole == Constant.ROLE_YESTERDAY) {
      this.modal.onShowModal();
    }
  }
  onInitSchedule() {
    const { user, visitschedule } = this.props;
    console.log("homescreen.js => onInitSchedule() Role ", this.props.user.currentRole);
    let data = JSON.parse(visitschedule);

    data = JSON.parse(visitschedule).visit_schedule;

    //console.log("homescreen.js => onInitSchedule() Schedule data ", data);
    // SET HOME DATA LIST
    if (user.currentRole == Constant.ROLE_READYSTARTSCHEDULE) {
      let tempList = data.filter((value, index) => {
        //console.log("homescreen.js => onInitSchedule() value", value);
        let select = value["doctors"].filter((res) => {
          if (res.schedule) {
            return res.schedule.length > 0;
          }
        });
        if (select.length > 0) {
          return value;
        }
      });
      console.log("homescreen.js => onInitSchedule() Schedule data select ", tempList);
      data = tempList;
    } else if (user.currentRole == Constant.ROLE_ADDDOCTORAGAIN) {
      let tempList = data.filter((value, index) => {
        //console.log("homescreen.js => onInitSchedule() value", value);
        let select = value["doctors"].filter((res) => {
          if (res.schedule) {
            return res.schedule.length == 0;
          } else {
            return res;
          }
        });
        if (select.length > 0) {
          return value;
        }
      });
      console.log("homescreen.js => onInitSchedule() Schedule data notSelect ", tempList);
      data = tempList;
    }

    this.setState(
      {
        data,
      },
      () => this.props.setLoading(false)
    );
  }
  onShowModal = () => {
    this.modal.onShowModal();
  };
  // CHANGE STATUS AFTER SELECT
  onAddNewPlan = () => {
    console.log("homescreen.js => onInitSchedule() Role ", this.props.user.currentRole);
    this.props.setLoading(true);
    if (this.props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE) {
      this.modal.onUpdateRoleUser(Constant.ROLE_ADDDOCTORAGAIN);
    } else if (this.props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN) {
      this.modal.onUpdateRoleUser(Constant.ROLE_READYSTARTSCHEDULE);
    }
    this.delay = setTimeout(() => {
      this.onInitSchedule();
      clearTimeout(this.delay);
    }, 500);
  };
  //FOR UPDATE VISIT SCHEDULE
  onUpdate(data) {
    const { visitschedule } = this.props;
    let datareduc = JSON.parse(visitschedule);
    datareduc.visit_schedule = data;
    this.props.updateVisitSchedule(JSON.stringify(datareduc));
  }
  //
  render() {
    console.log("Home Render");
    return (
      <View style={AppStyle.container}>
        <HeaderHome title={"Home"} />
        <UserDashboard callShow={this.onShowModal.bind(this)} />
        {
          // HEADER
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "space-between",
            }}>
            <LabelText style={{ fontSize: 21 }}>{formateDate(new Date(), "MMMM YYYY")}</LabelText>
            <Buttons
              style={{
                width:
                  this.props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN
                    ? convertWidth(20)
                    : convertWidth(8),
                height: convertWidth(8),
                borderRadius: 30,
                backgroundColor:
                  this.props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE
                    ? colors.USERBUTTON_ACTIVE_COLOR
                    : colors.USERBUTTON_CANCEL_ACTIVE_COLOR,
              }}
              stylelabel={{
                fontSize: 14,
              }}
              label={this.props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN ? "Cancel" : "+"}
              onPress={this.onAddNewPlan.bind(this)}
            />
          </View>
        }

        <Container disableKeyboardAware>
          {this.state.data && (
            <HomeBody
              user={this.props.user}
              data={this.state.data}
              onUpdate={this.onUpdate.bind(this)}
              onOpenFeedBack={(e) => {
                this.modal.onShowFeedBack(e);
              }}
            />
          )}
        </Container>
        {this.ModalController()}
      </View>
    );
  }
  homeHeader = () => <UserDashboard />;
  ModalController = () => {
    return (
      <ModalContainer
        onRef={(e) => (this.modal = e)}
        user={this.props.user}
        initData={this.onInitSchedule.bind(this)}
      />
    );
  };
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
    updateVisitSchedule: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_VISIT_SCHEDULE,
        value: data,
      }),
    setLoading: (data) =>
      dispatch({
        type: ACTION_TYPE.SET_LOADING,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
