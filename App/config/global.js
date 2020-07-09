import React, { Component } from "react";
import {
  Alert,
  View,
  Platform,
  ToastAndroid,
  PixelRatio,
  Image,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
  BackHandler,
} from "react-native";
import Constant from "./Constant";
import {
  heightPercentageToDP as sh,
  widthPercentageToDP as sw,
} from "react-native-responsive-screen";
import dateFns from "date-fns";
import moment from "moment";
import "moment/locale/id";
import "moment/min/moment-with-locales";
import colors from "../styles/colors";
import { ROUTE_NAME } from "../config/Keys";
import NavigationServices from "../NavigationServices";

export default class Global {
  static istablet = false;
}

//validate email
export function validateEmail(text) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if(reg.test(text) === )
  return reg.test(text);
}

// validate phone
export function validatePhone(text) {
  const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return reg.test(text);
}
//--------------------------------------------------------------------------------------------
// HIDE COMPONENT OS
export function OS_SHOW() {
  if (Platform.OS == "android") {
    return true;
  } else if (Platform.OS == "ios") {
    return true;
  }
}
//callculate size responsive
export function convertWidth(params) {
  return sw(params);
}
export function convertHeight(params) {
  return sh(params);
}

export function deviceWidth() {
  return Dimensions.get("window").width;
}

export function deviceHeight() {
  return Dimensions.get("window").height;
}
//--------------------------------------------------------------------------------------------
//-ADD SPACE
export function addSpace(H) {
  //const { prevLatLng } = this.state;
  return <View style={{ height: convertHeight(H) }} />;
}
export function addSpaceW(W) {
  //const { prevLatLng } = this.state;
  return <View style={{ width: convertWidth(W) }} />;
}
//--------------------------------------------------------------------------------------------
export function loadingScreen(isTabHeader) {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: convertWidth(100),
        height: convertHeight(100),
        zIndex: 100,
        paddingBottom: isTabHeader ? 150 : 0,
      }}>
      <ActivityIndicator size="large" color={colors.LOADING_COLOR} />
    </View>
  );
}
//--------------------------------------------------------------------------------------------
//Check Latest Version
export function checkLatestVersion(serverver) {
  console.log("APP VERSION " + Number(Constant.APP_VERSION) + " , " + Number(serverver));
  if (Number(Constant.APP_VERSION) >= Number(serverver)) {
    return true;
  } else {
    return false;
  }
}
//--------------------------------------------------------------------------------------------
//get link apps
export function getLinkApp() {
  return Platform.OS == "android" ? Constant.GOOGLEPLAY_LINK : Constant.PLAYSTORE;
}
//--------------------------------------------------------------------------------------------
//SORT ARRAY OF OBJECT
export function targetSort(fields) {
  return function (a, b) {
    return fields
      .map(function (o) {
        var dir = 1;
        if (o[0] === "-") {
          dir = -1;
          o = o.substring(1);
        }
        if (a[o] > b[o]) return dir;
        if (a[o] < b[o]) return -dir;
        return 0;
      })
      .reduce(function firstNonZeroValue(p, n) {
        return p ? p : n;
      }, 0);
  };
}
//--------------------------------------------------------------------------------------------
//BACK HANDLE AND EXIT
export function handleBackButtonClick() {
  console.log("back");
  if (NavigationServices) {
    console.log("back", NavigationServices.getNavigatorRef());
    const lastIndex = NavigationServices.getNavigatorRef().state.nav.routes.length - 1;
    let routeName = NavigationServices.getNavigatorRef().state.nav.routes[lastIndex].routeName;
    console.log("current routename", routeName);
    if (routeName == ROUTE_NAME.TAB_SCREEN) {
      //Call Exit Alert
      Alert.alert(
        "",
        "Do you want to exit the application?",
        [
          { text: "Yes", onPress: () => BackHandler.exitApp(), style: "default" },
          { text: "No", onPress: () => console.log(""), style: "cancel" },
        ],
        {
          cancelable: false,
        }
      );
    } else if (routeName == ROUTE_NAME.LOGIN_SCREEN) {
      const lastChildIndex =
        NavigationServices.getNavigatorRef().state.nav.routes[lastIndex].routes.length - 1;
      let routeChildName = NavigationServices.getNavigatorRef().state.nav.routes[lastIndex].routes[
        lastChildIndex
      ].routeName;
      console.log("current child routename", routeChildName);
      if (routeChildName == "Register") {
        NavigationServices.goBack();
      } else {
        NavigationServices.navigateAndReset(ROUTE_NAME.TAB_SCREEN);
      }
    } else {
      console.log("current routename back");
      NavigationServices.goBack();
    }
  }
  // if (router.state.routeName == ROUTE_NAME.Screen_Apps) {
  //   Alert.alert(
  //     "",
  //     "Do you want to exit the application?",
  //     [
  //       { text: "Yes", onPress: () => BackHandler.exitApp(), style: "default" },
  //       { text: "No", onPress: () => console.log(""), style: "cancel" }
  //     ],
  //     {
  //       cancelable: false
  //     }
  //   );
  // } else {

  //   router.goBack();
  // }

  return true;
}
//--------------------------------------------------------------------------------------------

