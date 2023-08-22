import React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { BaseButton } from "../../../../components/base-button/BaseButton";
import { COMMON_STRINGS } from "../../../../strings/strings.common";
import { colors } from "../../../../theme/colors";
import { ButtonStatus } from "../../../../types/global.types";
import { style } from "./styles";

interface FeedbackFooterProps {
  state: ButtonStatus;
  onContinuePress: () => void;
  onResetPress: () => void;
}

const FeedbackFooter = ({
  state,
  onContinuePress,
  onResetPress,
}: FeedbackFooterProps) => {
  const continueButton = (
    <BaseButton
      onPress={onContinuePress}
      text={COMMON_STRINGS.continue}
      status={state}
    />
  );

  const resetButton = (
    <TouchableHighlight
      onPress={onResetPress}
      style={style.resetButtonContainer}
      underlayColor={colors.transparent}
    >
      <Text style={style.resetButtonText}>{COMMON_STRINGS.reset}</Text>
    </TouchableHighlight>
  );

  return (
    <View style={style.container}>
      {continueButton}
      {resetButton}
    </View>
  );
};

export default FeedbackFooter;
