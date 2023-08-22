import React from "react";
import { View, Text, TextInput } from "react-native";
import {
  FreeTextQuestionAnswerModel,
  FreeTextQuestionModel,
  FreeTextQuestionAnswered,
} from "../../../../../../models/question.models";
import { colors } from "../../../../../../theme/colors";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import { style } from "./styles";

interface FreeTextQuestionProps {
  question: FreeTextQuestionModel;
  markQuestionAsDone: (question: FreeTextQuestionModel) => void;
  markQuestionAsUnDone: (question: FreeTextQuestionModel) => void;
}
const FreeTextQuestion = React.forwardRef<
  FreeTextQuestionAnswered,
  FreeTextQuestionProps
>(({ question, markQuestionAsDone, markQuestionAsUnDone }, ref) => {
  // A single answer is required, so use directly the answer
  // model for scaled choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<FreeTextQuestionAnswerModel>();

  // Use imperative handling to update the source of truth in the parent
  React.useImperativeHandle(
    ref,
    () => ({
      selectedAnswer,
      question,
    }),
    [selectedAnswer]
  );

  // Used when the user taps the clear selection button
  const onClear = () => {
    setSelectedAnswer(undefined);
    markQuestionAsUnDone(question);
  };

  const onChangeText = (newText: string) => {
    // Update the state
    setSelectedAnswer(newText);
    // Mark the question as done or undone based on length
    if (newText.trim().length > 0) {
      markQuestionAsDone(question);
    } else {
      markQuestionAsUnDone(question);
    }
  };

  return (
    <View>
      {/* [TODO TO DO] adauga in modele sa poti sa il lasi sau nu gol
      si sa il blocheze sau nu pe user daca nu il completeaza */}
      {/* [TODO] If I have time, handle list when keyboard occurs */}
      <TextInput
        value={selectedAnswer}
        onChangeText={onChangeText}
        style={style.textInput}
        placeholder={"Write here..."}
        placeholderTextColor={colors.text.secondary}
        blurOnSubmit={false}
        returnKeyType={"done"}
        multiline={true}
      />
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FreeTextQuestion;
