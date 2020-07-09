import React from "react";
import { View, Image } from "react-native";
import Constant from "../config/Constant";
import { convertHeight, convertWidth } from "../config/global";

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
      props.styles,
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
