import React from "react";
import { View, TextInput } from "react-native";
import {
  FreeTextQuestionAnswerModel,
  FreeTextQuestionModel,
} from "../../../../../../models/question.models";
import { colors } from "../../../../../../theme/colors";
import { QuestionAnsweredRef } from "../../../../utils/interfaces";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import { style } from "./styles";
import { COMMON_STRINGS } from "../../../../../../strings/strings.common";

interface FreeTextQuestionProps {
  question: FreeTextQuestionModel;
  markQuestionAsCompleted: (question: FreeTextQuestionModel) => void;
  markQuestionAsNotCompleted: (question: FreeTextQuestionModel) => void;
}
const FreeTextQuestion = React.forwardRef<
  QuestionAnsweredRef,
  FreeTextQuestionProps
>(({ question, markQuestionAsCompleted, markQuestionAsNotCompleted }, ref) => {
  // A single answer is required, so use directly the answer
  // model for scaled choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<FreeTextQuestionAnswerModel>();

  // Used when the user taps the clear selection button
  const onClear = () => {
    setSelectedAnswer(undefined);
    markQuestionAsNotCompleted(question);
  };

  // Use imperative handling to update the source of truth in the parent
  React.useImperativeHandle(
    ref,
    () => ({
      selectedAnswer,
      question,
      clearAnswers: onClear,
      type: question.type,
    }),
    [selectedAnswer]
  );

  const onChangeText = (newText: string) => {
    // Update the state
    setSelectedAnswer(newText);
    // Mark the question as done or undone based on length
    if (newText.trim().length > 0) {
      markQuestionAsCompleted(question);
    } else {
      markQuestionAsNotCompleted(question);
    }
  };

  return (
    <View>
      <TextInput
        value={selectedAnswer}
        onChangeText={onChangeText}
        style={style.textInput}
        placeholder={COMMON_STRINGS.inputPlaceholder}
        placeholderTextColor={colors.text.secondary}
        blurOnSubmit={true}
        returnKeyType={"done"}
        multiline={true}
      />
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FreeTextQuestion;
