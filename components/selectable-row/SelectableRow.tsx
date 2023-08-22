import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
} from "react-native";
import RadioButton from "../radio-button/RadioButton";
import { style } from "./styles";
import Checkbox from "../checkbox/Checkbox";

interface SelectableRowProps {
  selectionType: "radio-button" | "checkbox";
  text: string;
  onPress: () => void;
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const SelectableRow = ({
  selectionType,
  text,
  onPress,
  selected,
  containerStyle,
}: SelectableRowProps) => {
  const { containerBySelected, selectionComponent } = React.useMemo(() => {
    return {
      containerBySelected: selected ? style.selectedContainer : undefined,
      selectionComponent:
        selectionType === "radio-button" ? (
          <RadioButton selected={selected} />
        ) : selectionType === "checkbox" ? (
          <Checkbox selected={selected} />
        ) : null,
    };
  }, [selected, selectionType]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[style.container, containerBySelected, containerStyle]}>
        {selectionComponent ? (
          <View style={style.selectionComponentContainer}>
            {selectionComponent}
          </View>
        ) : null}
        <Text>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectableRow;
