import { View } from "react-native";
import React from "react";
import {
  QuestionModel,
  QuestionAnswered,
  MultipleChoiceQuestionAnswered,
  ScaledChoiceQuestionAnswered,
  SingleChoiceQuestionAnswered,
  FreeTextQuestionAnswered,
} from "../../../../models/question.models";
import FeedbackMultipleChoiceQuestion from "./components/feedback-multiple-choice-question/FeedbackMultipleChoiceQuestion";
import FeedbackSingleChoiceQuestion from "./components/feedback-single-choice-question/FeedbackSingleChoiceQuestion";
import FeedbackScaledQuestion from "./components/feedback-scaled-question/FeedbackScaledQuestion";
import FreeTextQuestion from "./components/free-text-question/FreeTextQuestion";
import BaseCard from "../../../../components/base-card/BaseCard";
import { style } from "./styles";
import FeedbackQuestionTitle from "./components/feedback-question-title/FeedbackQuestionTitle";

interface FeedbackQuestionWrapperProps {
  question: QuestionModel;
  questionRef: React.RefObject<QuestionAnswered>;
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
            // [TODO] If I have time, let's find a way to avoid explicit typing here.
            ref={
              questionRef as React.ForwardedRef<MultipleChoiceQuestionAnswered>
            }
          />
        );
      case "single-choice":
        return (
          <FeedbackSingleChoiceQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={
              questionRef as React.ForwardedRef<SingleChoiceQuestionAnswered>
            }
          />
        );
      case "scaled-choice":
        return (
          <FeedbackScaledQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={
              questionRef as React.ForwardedRef<ScaledChoiceQuestionAnswered>
            }
          />
        );
      case "free-text":
        return (
          <FreeTextQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef as React.ForwardedRef<FreeTextQuestionAnswered>}
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
