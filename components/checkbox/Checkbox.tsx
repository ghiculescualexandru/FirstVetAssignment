import React from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";
import { style } from "./styles";

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
      {/* [TODO] If i have time, add check SVG and use it here */}
      {selected ? <Text style={style.checkIcon}>{"✓"}</Text> : null}
    </View>
  );
};

export default Checkbox;
