import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import colors from "../styles/colors";

export default class Forminput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}
  static getDerivedStateFromProps(props, state) {
    if (props != state) {
      if (props.backgroundColor) {
        styles.backgroundColor = props.backgroundColor;
      }
      if (props.width) {
        styles.backgroundColor = props.width;
      }
      if (props.height) {
        styles.backgroundColor = props.height;
      }
      if (props.padding) {
        styles.padding = props.padding;
      }
      if (props.margin) {
        styles.margin = props.margin;
      }
      if (props.absolute) {
        styles.position = props.absolute ? "absolute" : "relative";
      }
      if (props.editable) {
        styles.editable = props.editable;
      }
      if (props.stickybottom) {
        styles.position = "absolute";
        styles.bottom = 0;
      }
      return state;
    }
    return null;
  }
  callonpress() {
    console.log("callonpress");
    if (this.props.onPressButton) {
      this.props.onPressButton();
    }
  }
  render() {
    return (
      <View style={[styles, this.props.stylecontainer ? this.props.stylecontainer : null]}>
        {this.props.title && (
          <Text style={[this.props.styleTitle ? this.props.styleTitle : null]}>
            {this.props.title ? this.props.title : ""}
          </Text>
        )}

        <TextInput
          keyboardType={this.props.keyboardtype ? this.props.keyboardtype : "default"}
          multiline={this.props.multiline ? this.props.multiline : false}
          secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
          editable={this.props.editable != null ? this.props.editable : true}
          onChangeText={this.props.onChangeText}
          defaultValue={this.props.defaultText}
          style={[this.props.styleinput ? this.props.styleinput : null]}
          textAlignVertical={this.props.textAlignVertical ? this.props.textAlignVertical : "center"}
          placeholder={this.props.placeholder != null ? this.props.placeholder : this.props.title}
          placeholderTextColor={
            this.props.placeholderTextColor != null
              ? this.props.placeholderTextColor
              : colors.COLOR_TEXT_4
          }
        />
      </View>
    );
  }
}

let styles = {
  flex: 1,
  //justifyContent: 'center',
  //alignItems: 'center',
  position: "relative",
};
let stylesinput = {
  borderBottomWidth: 1,
};
