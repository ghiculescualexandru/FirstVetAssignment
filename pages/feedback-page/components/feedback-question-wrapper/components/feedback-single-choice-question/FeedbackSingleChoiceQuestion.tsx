import React from "react";
import { View } from "react-native";
import SelectableRow from "../../../../../../components/selectable-row/SelectableRow";
import {
  SingleChoiceQuestionModel,
  SingleChoiceQuestionAnswerModel,
  QuestionModel,
} from "../../../../../../models/question.models";
import { QuestionAnsweredRef } from "../../../../utils/interfaces";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import { style } from "./styles";

interface FeedbackSingleChoiceQuestionProps {
  question: SingleChoiceQuestionModel;
  markQuestionAsCompleted: (question: QuestionModel) => void;
  markQuestionAsNotCompleted: (question: QuestionModel) => void;
}
const FeedbackSingleChoiceQuestion = React.forwardRef<
  QuestionAnsweredRef,
  FeedbackSingleChoiceQuestionProps
>(({ question, markQuestionAsCompleted, markQuestionAsNotCompleted }, ref) => {
  // A single answer is required, so use directly the answer
  // model for single choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<SingleChoiceQuestionAnswerModel>();

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
    answer: SingleChoiceQuestionAnswerModel;
  }) => {
    // Mark as selected if the answer id matches
    // the selected answer id
    const isSelected = answer.id === selectedAnswer?.id;
    // On press, update the state and mark the question as done
    const onPress = () => {
      setSelectedAnswer(answer);
      markQuestionAsCompleted(question);
    };

    return (
      <View key={answer.id.toString()}>
        <SelectableRow
          text={answer.text}
          onPress={onPress}
          selected={isSelected}
          selectionType={"radio-button"}
          containerStyle={style.answerContainer}
        />
      </View>
    );
  };

  return (
    <View>
      {question.answers.map((answer) => renderAnswer({ answer }))}
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FeedbackSingleChoiceQuestion;
