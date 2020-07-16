import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { CellHome, CellHomePlace } from "../../../components/cell";
import NavigationServices from "../../../NavigationServices";
import { stat } from "react-native-fs";
import { connect } from "react-redux";
import ACTION_TYPE from "../../../redux/actions/indexactions";

class ListCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      list: this.List,
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }
  //
  static getDerivedStateFromProps(props, state) {
    if (props.data != state.data) {
      if (state.list) {
        state.list.scrollToIndex(0);
      }
      return {
        data: props.data,
      };
    }
    return null;
  }
  //UPDATE SELECT PARENT
  onSelect = (data, status) => {
    //console.log("ListCell.js => onSelect() data ", data);
    let tempData = [...this.state.data];
    let posData = tempData.find((res) => {
      return res.id == data.id;
    });
    if (posData) {
      posData.isSelect = status;
      posData["doctors"].map((child) => {
        this.onSelectChild(child, status, tempData);
      });
    }
  };
  //UPDATE SELECT CHILD
  onSelectChild(data, status, dataParent) {
    //console.log("ListCell.js => onSelectChild() data ", data);
    //console.log("ListCell.js => onSelectChild() id ", this.state.data);
    let tempData = dataParent ? dataParent : [...this.state.data];
    data.locations.map((loc) => {
      let getParent = tempData.find((res) => {
        return res.id == loc;
      });
      if (getParent) {
        //console.log("ListCell.js => onSelectChild() getParent ", getParent);
        let child = getParent["doctors"].find((child) => {
          return child.id == data.id;
        });
        if (child) {
          // console.log("ListCell.js => onSelectChild() child ", child);
          child.isSelect = status;
        }
      }
    });
    //Check Parent
    tempData.map((par) => {
      let isSelectCount = 0;
      par["doctors"].map((childdata) => {
        if (childdata.isSelect == true) {
          isSelectCount += 1;
        }
      });
      //RESULT CHILD
      if (isSelectCount == par["doctors"].length) {
        par.isSelect = true;
      }
      if (isSelectCount < par["doctors"].length) {
        par.isSelect = false;
      }
    });
    this.onUpdate(tempData);
    //console.log("ListCell.js => onSelectChild() after tempData ", tempData);
  }
  //FOR UPDATE VISIT SCHEDULE
  onUpdate(data) {
    const { visitschedule } = this.props;
    let datareduc = JSON.parse(visitschedule);
    console.log("ListCell.js => onUpdate() data ", data);
    console.log("ListCell.js => onUpdate() datareduc.visit_schedule ", datareduc.visit_schedule);
    datareduc.visit_schedule = data;
    console.log("ListCell.js => onUpdate() after tempData ", datareduc.visit_schedule);
    //this.props.updateVisitSchedule(JSON.stringify(datareduc));
    this.props.updateShowVisitSchedule(JSON.stringify(data));
  }
  //
  render() {
    console.log("Rerender List Cell");
    return (
      <FlatList
        ref={(res) => (this.List = res)}
        data={this.state.data}
        extraData={this.state}
        initialNumToRender={5}
        maxToRenderPerBatch={2}
        //updateCellsBatchingPeriod={1000}
        windowSize={2}
        removeClippedSubviews={true}
        // scrollEnabled={false}
        renderItem={this.renderItems}
        keyExtractor={(item, index) => {
          return "cell" + index;
        }}
      />
    );
  }
  renderItems = ({ item, index }) => (
    <CellHomePlace
      item={item}
      user={this.props.user}
      onPress={this.onSelect.bind(this)}
      onPressChild={this.onSelectChild.bind(this)}
      onPressNA={this.props.onOpenFeedBack}
    />
  );
}
function mapStateToProps(state) {
  return {
    visitschedule: state.VisitSchedule,
    showvisitschedule: state.ShowDataVisitSchedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateVisitSchedule: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_VISIT_SCHEDULE,
        value: data,
      }),
    updateShowVisitSchedule: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_SHOW_VISIT_SCHEDULE,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCell);
