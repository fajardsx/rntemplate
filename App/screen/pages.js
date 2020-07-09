import React, { Component } from "react";
import { Text, View } from "react-native";
import { Container } from "../containers/screen";
import { HeaderHome } from "../components/header";

export default class Pages extends Component {
  componentDidMount() {
    console.log("Mount Pages");
  }
  PagesContainer = (props) => (
    <Container>
      <HeaderHome title={"Detail"} />
      {props.children}
    </Container>
  );
}
