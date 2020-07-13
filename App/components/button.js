import React, { Component } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { AppStyle } from "../styles/styles";
import colors from "../styles/colors";
import Constant from "../config/Constant";

export const Buttons = (props) => (
  <TouchableOpacity
    disabled={props.disabled}
    style={[
      AppStyle.buttondefault,
      props.style,
      props.enableStick ? { position: "absolute", bottom: 0 } : null,
    ]}
    onPress={() =>
      props.onPress ? props.onPress() : Alert.alert(Constant.NAME_APPS, "No Event Click")
    }>
    <Text style={[AppStyle.buttonlabeldefault, props.stylelabel]}>
      {props.label ? props.label : "Button Label"}
    </Text>
  </TouchableOpacity>
);
