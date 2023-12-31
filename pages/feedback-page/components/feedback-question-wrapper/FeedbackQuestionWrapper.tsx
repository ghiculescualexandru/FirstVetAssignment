import { View } from "react-native";
import React from "react";
import { QuestionModel } from "../../../../models/question.models";
import FeedbackMultipleChoiceQuestion from "./components/feedback-multiple-choice-question/FeedbackMultipleChoiceQuestion";
import FeedbackSingleChoiceQuestion from "./components/feedback-single-choice-question/FeedbackSingleChoiceQuestion";
import FeedbackScaledQuestion from "./components/feedback-scaled-question/FeedbackScaledQuestion";
import FreeTextQuestion from "./components/free-text-question/FreeTextQuestion";
import BaseCard from "../../../../components/base-card/BaseCard";
import { style } from "./styles";
import FeedbackQuestionTitle from "../feedback-question-title/FeedbackQuestionTitle";
import { QuestionAnsweredRef } from "../../utils/interfaces";
import FeedbackDateChoiceQuestion from "./components/feedback-date-choice-question/FeedbackDateChoiceQuestion";

interface FeedbackQuestionWrapperProps {
  question: QuestionModel;
  questionRef: React.RefObject<QuestionAnsweredRef>;
  markQuestionAsCompleted: (question: QuestionModel) => void;
  markQuestionAsNotCompleted: (question: QuestionModel) => void;
}

const FeedbackQuestionWrapper = ({
  question,
  markQuestionAsCompleted,
  markQuestionAsNotCompleted,
  questionRef,
}: FeedbackQuestionWrapperProps) => {
  const answersComponent = React.useMemo(() => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <FeedbackMultipleChoiceQuestion
            question={question}
            markQuestionAsCompleted={markQuestionAsCompleted}
            markQuestionAsNotCompleted={markQuestionAsNotCompleted}
            ref={questionRef}
          />
        );
      case "single-choice":
        return (
          <FeedbackSingleChoiceQuestion
            question={question}
            markQuestionAsCompleted={markQuestionAsCompleted}
            markQuestionAsNotCompleted={markQuestionAsNotCompleted}
            ref={questionRef}
          />
        );
      case "scaled-choice":
        return (
          <FeedbackScaledQuestion
            question={question}
            markQuestionAsCompleted={markQuestionAsCompleted}
            markQuestionAsNotCompleted={markQuestionAsNotCompleted}
            ref={questionRef}
          />
        );
      case "free-text":
        return (
          <FreeTextQuestion
            question={question}
            markQuestionAsCompleted={markQuestionAsCompleted}
            markQuestionAsNotCompleted={markQuestionAsNotCompleted}
            ref={questionRef}
          />
        );
      case "date-choice":
        return (
          <FeedbackDateChoiceQuestion
            question={question}
            markQuestionAsCompleted={markQuestionAsCompleted}
            markQuestionAsNotCompleted={markQuestionAsNotCompleted}
            ref={questionRef}
          />
        );
      default:
        return null;
    }
  }, [question]);

  const questionComponent = (
    <View>
      <FeedbackQuestionTitle title={question.questionText} />
      {answersComponent}
    </View>
  );

  // If the answer component is not defined, do not display the card at all
  // eg: (if backend deployed a new type of question which frontend hasn't yet implemented)
  return answersComponent ? (
    <View style={style.cardContainer}>
      <BaseCard>{questionComponent}</BaseCard>
    </View>
  ) : null;
};

export default FeedbackQuestionWrapper;
