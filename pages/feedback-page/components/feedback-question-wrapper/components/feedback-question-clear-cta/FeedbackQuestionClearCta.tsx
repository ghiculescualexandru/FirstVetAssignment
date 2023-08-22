import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { COMMON_STRINGS } from "../../../../../../strings/strings.common";
import { style } from "./styles";

interface FeedbackQuestionClearCtaProps {
  onPress: () => void;
}

const FeedbackQuestionClearCta = ({
  onPress,
}: FeedbackQuestionClearCtaProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style.container}>
        {/* [TODO] If i have time, add a SVG for the X icon */}
        <Text style={style.text}>{COMMON_STRINGS.clear + " " + "X"}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FeedbackQuestionClearCta;
