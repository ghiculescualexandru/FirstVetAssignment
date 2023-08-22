import React from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";
import { style } from "./styles";

const CHECK_ICON = "✓";

interface CheckboxProps {
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Checkbox = ({ selected, containerStyle }: CheckboxProps) => {
  return (
    <View
      style={[
        style.container,
        selected ? style.selectedContainer : undefined,
        containerStyle,
      ]}
    >
      {selected ? <Text style={style.checkIcon}>{CHECK_ICON}</Text> : null}
    </View>
  );
};

export default Checkbox;
