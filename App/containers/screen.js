import React, { Component } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView } from "react-native";
import { AppStyle } from "../styles/styles";
import colors from "../styles/colors";
import Modal from "react-native-modal";
import { convertHeight } from "../config/global";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = (props) => (
  <View style={[AppStyle.container, [props.style]]}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={AppStyle.container}>
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
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
