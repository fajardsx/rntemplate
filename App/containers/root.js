import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from './screen';
import { AppStyle } from '../styles/styles';
import Constant from '../config/Constant';
import { connect } from 'react-redux';
import ACTION_TYPE from '../redux/actions/indexactions';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    Constant.TEMP_TOKEN = this.props.token
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

function mapStateToProps(state) {
  return {
      token:state.Token
  };
}

function mapDispatchTopProps(dispatch) {
  return {
    updateFirstOpen: (data) =>
      dispatch({
        type: ACTION_TYPE.UPDATE_FIRST,
        value: data,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchTopProps)(Root);