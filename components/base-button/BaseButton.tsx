import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { ButtonStatus } from "../../types/global.types";
import { style } from "./styles";

interface BaseButtonProps {
  onPress: () => void;
  text: string;
  status?: ButtonStatus;
}

export const BaseButton = ({
  onPress,
  text,
  status = "enabled",
}: BaseButtonProps) => {
  const { containerByStatus, disabled } = React.useMemo(() => {
    return {
      containerByStatus:
        status === "disabled" || status === "loading"
          ? style.disabledContainer
          : undefined,
      disabled: status === "disabled" || status === "loading",
    };
  }, [status]);

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor={"transparent"}
    >
      <View style={[style.container, containerByStatus]}>
        <Text style={style.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};
