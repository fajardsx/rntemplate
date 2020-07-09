import React, { Component } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { AppStyle } from "../styles/styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../styles/colors";
import Forminput from "../components/Forminput";

// COMPONENT
export const HeaderHome = (props) => (
  <View style={AppStyle.headerdefault}>
    <View style={{ flex: 0.1 }}>
      {props.isBack && (
        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Icon name="chevron-left" size={21} color={colors.COLOR_PRIMARY_1} />
        </TouchableOpacity>
      )}
    </View>
    <View style={{ flex: 0.8, justifyContent: "center" }}>
      <Text style={[AppStyle.headerLabeldefault, props.headerLabelStyle]}>{props.title}</Text>
    </View>
    <View style={{ flex: 0.1 }} />
  </View>
);
// DEFAULT PROPS
HeaderHome.defaultProps = {
  title: "Title",
  isBack: false,
  rightType: 0,
  onBack: () => {
    Alert.alert("Back", "Click Back");
  },
};
//HEADER SEARCH
export const HeaderSearch = (props) => (
  <View style={AppStyle.headerdefault}>
    <View style={{ flex: 0.1 }}>
      <TouchableOpacity
        onPress={() => props.onBack()}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon name="chevron-left" size={21} color={colors.COLOR_PRIMARY_1} />
      </TouchableOpacity>
    </View>
    <View style={{ flex: 0.85 }}>
      <Forminput
        defaultValue={props.defaultValue}
        onChangeText={props.onChange}
        stylecontainer={{
          flex: 0,
          borderRadius: 10,
          paddingLeft: 5,
          width: "100%",
          marginVertical: 10,
          backgroundColor: colors.COLOR_BGINPUT_1,
        }}
        placeholder={props.title}
      />
    </View>
  </View>
);
// DEFAULT PROPS
HeaderSearch.defaultProps = {
  title: "Search..",
  defaultValue: "",
  onBack: () => {
    Alert.alert("Back", "Click Back");
  },
  onChange: (text) => {
    //console.log("Search => ", text);
  },
};