/**
 * Usage example:
 * alert(convertToRupiah(10000000)); -> "Rp. 10.000.000"
 */
export function convertToRupiah(angka, currency = "Rp ") {
  if (angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      currency +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  } else {
    return "";
  }
}

/**
 * Usage example:
 * alert(convertToAngka("Rp 10.000.123")); -> 10000123
 */
export function convertToAngka(rupiah) {
  if (rupiah) {
    return parseInt(rupiah.replace(/,.*|[^0-9]/g, ""), 10);
  } else {
    0;
  }
}
/**
 * Usage example:
 * alert(convertToAngka("Rp 10.000.123")); -> 10000123
 */
export function haveUpperCase(value) {
  if (value.length < 1) {
    return false;
  }
  let found = false;
  const isUpperCase = (string) => /^[A-Z]*$/.test(string);
  for (let index = 0; index < value.length; index++) {
    const element = value.charAt(index);
    if (isUpperCase(element) == true) {
      found = true;
      break;
    }
  }

  return found;
}

/**
 * Capitalize first string
 */
export function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
}

export function haveNumber(value) {
  if (value.length < 1) {
    return false;
  }
  let found = false;
  const isUpperCase = (string) => /^[0-9]*$/.test(string);
  for (let index = 0; index < value.length; index++) {
    const element = value.charAt(index);
    if (isUpperCase(element) == true) {
      found = true;
      break;
    }
  }

  return found;
}
export function onlyNumber(value) {
  if (value.length < 1) {
    return false;
  }
  let charNumberCount = 0;
  let found = false;
  const isNumber = (string) => /^[0-9]*$/.test(string);
  for (let index = 0; index < value.length; index++) {
    const element = value.charAt(index);
    if (isNumber(element) == true) {
      charNumberCount += 1;
    }
  }
  if (charNumberCount == value.length) {
    return true;
  } else {
    return false;
  }
}
// ---------------------------------------
/**
 * Hash Generator
 */
export function generateHash(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// youtube thumbnail generator
export const Youtube = (function () {
  var video, results;

  var getThumb = function (url, size) {
    if (url === null) {
      return "";
    }
    size = size === null ? "big" : size;
    results = url.match("[\\?&]v=([^&#]*)");
    video = results === null ? url : results[1];

    if (size === "small") {
      return "http://img.youtube.com/vi/" + video + "/2.jpg";
    }
    return "http://img.youtube.com/vi/" + video + "/0.jpg";
  };

  return {
    thumb: getThumb,
  };
})();

// youtube link validator
export const validateYouTubeUrl = (youtubeUrl) => {
  var url = youtubeUrl;
  if (url != undefined || url != "") {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      // valid
      return true;
    } else {
      // not valid
      return false;
    }
  }
};
//--------------------------------------------------------------------------------------------
