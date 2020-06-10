import React, { Component } from "react";
import { View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome5";
//
import NavigationService from "./NavigationServices";
import Root from "./containers/root";
import Init from "./screen/initscreen";
import OnBoardingScreen from "./screen/onBoarding/OnBoardingScreen";
import { ROUTE_NAME } from "./config/Keys";
import colors from "./styles/colors";
import { moderateScale } from "./styles/scaling";
import { convertWidth, convertHeight } from "./config/global";
import HomeScreen from "./screen/tabs/homescreen";
import ProfilScreen from "./screen/tabs/profilscreen";
import LoginScreen from "./screen/login/loginscreen";

//TAB
const hIcon = 3;
const MainTabNavigation = createBottomTabNavigator(
  {
    Home: {
      // screen: props => <HomeScreen {...props} />
      screen: HomeScreen,
    },
    Profile: {
      // screen: props => <ProfileScreen {...props} />
      screen: ProfilScreen,
    },
  },
  {
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    lazy: false,
    tabBarOptions: {
      activeTintColor: colors.TAB_ACTIVE_COLOR,
      inactiveTintColor: "#939393",
      indicatorStyle: {
        backgroundColor: colors.TAB_ACTIVE_COLOR,
        //height: 5
      },
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: "#FFF",
        height: moderateScale(60),
        alignItems: "center",
      },
      tabStyle: {
        height: moderateScale(50),
        width: convertWidth(25),
      },
      labelStyle: {
        fontSize: moderateScale(13),
        //marginBottom: convertHeight(1),
        //fontFamily: fonts.FONT_AVENIR_DEMIBOLD,
      },
      iconStyle: {
        //paddingBottom: convertHeight('1%')
        //paddingTop: convertHeight('1%')
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler(); // Switch tab
        console.log("tabBarOnPress => ", navigation);
        if (navigation.state.routeName == ROUTE_NAME.TAB_SCREEN_PROFIL) {
          //navigation.setParams({fromMemberList: false,member:null})
        }
        // if (navigation.state.index > 0) { // In case the stack is not positioned at the first screen
        //   const resetAction = StackActions.reset({ // Reset the stack
        //     index: 0,
        //     actions: [
        //       NavigationActions.navigate({ routeName: navigation.state.routes[0].routeName })
        //     ],
        //   });
        //   navigation.dispatch(resetAction);
        // }
      },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let icons = null;
        if (routeName === ROUTE_NAME.TAB_SCREEN_HOME) {
          // icons = (
          //   <Image
          //     source={tintColor === colors.COLOR_PRIMARY_2 ? images.Home : images.Home_unactive}
          //     style={{
          //       width: convertHeight(hIcon),
          //       height: convertHeight(hIcon),
          //     }}
          //     resizeMode={"contain"}
          //     // tintColor={tintColor}
          //   />
          // );
          icons = <Icon name={"home"} size={convertHeight(hIcon)} color={tintColor} />;
        } else if (routeName === ROUTE_NAME.TAB_SCREEN_PROFIL) {
          // icons = (
          //   <View>
          //     <Image
          //       source={
          //         tintColor === colors.COLOR_PRIMARY_2 ? images.Schedule : images.Schedule_unactive
          //       }
          //       style={{
          //         width: convertHeight(hIcon),
          //         height: convertHeight(hIcon),
          //       }}
          //       resizeMode={"contain"}
          //       //tintColor={tintColor}
          //     />
          //     {/*countNotif_int > 0 &&
          //                       <View style={styles.badgebg_notif}>
          //                           <Text style={styles.badgeText}>
          //                               {countNotif_int}
          //                           </Text>
          //                       </View>*/}
          //   </View>
          // );
          icons = <Icon name={"user"} size={convertHeight(hIcon)} color={tintColor} />;
        }
        return icons;
      },
    }),
  }
);
//Login Stack
const LoginStackNavigation = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
  },
  {
    initialRouteName: "ScreenMain",
    headerMode: "none",
  }
);
// MAIN ROUTE
const MainStackNavigator = createAppContainer(
  createStackNavigator(
    {
      ScreenTab: {
        screen: MainTabNavigation,
        path: "",
      },
      ScreenLogin: {
        screen: LoginStackNavigation,
      },
    },
    {
      initialRouteName: "ScreenTab",
      headerMode: "none",
    }
  )
);

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
const AppStack = createAppContainer(
  createSwitchNavigator(
    {
      InitScreen: {
        screen: Init,
      },
      OnboardingScreen: {
        screen: OnBoardingScreen,
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
  )
);

export default AppStack;
