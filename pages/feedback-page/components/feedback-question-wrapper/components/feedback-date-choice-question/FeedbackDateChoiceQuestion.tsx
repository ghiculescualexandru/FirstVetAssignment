import React from "react";
import { View } from "react-native";
import { QuestionAnsweredRef } from "../../../../utils/interfaces";
import FeedbackQuestionClearCta from "../../../feedback-question-clear-cta/FeedbackQuestionClearCta";
import { style } from "./styles";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  DateChoiceQuestionModel,
  DateChoiceQuestionAnswerModel,
} from "../../../../../../models/question.models";

interface FeedbackDateChoiceQuestionProps {
  question: DateChoiceQuestionModel;
  markQuestionAsCompleted: (question: DateChoiceQuestionModel) => void;
  markQuestionAsNotCompleted: (question: DateChoiceQuestionModel) => void;
}
const FeedbackDateChoiceQuestion = React.forwardRef<
  QuestionAnsweredRef,
  FeedbackDateChoiceQuestionProps
>(({ question, markQuestionAsCompleted, markQuestionAsNotCompleted }, ref) => {
  // Compute the current date only once
  const currentDate = React.useMemo(() => {
    return new Date();
  }, []);

  // A single answer is required, so use directly the answer
  // model for date choice question
  const [selectedAnswer, setSelectedAnswer] =
    React.useState<DateChoiceQuestionAnswerModel>(currentDate.toDateString());

  // Used when the user taps the clear selection button
  const onClear = () => {
    setSelectedAnswer(currentDate.toDateString());
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

  const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      markQuestionAsCompleted(question);
      setSelectedAnswer(date.toDateString());
    }
  };

  const dateTimePickerValue = React.useMemo(() => {
    return new Date(selectedAnswer);
  }, [selectedAnswer]);

  return (
    <View>
      <DateTimePicker
        minimumDate={currentDate}
        value={dateTimePickerValue}
        onChange={onDateChange}
        style={style.datePicker}
      />
      <FeedbackQuestionClearCta onPress={onClear} />
    </View>
  );
});

export default FeedbackDateChoiceQuestion;
