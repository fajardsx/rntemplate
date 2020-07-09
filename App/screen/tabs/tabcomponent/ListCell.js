import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { CellHome } from "../../../components/cell";
import NavigationServices from "../../../NavigationServices";

export default class ListCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  onselect = (i) => {
    const { data } = this.state;
    const datatemp = [...data];
    console.log("Press ", i);
    let getIndex = datatemp.findIndex((res) => {
      return res.id == i;
    });
    if (getIndex > -1) {
      console.log("Found INdex ", getIndex);
      datatemp[getIndex].isSelect = !datatemp[getIndex].isSelect;
      console.log("Found datatemp ", datatemp);
      if (datatemp[getIndex].isSelect == true) {
        NavigationServices.navigate("ScreenDetail");
      }
      this.setState({ data: datatemp });
    }
  };

  render() {
    console.log("Rerender List Cell");
    return (
      <View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          initialNumToRender={5}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={1000}
          windowSize={2}
          removeClippedSubviews={true}
          scrollEnabled={false}
          renderItem={this.renderItems}
          keyExtractor={(item, index) => {
            return "cell" + index;
          }}
        />
      </View>
    );
  }
  renderItems = ({ item, index }) => <CellHome item={item} onPress={this.onselect.bind(this)} />;
}
