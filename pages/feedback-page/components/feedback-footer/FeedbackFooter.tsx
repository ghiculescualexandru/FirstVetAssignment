import React from "react";
import { View } from "react-native";
import { BaseButton } from "../../../../components/base-button/BaseButton";
import { COMMON_STRINGS } from "../../../../strings/strings.common";
import { ButtonStatus } from "../../../../types/global.types";
import { style } from "./styles";

interface FeedbackFooterProps {
  state: ButtonStatus;
  onPress: () => void;
}

const FeedbackFooter = ({ state, onPress }: FeedbackFooterProps) => {
  return (
    <View style={style.container}>
      <BaseButton
        onPress={onPress}
        text={COMMON_STRINGS.continue}
        status={state}
      />
    </View>
  );
};

export default FeedbackFooter;
