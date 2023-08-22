import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import {
  QuestionModel,
  ScaledChoiceQuestionAnswerModel,
  ScaledChoiceQuestionModel,
  ScaledChoiceQuestionAnswered,
} from "../../../../../../models/question.models";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import { style } from "./styles";

interface FeedbackScaledQuestionProps {
  question: ScaledChoiceQuestionModel;
  markQuestionAsDone: (question: QuestionModel) => void;
  markQuestionAsUnDone: (question: QuestionModel) => void;
}
const FeedbackScaledQuestion = React.forwardRef<
  ScaledChoiceQuestionAnswered,
  FeedbackScaledQuestionProps
>(({ question, markQuestionAsDone, markQuestionAsUnDone }, ref) => {
  // A single answer is required, so use directly the answer
  // model for scaled choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<ScaledChoiceQuestionAnswerModel>();

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
      markQuestionAsDone(question);
    };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
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
