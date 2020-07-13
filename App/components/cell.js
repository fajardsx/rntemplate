import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { PhotoProfil } from "./imagesManager";
import { LabelText } from "./labelManager";
import { TouchableHighlight } from "react-native";
import colors from "../styles/colors";
import { convertWidth, addSpace } from "../config/global";

export const CellHome = (props) => {
  if (props.item.visitable == false) {
    return null;
  }
  return (
    <View
      style={{ paddingLeft: 10 }}
      //onPress={() => props.onPress({ parentid: props.parentId, id: props.item.id })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor:
            props.item.isSelect == true ? colors.TAB_ACTIVE_COLOR : colors.COLOR_PRIMARY_1,
        }}>
        <LabelText style={{ textAlign: "left", paddingLeft: 10 }}>{props.item.name}</LabelText>
      </View>
    </View>
  );
};
export const CellHomePlace = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: colors.COLOR_BUTTON_PERMISSION_ACTIVE,
          borderTopWidth: 1,
          padding: 10,
          backgroundColor:
            props.item.isSelect == true ? colors.TAB_ACTIVE_COLOR : colors.COLOR_PRIMARY_1,
        }}>
        <PhotoProfil
          style={{
            width: convertWidth(10),
            height: convertWidth(10),
          }}
        />
        <LabelText style={{ textAlign: "left", paddingHorizontal: 5 }}>{props.item.name}</LabelText>
        <LabelText
          style={{
            textAlign: "center",
            borderWidth: 1,
            paddingHorizontal: 5,
            fontSize: 14,
            borderRadius: 10,
          }}>{`${Math.ceil(props.item.range)} km`}</LabelText>
      </View>
      <FlatList
        data={props.item.doctors}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <CellHome parentId={props.item.id} item={item} onPress={props.onPress.bind(this)} />
          );
        }}
        keyExtractor={(item, index) => {
          return "cell" + index;
        }}
      />
      {addSpace(5)}
    </View>
  );
};
