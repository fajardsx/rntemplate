import { StyleSheet } from "react-native";
import Constant from "../config/Constant";
import { convertWidth, convertHeight } from "../config/global";
import colors from "./colors";
import { moderateScale } from "./scaling";
export const AppStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.COLOR_PRIMARY_1,
    flex: 1,
  },
  auth_container: {
    backgroundColor: colors.COLOR_PRIMARY_1,
    flex: 1,
  },
  center_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerdefault: {
    width: convertWidth(100),
    height: convertHeight(10),
    alignItems: "center",
    backgroundColor: colors.COLOR_PRIMARY_1,
  },
  buttondefault: {
    width: convertWidth(100),
    height: convertHeight(8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.COLOR_BUTTON_1,
  },
  buttonlabeldefault: {
    fontSize: moderateScale(17),
    color: colors.COLOR_BUTTON_LABEL_1,
  },
  loginContainerdefault: {
    flex: 0,
    //borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: colors.COLOR_BGINPUT_1,
    marginBottom: 5,
  },

  /// TEMPORARY
  dummyScreenTitle: {
    width: convertWidth(100),
    height: convertHeight(25),
    justifyContent: "center",
    alignItems: "center",
    fontSize: 21,
  },
});
