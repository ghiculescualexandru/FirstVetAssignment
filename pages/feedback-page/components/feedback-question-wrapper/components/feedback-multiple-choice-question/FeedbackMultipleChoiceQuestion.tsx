import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import {
  MultipleChoiceQuestionRef,
  MultipleChoiceQuestionModel,
  MultipleChoiceQuestionAnswerModel,
  QuestionModel,
} from "../../../../../../models/question.models";

interface FeedbackMultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionModel;
  markQuestionAsDone: (question: QuestionModel) => void;
  markQuestionAsUnDone: (question: QuestionModel) => void;
}
const FeedbackMultipleChoiceQuestion = React.forwardRef<
  MultipleChoiceQuestionRef,
  FeedbackMultipleChoiceQuestionProps
>(({ question, markQuestionAsDone, markQuestionAsUnDone }, ref) => {
  // A single answer is required, so use directly the answer
  // model for single choice question
  const [selectedAnswers, setSelectedAnswers] =
    React.useState<MultipleChoiceQuestionAnswerModel[]>();

  // Use imperative handling to update the source of truth in the parent
  React.useImperativeHandle(
    ref,
    () => ({
      selectedAnswers,
      question,
    }),
    [selectedAnswers]
  );

  const renderAnswer = ({
    answer,
  }: {
    answer: MultipleChoiceQuestionAnswerModel;
  }) => {
    // Mark as selected if the answer id matches
    // the selected answer id
    const isSelected = selectedAnswers?.find((val) => val.id === answer.id);
    // On press, update the state
    const onPress = () => {
      if (isSelected) {
        // Filter the pressed response if selected
        setSelectedAnswers((prevSelectedAnswers) => {
          // Filter the response
          const filteredSelectedAnswers = prevSelectedAnswers?.filter(
            (prevSelectedAnswer) => prevSelectedAnswer.id !== answer.id
          );
          // Update the state with the array or undefined if necessary
          const newSelectedAnswers =
            filteredSelectedAnswers && filteredSelectedAnswers?.length > 0
              ? [...filteredSelectedAnswers]
              : undefined;
          // Mark the question as undone
          if (
            newSelectedAnswers === undefined ||
            newSelectedAnswers.length === 0
          ) {
            markQuestionAsUnDone(question);
          }

          return newSelectedAnswers;
        });
      } else {
        // Add the new response if not selected
        setSelectedAnswers((prevSelectedAnswers) => {
          // Mark the question as done
          markQuestionAsDone(question);

          return prevSelectedAnswers
            ? [...prevSelectedAnswers, answer]
            : [answer];
        });
      }
    };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={{ backgroundColor: isSelected ? "cyan" : undefined }}>
          {answer.text}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{}}>
      <Text>{question.questionText}</Text>
      {question.answers.map((answer) => renderAnswer({ answer }))}
    </View>
  );
});

export default FeedbackMultipleChoiceQuestion;
