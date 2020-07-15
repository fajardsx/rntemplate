import React from "react";
import { View, Image } from "react-native";
import Constant from "../config/Constant";
import { convertHeight, convertWidth } from "../config/global";
import { LabelText } from "./labelManager";
import colors from "../styles/colors";

export const PhotoProfil = (props) => (
  <View
    style={[
      {
        width: convertWidth(20),
        height: convertWidth(20),
        borderRadius: 100,
        borderWidth: 0.5,
        overflow: "hidden",
      },
      props.style,
    ]}>
    <Image
      style={{
        width: "100%",
        height: "100%",
      }}
      resizeMode={"cover"}
      source={
        props.profilImg ? { uri: props.profilImg } : require("../assets/img/default_avatar.jpg")
      }
    />
  </View>
);

PhotoProfil.defaultProps = {
  profilImg: null,
};

export const PhotoParent = (props) => (
  <View
    style={[
      {
        width: convertWidth(20),
        height: convertWidth(20),
        borderRadius: 100,

        borderWidth: 0.5,
        overflow: "hidden",
      },
      props.style,
    ]}>
    {props.profilImg && (
      <Image
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode={"cover"}
        source={
          props.profilImg ? { uri: props.profilImg } : require("../assets/img/no-image-found.png")
        }
      />
    )}
    {props.profilImg == null && (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.COLOR_PRIMARY_3,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <LabelText style={{ color: colors.COLOR_TEXT_2, fontSize: 21, height: 30 }}>
          {props.textLogo}
        </LabelText>
      </View>
    )}
  </View>
);

PhotoParent.defaultProps = {
  profilImg: null,
};
