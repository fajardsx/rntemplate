import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from './screen';
import { AppStyle } from '../styles/styles';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
  }

  render() {
    return (
      <Container>
        <View style={AppStyle.dummyScreenTitle}>
          <Text>{`Root Screen`}</Text>
        </View>
      </Container>
    );
  }
}

export default Root;
