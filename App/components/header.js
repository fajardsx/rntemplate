import React, { Component } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView } from "react-native";
import { AppStyle } from "../styles/styles";
import colors from "../styles/colors";

export const HeaderHome = (props) => (
  <View style={AppStyle.headerdefault}>
    <View style={{ flex: 0.1 }} />
    <View style={{ flex: 0.1 }}>
      <Text>{props.title ? props.title : "Title Dummy"}</Text>
    </View>
    <View style={{ flex: 0.1 }} />
  </View>
);
