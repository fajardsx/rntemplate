import { ModalScreen } from "../../containers/screen";
import React from "react";
import { LabelText } from "../../components/labelManager";
import { View, FlatList } from "react-native";
import Constant from "../../config/Constant";
import { convertHeight, convertWidth, addSpaceW, addSpace } from "../../config/global";
import { Buttons } from "../../components/button";
import colors from "../../styles/colors";
import Forminput from "../../components/Forminput";
import { AppStyle } from "../../styles/styles";

// TEXT CONTROLLER
const getTitleText = (props) => {
  switch (props.currentRole) {
    case Constant.ROLE_INLOGIN:
      return "Have Nice Day, " + props.name + "!";

    case Constant.ROLE_INSELECTSCHEDULE:
      return "Okay, " + props.name;

    case Constant.ROLE_ADDDOCTORAGAIN:
      return "Okay, " + props.name;

    case Constant.ROLE_READYSTARTSCHEDULE:
      return "Hi, " + props.name;
    case Constant.ROLE_YESTERDAY:
      return "Hi, " + props.name;
  }
};
const getSubTitleText = (props) => {
  switch (props.currentRole) {
    case Constant.ROLE_INLOGIN:
      return "Are your ready to start your day?";

    case Constant.ROLE_INSELECTSCHEDULE:
      return "Are you sure want to set your schedule?";

    case Constant.ROLE_ADDDOCTORAGAIN:
      return "Are you sure want to set your schedule?";

    case Constant.ROLE_READYSTARTSCHEDULE:
      return "Are you sure want finish for today?";
    case Constant.ROLE_YESTERDAY:
      return "This new day,Your yesterday plan is expired, let's Start New Day";
  }
};

export const ModalStart = (props) => (
  <ModalScreen isVisible={props.isVisible} onClose={() => props.onClose()}>
    <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
      <LabelText>{getTitleText(props.user)}</LabelText>
      <LabelText>{getSubTitleText(props.user)}</LabelText>
      {addSpace(2)}
      {props.dataList.length > 0 && (
        <FlatList
          style={{ width: "100%", height: 200, padding: 10 }}
          data={props.dataList}
          keyExtractor={(item, index) => {
            return "name" + index;
          }}
          renderItem={({ item, index }) => (
            <View style={{ width: "100%", justifyContent: "center", padding: 5 }}>
              <LabelText style={{ fontSize: 14, color: colors.COLOR_PRIMARY_4 }}>
                {item.name}
              </LabelText>
            </View>
          )}
        />
      )}
      {addSpace(2)}
      {props.user.currentRole != Constant.ROLE_YESTERDAY && (
        <View style={{ alignSelf: "center", flexDirection: "row", marginTop: convertHeight("2%") }}>
          <Buttons
            stylelabel={{
              fontSize: 14,
            }}
            style={{
              width: "30%",
              borderRadius: 50,
              height: 40,
              backgroundColor: colors.CANCEL_COLOR,
            }}
            label={"Cancel"}
            onPress={() => props.onClose()}
          />
          {addSpaceW(10)}
          <Buttons
            stylelabel={{
              fontSize: 14,
            }}
            style={{
              width: "30%",
              borderRadius: 50,
              height: 40,
              backgroundColor: colors.SUBMIT_COLOR,
            }}
            label={"Yes, Please"}
            onPress={() => props.onAccept()}
          />
        </View>
      )}
      {props.user.currentRole == Constant.ROLE_YESTERDAY && (
        <View style={{ alignSelf: "center", marginTop: convertHeight("2%") }}>
          <Buttons
            stylelabel={{
              fontSize: 14,
            }}
            style={{
              width: convertWidth(30),
              borderRadius: 50,
              height: 40,
              backgroundColor: colors.SUBMIT_COLOR,
            }}
            label={"Yes, Please"}
            onPress={() => props.onAccept()}
          />
        </View>
      )}
    </View>
  </ModalScreen>
);
export const ModalFeedBack = (props) => (
  <ModalScreen isVisible={props.isVisible} onClose={() => props.onClose()}>
    <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
      <LabelText>{`Hi, ${props.user.name}`}</LabelText>
      <LabelText>{"Please input your feedback soon..."}</LabelText>
      {addSpace(2)}
      <Forminput
        defaultText={""}
        multiline
        placeholderTextColor="#a8a8a8"
        placeholder={"please write your feedback"}
        keyboardtype={"default"}
        stylecontainer={[
          AppStyle.loginContainerdefault,
          { width: convertWidth(85), height: convertHeight(30), alignSelf: "center" },
        ]}
        onChangeText={(e) => props.onChangeTxt(e)}
      />
      <LabelText>{`Minimum feedback ${Constant.maxCharFeedback} character`}</LabelText>
      {addSpace(2)}
      <View style={{ alignSelf: "center", flexDirection: "row", marginTop: convertHeight("2%") }}>
        <Buttons
          stylelabel={{
            fontSize: 14,
          }}
          style={{
            width: "30%",
            borderRadius: 50,
            height: 40,
            backgroundColor: colors.SUBMIT_COLOR,
          }}
          label={"Submit"}
          onPress={() => props.onAccept()}
        />
      </View>
      <Buttons
        enableStick
        stylelabel={{
          fontSize: 21,
          color: colors.COLOR_TEXT_4,
        }}
        style={{
          width: "15%",
          borderRadius: 50,
          height: 30,
          top: 10,
          right: 10,
          backgroundColor: "transparent",
        }}
        label={"X"}
        onPress={() => props.onClose()}
      />
    </View>
  </ModalScreen>
);
