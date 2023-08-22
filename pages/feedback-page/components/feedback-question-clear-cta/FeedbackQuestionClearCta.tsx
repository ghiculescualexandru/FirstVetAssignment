import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { COMMON_STRINGS } from "../../../../strings/strings.common";
import { style } from "./styles";

const X_ICON = "X";

interface FeedbackQuestionClearCtaProps {
  onPress: () => void;
}

const FeedbackQuestionClearCta = ({
  onPress,
}: FeedbackQuestionClearCtaProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style.container}>
        <Text style={style.text}>{`${COMMON_STRINGS.clear} ${X_ICON}`}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FeedbackQuestionClearCta;
