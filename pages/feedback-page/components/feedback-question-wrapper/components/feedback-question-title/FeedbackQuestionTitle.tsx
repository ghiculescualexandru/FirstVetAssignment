import React from "react";
import { View, Text } from "react-native";
import { style } from "./styles";

interface FeedbackQuestionTitleProps {
  title: string;
}

const FeedbackQuestionTitle = ({ title }: FeedbackQuestionTitleProps) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>{title}</Text>
    </View>
  );
};

export default FeedbackQuestionTitle;
