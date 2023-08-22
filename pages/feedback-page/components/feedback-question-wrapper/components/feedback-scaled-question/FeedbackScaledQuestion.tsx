import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import {
  QuestionModel,
  ScaledChoiceQuestionAnswerModel,
  ScaledChoiceQuestionModel,
  ScaledChoiceQuestionAnswered,
} from "../../../../../../models/question.models";

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

  const renderAnswer = ({
    answer,
  }: {
    answer: ScaledChoiceQuestionAnswerModel;
  }) => {
    // Mark as selected if the answer is
    // the same as the selected te answer
    const isSelected = answer === selectedAnswer;
    // On press, update the state and mark the question as done
    const onPress = () => {
      setSelectedAnswer(answer);
      markQuestionAsDone(question);
    };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={{ backgroundColor: isSelected ? "cyan" : undefined }}>
          {answer}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{}}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {question.answers.map((answer) => renderAnswer({ answer }))}
      </View>
    </View>
  );
});

export default FeedbackScaledQuestion;
