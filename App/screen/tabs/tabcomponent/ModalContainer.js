import React, { Component } from "react";
import { Text, View, Keyboard, Alert } from "react-native";
import { ModalStart, ModalFeedBack } from "../../components/ModalActionHome";
import { connect } from "react-redux";
import dateFns from "date-fns";
import moment from "moment";
import "moment/locale/id";
import "moment/min/moment-with-locales";

var idLocale = require("date-fns/locale/id");
import ACTION_TYPE from "../../../redux/actions/indexactions";
import Constant from "../../../config/Constant";
import callAPI from "../../../services/api";
import { RESTKEY } from "../../../config/Keys";
import { showToast } from "../../../config/global";
import colors from "../../../styles/colors";
import { color } from "react-native-reanimated";

class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showFeedBackModal: false,
      tempDataSelect: [],
      tempDataChild: null,
      feedbacktxt: "",
    };
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  onAcceptModal() {
    this.setState(
      {
        showModal: false,
        showFeedBackModal: false,
      },
      () => {
        let tempUser = Object.assign({}, this.props.user);
        switch (tempUser.currentRole) {
          case Constant.ROLE_INLOGIN:
            // START TODAY
            this.SubmitAttend("in");
            break;
          case Constant.ROLE_READYSTARTSCHEDULE:
            // FINISH TODAY
            this.SubmitAttend("out");
            break;
          case Constant.ROLE_INSELECTSCHEDULE:
            // SET SCHEDULE TODAY
            this.SubmitVisit();
            break;
          case Constant.ROLE_ADDDOCTORAGAIN:
            // SET SCHEDULE TODAY
            this.SubmitVisit();
            break;
          case Constant.ROLE_YESTERDAY:
            // EXPIRED ATTEND
            this.SubmitAttendExpired();
            break;

          default:
            break;
        }
      }
    );
  }
  onCloseModal() {
    this.setState({
      showModal: false,
      showFeedBackModal: false,
    });
  }
  onShowFeedBack(data) {
    console.log("ModalContainer.js => onShowFeedBack idDocter data", data);
    this.setState({
      showFeedBackModal: true,
      tempDataChild: data,
      feedbacktxt: "",
    });
  }
  async onShowModal() {
    if (
      this.props.user.currentRole == Constant.ROLE_INSELECTSCHEDULE ||
      this.props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN
    ) {
      let data = await this.generateList();
      this.setState({
        showModal: true,
        tempDataSelect: data,
      });
    } else {
      this.setState({
        showModal: true,
      });
    }
  }
  generateList() {
    //CHECK isSelect is True
    let dataVisitSchedule = JSON.parse(this.props.showvisitschedule);
    let idDocter = [];
    let visitschedule = dataVisitSchedule.filter((parents, index) => {
      let result = parents["doctors"].filter((child) => {
        if (child.isSelect == true && child.schedule && child.schedule.length == 0) {
          return child;
        }
      });
      if (result.length > 0) {
        //console.log("ModalContainer.js => generateList() idDocter before", result);
        idDocter = idDocter.concat(result);
      }
    });
    //console.log("ModalContainer.js => generateList() idDocter visitSchedule", visitschedule);
    idDocter = idDocter.concat(visitschedule);
    // console.log("ModalContainer.js => generateList() idDocter visitSchedule", visitschedule);
    // visitschedule.map((res) => {
    //   let founds = res["doctors"].filter((status) => {
    //     return status.isSelect == true;
    //   });
    //   if (founds.length > 0) {
    //     //console.log("ModalContainer.js => SubmitVisit foundsSelect ", founds);
    //     idDocter = idDocter.concat(founds);
    //   }
    // });
    console.log("ModalContainer.js => generateList() idDocter before", idDocter);
    idDocter = this.removeDuplicate(idDocter);
    return idDocter;
  }
  onFeedBackChange(e) {
    this.setState({ feedbacktxt: e });
  }
  // UPDATE ROLE USER
  onUpdateRoleUser(role) {
    console.log("ModalContainer.js => onUpdateRoleUser() ROLE ", role);
    let tempuser = Object.assign({}, this.props.user);
    tempuser.currentRole = role;
    this.props.updateUser(tempuser);
  }
  // API
  SubmitAttend = async (type) => {
    const body = new FormData();
    body.append("user_id", this.props.user.id);
    body.append("status", type);
    body.append("date", dateFns.format(new Date(), Constant.formatAttend, { locale: idLocale }));

    //return console.log("ModalContainer.js => submitattend body ", body);
    let addHeader = {
      "X-Authorization-Time": dateFns.getTime(new Date()),
      "Content-Type": "multipart/form-data;",
    };
    console.log("ModalContainer.js => submitattend body ", body);
    this.props.setLoading(true);
    let resultAttend = await callAPI(Constant.P, RESTKEY.API.req_attend, body, addHeader);
    this.props.setLoading(false);
    console.log("ModalContainer.js => resultAttend ", resultAttend);
    if (resultAttend) {
      if (resultAttend.api_message == "success") {
        showToast(resultAttend.api_message, colors.TOAST_SUCCESS);

        if (type == "in") {
          this.onUpdateRoleUser(Constant.ROLE_INSELECTSCHEDULE);
        } else if (type == "out") {
          this.onUpdateRoleUser(Constant.ROLE_FINISHTODAY);
        }
      } else {
        showToast(resultAttend.api_message, colors.TOAST_WARNING);
      }
    }
  };
  //
  SubmitAttendExpired = async () => {
    const body = new FormData();
    let dateYesterday = dateFns.addDays(new Date(), -1);
    dateYesterday = dateFns.format(dateYesterday, "YYYY-MM-DD 23:59:00");
    body.append("user_id", this.props.user.id);
    body.append("in", JSON.parse(this.props.visitschedule).attend.in);
    body.append("out", dateYesterday);

    //console.log("ModalContainer.js => SubmitAttendExpired tempuser ", tempuser);
    //return console.log("ModalContainer.js => SubmitAttendExpired body ", body);
    let addHeader = {
      "X-Authorization-Time": dateFns.getTime(new Date()),
      "Content-Type": "multipart/form-data;",
    };
    console.log("ModalContainer.js => SubmitAttendExpired body ", body);
    this.props.setLoading(true);
    let resultAttendExpired = await callAPI(
      Constant.P,
      RESTKEY.API.req_attend_sync,
      body,
      addHeader
    );
    console.log("ModalContainer.js => SubmitAttendExpired resultAttend ", resultAttendExpired);
    this.props.setLoading(false);
    if (resultAttendExpired) {
      if (resultAttendExpired.api_message == "success") {
        showToast(resultAttendExpired.api_message, colors.TOAST_SUCCESS);
        this.onUpdateRoleUser(Constant.ROLE_INLOGIN);
      } else {
        showToast(resultAttendExpired.api_message, colors.TOAST_WARNING);
      }
    }
  };
  //
  SubmitVisit = async () => {
    //CHECK isSelect is True
    let idDocter = this.state.tempDataSelect.map((a) => a.id);
    console.log("ModalContainer.js => SubmitVisit idDocter all id", idDocter);
    // PROCESS SET API
    let addHeader = {
      "X-Authorization-Time": dateFns.getTime(new Date()),
      "Content-Type": "multipart/form-data;",
    };
    const body = new FormData();
    body.append("user_id", this.props.user.id);
    idDocter.map((item, index) => {
      body.append("doctors_ids[" + index + "]", item);
    });
    console.log("ModalContainer.js => submitattend body ", body);
    this.props.setLoading(true);
    let resultSetSchedule = await callAPI(Constant.P, RESTKEY.API.set_schdule, body);
    console.log("ModalContainer.js => SubmitVisit ", resultSetSchedule);
    this.props.setLoading(false);
    if (resultSetSchedule) {
      if (resultSetSchedule.api_message == "success") {
        this.requestNewList(resultSetSchedule.set_schedule);
        showToast(resultSetSchedule.api_message, colors.TOAST_SUCCESS);
      } else {
        showToast(resultSetSchedule.api_message, colors.TOAST_WARNING);
      }
    }
  };
  removeDuplicate(data) {
    let uniq = {};
    return data.filter((obj) => !uniq[obj.id] && (uniq[obj.id] = true));
  }
  //
  async requestNewList(updateVisit) {
    //
    let insertSchedule = {
      cms_users_id: 273,
      created_at: "2020-07-16 11:45:08",
      doctors_id: 1317,
      id: 55428,
      results: null,
      schedule_date: "2020-07-16",
      updated_at: "2020-07-16 11:45:08",
    };

    let listDoctor = [];
    updateVisit.map((res) => {
      listDoctor = listDoctor.concat(listDoctor, res["doctors"]);
    });
    //console.log("ModalContainer.js => requestNewList() visitSchedule ", visitSchedule);
    listDoctor = this.removeDuplicate(listDoctor);
    console.log("ModalContainer.js => requestNewList() getDoctor ", listDoctor);
    //UPDATE LOCAL DATA
    let visitSchedule = JSON.parse(this.props.visitschedule);
    console.log("ModalContainer.js => requestNewList() visitSchedule ", visitSchedule);
    await visitSchedule.visit_schedule.map((res) => {
      res["doctors"].map((resdoc) => {
        //console.log("ModalContainer.js => requestNewList() resdoc  ", resdoc);
        //cek if available in list update doctor

        let found = listDoctor.find((updateres) => {
          return updateres.id == resdoc.id;
        });
        if (found) {
          console.log("ModalContainer.js => requestNewList() found ", found);
          if (resdoc.schedule.length == 0) {
            let insertSchedule = {
              cms_users_id: null,
              created_at: dateFns.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
              doctors_id: found.id,
              id: null,
              results: null,
              schedule_date: dateFns.format(new Date(), "YYYY-MM-DD"),
              updated_at: dateFns.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
            };
            resdoc.schedule.push(insertSchedule);
          }
        }
      });
    });
    this.props.updateVisit(JSON.stringify(visitSchedule));
    this.onUpdateRoleUser(Constant.ROLE_READYSTARTSCHEDULE);
    this.delay = setTimeout(() => {
      //this.onUpdateRoleUser(Constant.ROLE_READYSTARTSCHEDULE);
      this.props.initData();
      clearTimeout(this.delay);
    }, 1000);
  }
  //
  async onSubmitFeedbackModal() {
    const { user } = this.props;
    const { tempDataSelect } = this.state;
    Keyboard.dismiss();
    if (this.state.feedbacktxt.length < Constant.maxCharFeedback) {
      return Alert.alert(
        `Hi, ${this.props.user.name}`,
        `Mohon Feedback diisi Minimal ${Constant.maxCharFeedback} karakter`
      );
      //showToast(`Minimum feedback ${Constant.maxCharFeedback} character`, colors.TOAST_WARNING);
    }
    let feedbackForm = tempDataSelect; //<= data dokter for fill feedback body
    let startDate = dateFns.format(Date.now(), "YYYY-MM-DD", { locale: idLocale });
    let feedbackFormStatus = 0; //<= if not meet
    let body = new FormData();
    body.append("status", feedbackFormStatus);
    body.append("cms_users_id", user.id);
    body.append("schedule_date", startDate);
    body.append("doctors_id", feedbackForm.pivot.doctors_id);
    body.append("locations_id", feedbackForm.pivot.locations_id);
    body.append("signature", false);
    body.append("feedback", false);
    body.append("feedback_sales", this.state.feedbacktxt);
    body.append("e_detailings_name", feedbackForm.speciality_name);
    body.append("json_result", null);
    console.log("ModalContainer.js => onSubmitFeedbackModal body ", body);
    this.props.setLoading(true);
    let resultSubmitfeedback = await callAPI(Constant.P, RESTKEY.API.schedule_result, body);
    console.log("ModalContainer.js => SubmitVisit ", resultSubmitfeedback);
    this.props.setLoading(false);
    if (resultSubmitfeedback) {
      if (resultSubmitfeedback.api_message == "success") {
        showToast(resultSubmitfeedback.api_message, colors.TOAST_SUCCESS);
      } else {
        showToast(resultSubmitfeedback.api_message, colors.TOAST_WARNING);
      }
    }
  }
  //
  render() {
    console.log("Rerender Modal Container");
    return (
      <View>
        <ModalStart
          user={this.props.user}
          isVisible={this.state.showModal}
          onClose={this.onCloseModal.bind(this)}
          onAccept={this.onAcceptModal.bind(this)}
          dataList={this.state.tempDataSelect}
        />
        <ModalFeedBack
          user={this.props.user}
          isVisible={this.state.showFeedBackModal}
          onClose={this.onCloseModal.bind(this)}
          onAccept={this.onSubmitFeedbackModal.bind(this)}
          onChangeTxt={this.onFeedBackChange.bind(this)}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.User,
    visitschedule: state.VisitSchedule,
    showvisitschedule: state.ShowDataVisitSchedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_USER,
        value: data,
      }),
    updateVisit: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_VISIT_SCHEDULE,
        value: data,
      }),
    updateLocation: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_USERLOCATION,
        value: data,
      }),
    setLoading: (data) =>
      dispatch({
        type: ACTION_TYPE.SET_LOADING,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
