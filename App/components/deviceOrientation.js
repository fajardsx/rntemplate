import { Dimensions } from "react-native";

export const isPortait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};
export const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};

const msp = (dim, limit) => {
  return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
};

const isTablet = () => {
  const dim = Dimensions.get("screen");
  return (dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900));
};

const isPhone = () => {
  return !isTablet();
};
