import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { PhotoProfil, PhotoParent } from "./imagesManager";
import { LabelText } from "./labelManager";
import { TouchableHighlight } from "react-native";
import colors from "../styles/colors";
import { convertWidth, addSpace, addSpaceW, ReqRange } from "../config/global";
import Constant from "../config/Constant";
import { Buttons } from "./button";

export const CellHome = (props) => {
  //DISABLE CHILD CELL
  if (props.item.visitable == false) {
    return null;
  } else if (
    props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE &&
    props.item.schedule &&
    props.item.schedule.length == 0
  ) {
    return null;
  } else if (
    props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN &&
    props.item.schedule &&
    props.item.schedule.length > 0
  ) {
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
          backgroundColor: colors.COLOR_PRIMARY_1,
          justifyContent: "space-around",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center", minWidth: "40%" }}>
          {(props.user.currentRole == Constant.ROLE_INSELECTSCHEDULE ||
            props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN) &&
            props.disableSelect && (
              <Buttons
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  borderWidth: 1,
                  backgroundColor: props.item.isSelect ? colors.IS_SELECT : colors.IS_UNSELECT,
                }}
                onPress={() => props.onPress(props.item, !props.item.isSelect)}
              />
            )}
          {props.user.currentRole == Constant.ROLE_INSELECTSCHEDULE && addSpaceW(2)}
          <LabelText style={{ textAlign: "left", paddingLeft: 10 }}>{props.item.name}</LabelText>
        </View>
        {props.item.schedule.length > 0 && props.item.schedule[0].results == null && (
          <View style={{ flexDirection: "row", minWidth: "40%", alignItems: "center" }}>
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && (
              <Buttons
                style={{
                  width: convertWidth(30),
                  height: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  backgroundColor: colors.COLOR_PRIMARY_1,
                  alignItems: "center",
                }}
                label={"View Detail"}
                stylelabel={{ color: colors.COLOR_TEXT_1, fontSize: 14 }}
                //onPress={() => props.onPress(props.item, !props.item.isSelect)}
              />
            )}
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && addSpaceW(2)}
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && (
              <Buttons
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,

                  backgroundColor: colors.NOT_MEET,
                  alignItems: "center",
                }}
                label={"N/A"}
                stylelabel={{ color: colors.COLOR_TEXT_2, fontSize: 12 }}
                onPress={() => props.onPressNA(props.item)}
              />
            )}
          </View>
        )}
        {props.item.schedule.length > 0 && props.item.schedule[0].results && (
          <View
            style={{
              flexDirection: "row",
              minWidth: "40%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE &&
              props.item.schedule[0].results.feedback_sales == null && (
                <Buttons
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,

                    backgroundColor: colors.ADD_COMMENT_MEET,
                    alignItems: "center",
                  }}
                  label={"N/A"}
                  stylelabel={{ color: colors.COLOR_TEXT_2, fontSize: 12 }}
                  onPress={() => props.onPressNA(props.item)}
                />
              )}
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && addSpaceW(2)}
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && (
              <Buttons
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,

                  backgroundColor: colors.NOT_MEET,
                  alignItems: "center",
                }}
                label={"N/A"}
                stylelabel={{ color: colors.COLOR_TEXT_2, fontSize: 12 }}
                onPress={() => props.onPressNA(props.item)}
              />
            )}
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && addSpaceW(2)}
            {props.user.currentRole == Constant.ROLE_READYSTARTSCHEDULE && (
              <Buttons
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,

                  backgroundColor: colors.DISABLE_MEET,
                  alignItems: "center",
                }}
                label={"N/A"}
                stylelabel={{ color: colors.COLOR_TEXT_2, fontSize: 12 }}
                onPress={() => props.onPressNA(props.item)}
              />
            )}
          </View>
        )}
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
          backgroundColor: colors.COLOR_PRIMARY_1,
        }}>
        {(props.user.currentRole == Constant.ROLE_INSELECTSCHEDULE ||
          props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN) &&
          props.item.range && (
            <Buttons
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                borderWidth: 1,
                backgroundColor: props.item.isSelect ? colors.IS_SELECT : colors.IS_UNSELECT,
              }}
              onPress={() => props.onPress(props.item, !props.item.isSelect)}
            />
          )}
        {(props.user.currentRole == Constant.ROLE_INSELECTSCHEDULE ||
          props.user.currentRole == Constant.ROLE_ADDDOCTORAGAIN) &&
          addSpaceW(2)}
        <PhotoParent
          style={{
            width: convertWidth(10),
            height: convertWidth(10),
          }}
          profilImg={props.item.picture}
          textLogo={props.item.name.charAt(0)}
        />
        <LabelText style={{ textAlign: "left", paddingHorizontal: 5 }}>{props.item.name}</LabelText>
        <LabelText
          style={{
            textAlign: "center",
            borderWidth: 1,
            paddingHorizontal: 5,
            fontSize: 14,
            borderRadius: 10,
          }}>
          {props.item.range ? `${Math.ceil(props.item.range)} km` : `Location Not Available`}
        </LabelText>
      </View>
      <FlatList
        data={props.item.doctors}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <CellHome
              disableSelect={props.item.range}
              user={props.user}
              parentId={props.item.id}
              item={item}
              onPress={props.onPressChild.bind(this)}
              onPressNA={props.onPressNA.bind(this)}
            />
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
