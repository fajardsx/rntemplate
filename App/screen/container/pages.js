import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Container } from "../../containers/screen";
import { HeaderHome } from "../../components/header";

//Container Pages

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  PagesContainer = (props) => <Container style={props.style}>{props.children}</Container>;
}

export default Pages;
