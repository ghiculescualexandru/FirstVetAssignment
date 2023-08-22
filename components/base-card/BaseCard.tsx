import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import { style } from "./styles";

interface BaseCardProps {
  children?: JSX.Element | null;
  containerStyle?: StyleProp<ViewStyle>;
}

const BaseCard = ({ children, containerStyle }: BaseCardProps) => {
  return <View style={[style.container, containerStyle]}>{children}</View>;
};

export default BaseCard;
