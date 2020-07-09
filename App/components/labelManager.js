import React from "react";
import { View, Image, Text } from "react-native";
import Constant from "../config/Constant";
import { convertHeight, convertWidth } from "../config/global";

export const LabelText = (props) => (
  <Text style={[{ fontSize: 16, fontWeight: "normal" }, props.style]}>
    {props.text || props.children}
  </Text>
);
