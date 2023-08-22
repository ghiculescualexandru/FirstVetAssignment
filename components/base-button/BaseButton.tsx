import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import { ButtonStatus } from "../../types/global.types";
import { style } from "./styles";

interface BaseButtonProps {
  onPress: () => void;
  text: string;
  status?: ButtonStatus;
  containerStyle?: StyleProp<ViewStyle>;
}

export const BaseButton = ({
  onPress,
  text,
  status = "enabled",
  containerStyle,
}: BaseButtonProps) => {
  const { containerByStatus, disabled, leftComponent } = React.useMemo(() => {
    return {
      containerByStatus:
        status === "disabled" || status === "loading"
          ? style.disabledContainer
          : undefined,
      disabled: status === "disabled" || status === "loading",
      leftComponent: status === "loading" ? <ActivityIndicator /> : null,
    };
  }, [status]);

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor={"transparent"}
    >
      <View style={[style.container, containerByStatus, containerStyle]}>
        {leftComponent ? (
          <View style={style.leftComponent}>{leftComponent}</View>
        ) : null}
        <Text style={style.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};
