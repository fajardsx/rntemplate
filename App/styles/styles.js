import { StyleSheet } from "react-native";
import Constant from "../config/Constant";
import { convertWidth, convertHeight } from "../config/global";
import colors from "./colors";
export const AppStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.COLOR_PRIMARY_1,
    flex: 1
  },
  auth_container: {
    backgroundColor: colors.COLOR_PRIMARY_1,
    flex: 1
  },
  center_container: {
    justifyContent:'center',
    alignItems:'center'
  },
  dummyScreenTitle:{
    width:convertWidth(100),
    height:convertHeight(25),
    justifyContent:'center',
    alignItems:'center'
  }
});
