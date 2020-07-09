import React, { Component } from "react";
import { Text, View } from "react-native";
import Pages from "../pages";
import { LabelText } from "../../components/labelManager";

export default class DetailCell extends Pages {
  componentDidMount() {
    console.log("mount Detail");
  }
  render() {
    return (
      <this.PagesContainer>
        <LabelText>ISI DETAIL</LabelText>
      </this.PagesContainer>
    );
  }
}
