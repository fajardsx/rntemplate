import React, { Component } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { AppStyle } from "../styles/styles";
import colors from "../styles/colors";
import Constant from "../config/Constant";

export const DrawHorizontalLine = (props) => (
  <View style={[{ borderBottomWidth: 0.5, paddingTop: 10 }, props.style]}></View>
);
