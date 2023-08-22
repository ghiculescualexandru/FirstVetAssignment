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

interface FreeTextQuestionProps {
  question: FreeTextQuestionModel;
  markQuestionAsDone: (question: FreeTextQuestionModel) => void;
  markQuestionAsUnDone: (question: FreeTextQuestionModel) => void;
}
const FreeTextQuestion = React.forwardRef<
  QuestionAnsweredRef,
  FreeTextQuestionProps
>(({ question, markQuestionAsDone, markQuestionAsUnDone }, ref) => {
  // A single answer is required, so use directly the answer
  // model for scaled choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<FreeTextQuestionAnswerModel>();

  // Used when the user taps the clear selection button
  const onClear = () => {
    setSelectedAnswer(undefined);
    markQuestionAsUnDone(question);
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
      markQuestionAsDone(question);
    } else {
      markQuestionAsUnDone(question);
    }
  };

  return (
    <View>
      {/* [TODO TO DO] adauga in modele sa poti sa il lasi sau nu gol
      si sa il blocheze sau nu pe user daca nu il completeaza */}
      <TextInput
        value={selectedAnswer}
        onChangeText={onChangeText}
        style={style.textInput}
        placeholder={"Write here..."}
        placeholderTextColor={colors.text.secondary}
        blurOnSubmit={true}
        returnKeyType={"done"}
        onSubmitEditing={() => console.log("cv")}
        multiline={true}
      />
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FreeTextQuestion;
