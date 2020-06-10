import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { AppStyle } from "../styles/styles";
import colors from "../styles/colors";

export const Container = (props) => (
  <View style={AppStyle.container}>
    {props.children}

    <StatusBar
      hidden={props.statusbarHidden ? props.statusbarHidden : false}
      backgroundColor={colors.COLOR_STATUSBAR}
      barStyle={"light-content"}
    />
  </View>
);
