import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Geolocation from "react-native-geolocation-service";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { Container } from "../../containers/screen";
import { LabelText } from "../../components/labelManager";
import { ROUTE_NAME, RESTKEY } from "../../config/Keys";
import {
  convertHeight,
  convertWidth,
  showToast,
  calcDistance,
  targetSort,
  reqActivateGps,
} from "../../config/global";
import colors from "../../styles/colors";
import callAPI from "../../services/api";
import Constant from "../../config/Constant";
import ACTION_TYPE from "../../redux/actions/indexactions";

class AuthorizeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempSchedule: null,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      //this.props.navigation.navigate(ROUTE_NAME.Screen_Apps);
      this.onRequestSchedule();
    } else {
      this.props.navigation.navigate(ROUTE_NAME.Screen_FirstLogin);
    }
  }
  //RESP API
  async onRequestSchedule() {
    const { user, visitSchedule } = this.props;
    //if (visitSchedule) return console.log(JSON.parse(visitSchedule));
    //console.log("Authorize uSer", user.id);
    let body = new FormData();
    body.append("user_id", user.id);
    const dataSchedule = await callAPI(Constant.P, RESTKEY.API.req_schdule, body);
    console.log("Authorize uSer dataSchedule=>", dataSchedule);
    if (dataSchedule.api_message == "success") {
      let schedule = {
        attend: dataSchedule.attend,
        data: dataSchedule.data,
        list_doctor_set_this_month: dataSchedule.list_doctor_set_this_month,
        list_doctor_set_today: dataSchedule.list_doctor_set_today,
        set_schedule: dataSchedule.set_schedule,
        visit_schedule: dataSchedule.visit_schedule,
      };
      this.processSchedule(schedule);
    } else {
      showToast("Failed Get Visit Schedule", colors.TOAST_WARNING);
      //this.processSchedule();
    }
  }
  // ATTEND USER
  checkAttendUser(attend, set_schedule) {
    const { user } = this.props;
    console.log("User attend ", attend);
    let startRole = 0;
    let resultin = 0;
    let resultout = 0;
    if (attend.in && attend.in.length > 3) {
      resultin = dateFns.differenceInCalendarDays(dateFns.parse(attend.in), new Date());
      console.log("is yesterday User attend in", resultin);
    }
    if (attend.out && attend.out.length > 3) {
      resultout = dateFns.differenceInCalendarDays(dateFns.parse(attend.out), new Date());
      console.log("is yesterday User attend out", resultout);
    } else if (attend.out == null) {
      resultout = null;
    }

    if (resultin < 0 && resultout < 0) {
      startRole = Constant.ROLE_INLOGIN;
    } else if (resultin < 0 && resultout == null) {
      startRole = Constant.ROLE_YESTERDAY;
    } else if (resultin == 0 && set_schedule.length > 0) {
      startRole = Constant.ROLE_READYSTARTSCHEDULE;
    } else if (resultin == 0 && set_schedule.length == 0) {
      startRole = Constant.ROLE_INSELECTSCHEDULE;
    }
    let tempUser = Object.assign({}, user);
    tempUser.currentRole = startRole;
    this.props.updateUser(tempUser);
    console.log("startRole", startRole);
  }
  // REQUEST LOCATION AGAIN
  async GetLocation(schedule) {
    //showToast("Your GPS Not active");

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log("cordinate : ", newCoordinate);
        this.props.updateLocation(newCoordinate);
      },
      (error) => {
        console.log("cordinate : ", error);
        showToast(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100,
      }
    );
  }
  // GENERATE SCHEDULE
  async processSchedule(schedule) {
    if (schedule) this.props.updateVisit(JSON.stringify(schedule));

    let dataSchedule = JSON.parse(this.props.visitschedule);
    console.log("AuthorizeUser.js => dataSchedule", dataSchedule);
    //USER ATTEND/ABSEN
    this.checkAttendUser(dataSchedule.attend, dataSchedule.set_schedule);
    //USER LOCATION
    let mycoordinate = this.props.userlocation;

    if (mycoordinate == null) return reqActivateGps(this.GetLocation.bind(this, schedule));

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log("AuthorizeUser.js => mycoordinate : ", newCoordinate);
        this.props.updateLocation(newCoordinate);
        this.generateRange(dataSchedule, newCoordinate);
      },
      (error) => {
        showToast(error.message);
        this.generateRange(dataSchedule, mycoordinate);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100,
      }
    );
  }
  generateRange = (dataSchedule, mycoordinate) => {
    console.log("AuthorizeUser.js => mycoordinate", mycoordinate);
    //console.log("AuthorizeUser.js => dataSchedule", dataSchedule);
    // RANGE DATA

    dataSchedule.visit_schedule.map((res) => {
      //console.log("hospital : ", res);
      const res_cordinate = { latitude: res.lat, longitude: res.lng };
      let resultRange = calcDistance(mycoordinate, res_cordinate);
      //console.log("hospital : ", resultRange);
      res.range = resultRange;
      res.isSelect = false;
      //addDoctor
      let countSelect = 0;
      res.doctors.map((resDok) => {
        if (resDok.schedule && resDok.schedule.length > 0) {
          resDok.isSelect = true;
          countSelect += 1;
        } else {
          resDok.isSelect = false;
        }
      });
      //Set Select
      if (countSelect == res.doctors.length) {
        res.isSelect = true;
      }
    });
    dataSchedule.set_schedule.map((res) => {
      //console.log("hospital : ", res);
      const res_cordinate = { latitude: res.lat, longitude: res.lng };
      let resultRange = calcDistance(mycoordinate, res_cordinate);
      //console.log("hospital : ", resultRange);
      res.range = resultRange;
      // res.isSelect = false;
      // //addDoctor
      // res.doctors.map((resDok) => {
      //   resDok.isSelect = false;
      // });
    });
    console.log("AuthorizeUser.js => dataSchedule after", dataSchedule);
    let sortRange = dataSchedule.visit_schedule.sort(targetSort(["range"]));
    let sortRangeset_schedule = dataSchedule.set_schedule.sort(targetSort(["range"]));
    //console.log("AuthorizeUser.js => sortRange", sortRange);
    this.props.updateVisit(JSON.stringify(dataSchedule));
    //Start APPS
    this.props.navigation.navigate(ROUTE_NAME.Screen_Apps);
  };
  //
  render() {
    return (
      <Container>
        <View
          style={{
            width: convertWidth(100),
            height: convertHeight(100),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.COLOR_BG_AUTHOR,
          }}>
          <LabelText
            style={{
              textAlign: "center",
              color: "#fff",
            }}>
            Please Wait
          </LabelText>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
  visitschedule: state.VisitSchedule,
  userlocation: state.UserLocation,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateVisit: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_VISIT_SCHEDULE,
        value: data,
      }),
    updateUser: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_USER,
        value: data,
      }),
    updateLocation: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_USERLOCATION,
        value: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizeUser);
