import React, { Component } from "react";
import { Text, View } from "react-native";
import { PhotoProfil } from "./imagesManager";
import { LabelText } from "./labelManager";
import { TouchableHighlight } from "react-native";
import colors from "../styles/colors";

export const CellHome = (props) => {
  return (
    <TouchableHighlight onPress={() => props.onPress(props.item.id)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor:
            props.item.isSelect == true ? colors.TAB_ACTIVE_COLOR : colors.COLOR_PRIMARY_1,
        }}>
        <PhotoProfil />
        <LabelText style={{ textAlign: "center", width: 100 }}>{props.item.name}</LabelText>
        <LabelText style={{ textAlign: "center", width: 50 }}>
          {String(props.item.isSelect)}
        </LabelText>
      </View>
    </TouchableHighlight>
  );
};
