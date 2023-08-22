import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import {
  SingleChoiceQuestionRef,
  SingleChoiceQuestionModel,
  SingleChoiceQuestionAnswerModel,
  QuestionModel,
} from "../../../../../../models/question.models";

interface FeedbackSingleChoiceQuestionProps {
  question: SingleChoiceQuestionModel;
  // [TOXO TO DO change question with type from above]
  markQuestionAsDone: (question: QuestionModel) => void;
  markQuestionAsUnDone: (question: QuestionModel) => void;
}
const FeedbackSingleChoiceQuestion = React.forwardRef<
  SingleChoiceQuestionRef,
  FeedbackSingleChoiceQuestionProps
>(({ question, markQuestionAsDone, markQuestionAsUnDone }, ref) => {
  // A single answer is required, so use directly the answer
  // model for single choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<SingleChoiceQuestionAnswerModel>();

  // Use imperative handling to update the source of truth in the parent
  React.useImperativeHandle(
    ref,
    () => ({
      selectedAnswer,
      question,
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
      markQuestionAsDone(question);
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

export default FeedbackSingleChoiceQuestion;
