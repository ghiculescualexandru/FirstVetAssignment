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

interface FeedbackQuestionWrapperProps {
  question: QuestionModel;
  questionRef: React.RefObject<QuestionAnsweredRef>;
  markQuestionAsDone: (question: QuestionModel) => void;
  markQuestionAsUnDone: (question: QuestionModel) => void;
}

const FeedbackQuestionWrapper = ({
  question,
  markQuestionAsDone,
  markQuestionAsUnDone,
  questionRef,
}: FeedbackQuestionWrapperProps) => {
  const answersComponent = React.useMemo(() => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <FeedbackMultipleChoiceQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef}
          />
        );
      case "single-choice":
        return (
          <FeedbackSingleChoiceQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef}
          />
        );
      case "scaled-choice":
        return (
          <FeedbackScaledQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef}
          />
        );
      case "free-text":
        return (
          <FreeTextQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
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

  return (
    <View style={style.cardContainer}>
      <BaseCard>{questionComponent}</BaseCard>
    </View>
  );
};

export default FeedbackQuestionWrapper;
