import React, { Component } from "react";
import { Text, View } from "react-native";
import Pages from "../container/pages";
import { LabelText } from "../../components/labelManager";

export default class DetailCell extends Pages {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
