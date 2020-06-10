import React, { Component } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView } from "react-native";
import { AppStyle } from "../styles/styles";
import colors from "../styles/colors";
import Modal from "react-native-modal";
import { convertHeight } from "../config/global";

export const Container = (props) => (
  <View style={[AppStyle.container, [props.style]]}>
    <KeyboardAvoidingView
      style={{ minHeight: convertHeight(100) }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={AppStyle.container}>
      {props.children}
    </KeyboardAvoidingView>
    <StatusBar
      hidden={props.statusbarHidden ? props.statusbarHidden : false}
      backgroundColor={colors.COLOR_STATUSBAR}
      barStyle={"light-content"}
    />
  </View>
);

export const ModalScreen = (props) => (
  <Modal isVisible={props.isVisible} avoidKeyboard onBackButtonPress={() => props.onClose()}>
    {props.children}
  </Modal>
);
