import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
} from "react-native";
import { style } from "./styles";

interface RadioButtonProps {
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const RadioButton = ({ selected, containerStyle }: RadioButtonProps) => {
  return (
    <View
      style={[
        style.container,
        selected ? style.selectedContainer : undefined,
        containerStyle,
      ]}
    >
      {selected ? <View style={style.radioContainer} /> : null}
    </View>
  );
};

export default RadioButton;
