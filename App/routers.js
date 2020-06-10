import React, { Component } from "react";
import { View, Image } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  createStackNavigator,
} from "react-navigation-stack";
import NavigationService from "./NavigationServices";
import Root from "./containers/root";
import Init from "./screen/initscreen";
import OnBoardingScreen from "./screen/onBoarding/OnBoardingScreen";

const MainStackNavigator = createAppContainer(createStackNavigator(
    {
      ScreenMain: {
        screen: Root,
        path: "",
      },
    },
    {
      initialRouteName: "ScreenMain",
      headerMode: "none",
    }
  ));

class RootScreen extends Component {
  render() {
    return (
      <MainStackNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
const AppStack = createAppContainer(createSwitchNavigator(
  {
    InitScreen:{
      screen:Init,
    },
    OnboardingScreen:{
      screen:OnBoardingScreen,
    },
    AppsScreen: {
      screen: RootScreen,
      path: "",
    },
  },
  {
    initialRouteName: "InitScreen",
    headerMode: "none",
  }
));

export default AppStack;