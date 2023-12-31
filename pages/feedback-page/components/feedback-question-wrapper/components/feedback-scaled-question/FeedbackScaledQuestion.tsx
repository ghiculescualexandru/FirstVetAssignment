import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import {
  QuestionModel,
  ScaledChoiceQuestionAnswerModel,
  ScaledChoiceQuestionModel,
} from "../../../../../../models/question.models";
import { QuestionAnsweredRef } from "../../../../utils/interfaces";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import { style } from "./styles";

interface FeedbackScaledQuestionProps {
  question: ScaledChoiceQuestionModel;
  markQuestionAsCompleted: (question: QuestionModel) => void;
  markQuestionAsNotCompleted: (question: QuestionModel) => void;
}
const FeedbackScaledQuestion = React.forwardRef<
  QuestionAnsweredRef,
  FeedbackScaledQuestionProps
>(({ question, markQuestionAsCompleted, markQuestionAsNotCompleted }, ref) => {
  // A single answer is required, so use directly the answer
  // model for scaled choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<ScaledChoiceQuestionAnswerModel>();

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

  const renderAnswer = ({
    answer,
  }: {
    answer: ScaledChoiceQuestionAnswerModel;
  }) => {
    // Mark as selected if the answer is
    // the same as the selected te answer
    const isSelected = selectedAnswer ? answer <= selectedAnswer : false;
    // On press, update the state and mark the question as done
    const onPress = () => {
      setSelectedAnswer(answer);
      markQuestionAsCompleted(question);
    };

    return (
      <TouchableWithoutFeedback onPress={onPress} key={answer.toString()}>
        <View style={style.answerContainer}>
          <View
            style={[
              style.scaleCircle,
              isSelected ? style.selectedScaleCircle : undefined,
            ]}
          />
          <Text>{answer}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <View style={style.scaleContainer}>
        {question.answers.map((answer) => renderAnswer({ answer }))}
      </View>
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FeedbackScaledQuestion;
