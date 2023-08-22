import React from "react";
import { View } from "react-native";
import { style } from "./styles";

interface BaseCardProps {
  children?: JSX.Element | null;
}

const BaseCard = ({ children }: BaseCardProps) => {
  return <View style={style.container}>{children}</View>;
};

export default BaseCard;
