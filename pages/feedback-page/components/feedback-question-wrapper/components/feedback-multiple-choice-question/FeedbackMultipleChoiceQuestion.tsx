import React from "react";
import { View } from "react-native";
import { style } from "./styles";
import {
  MultipleChoiceQuestionModel,
  MultipleChoiceQuestionAnswerModel,
  QuestionModel,
} from "../../../../../../models/question.models";
import { QuestionAnsweredRef } from "../../../../utils/interfaces";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import SelectableRow from "../../../../../../components/selectable-row/SelectableRow";

interface FeedbackMultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionModel;
  markQuestionAsCompleted: (question: QuestionModel) => void;
  markQuestionAsNotCompleted: (question: QuestionModel) => void;
}
const FeedbackMultipleChoiceQuestion = React.forwardRef<
  QuestionAnsweredRef,
  FeedbackMultipleChoiceQuestionProps
>(({ question, markQuestionAsCompleted, markQuestionAsNotCompleted }, ref) => {
  // A single answer is required, so use directly the answer
  // model for single choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<MultipleChoiceQuestionAnswerModel[]>();

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
      clearAnswers: onClear,
      question,
      type: question.type,
    }),
    [selectedAnswer]
  );

  const renderAnswer = ({
    answer,
  }: {
    answer: MultipleChoiceQuestionAnswerModel;
  }) => {
    // Mark as selected if the answer id matches
    // the selected answer id
    const isSelected =
      selectedAnswer?.find((val) => val.id === answer.id) !== undefined;
    // On press, update the state
    const onPress = () => {
      if (isSelected) {
        // Filter the pressed response if selected
        setSelectedAnswer((prevSelectedAnswers) => {
          // Filter the response
          const filteredSelectedAnswers = prevSelectedAnswers?.filter(
            (prevSelectedAnswer) => prevSelectedAnswer.id !== answer.id
          );
          // Update the state with the array or undefined if necessary
          const newSelectedAnswers =
            filteredSelectedAnswers && filteredSelectedAnswers?.length > 0
              ? [...filteredSelectedAnswers]
              : undefined;
          // Mark the question as undone, it was the last question
          if (newSelectedAnswers === undefined) {
            markQuestionAsNotCompleted(question);
          }
          // Return the updated state
          return newSelectedAnswers;
        });
      } else {
        // Add the new response if not selected
        setSelectedAnswer((prevSelectedAnswers) => {
          // Mark the question as done
          markQuestionAsCompleted(question);
          // Return the updated state based on the previous one
          return prevSelectedAnswers
            ? [...prevSelectedAnswers, answer]
            : [answer];
        });
      }
    };

    return (
      <SelectableRow
        text={answer.text}
        onPress={onPress}
        selected={isSelected}
        selectionType={"checkbox"}
        containerStyle={style.answerContainer}
      />
    );
  };

  return (
    <View>
      {question.answers.map((answer) => renderAnswer({ answer }))}
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FeedbackMultipleChoiceQuestion;
