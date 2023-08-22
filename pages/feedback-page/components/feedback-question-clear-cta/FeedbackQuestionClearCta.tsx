import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { COMMON_STRINGS } from "../../../../strings/strings.common";
import { style } from "./styles";
import { colors } from "../../../../theme/colors";

const X_ICON = "X";

interface FeedbackQuestionClearCtaProps {
  onPress: () => void;
}

const FeedbackQuestionClearCta = ({
  onPress,
}: FeedbackQuestionClearCtaProps) => {
  return (
    <View style={style.container}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.transparent}>
        <Text style={style.text}>{`${COMMON_STRINGS.clear} ${X_ICON}`}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default FeedbackQuestionClearCta;
