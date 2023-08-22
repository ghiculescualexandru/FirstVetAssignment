import { View } from "react-native";
import React from "react";
import {
  QuestionModel,
  QuestionRef,
  MultipleChoiceQuestionRef,
  ScaledChoiceQuestionRef,
  SingleChoiceQuestionRef,
  FreeTextQuestionRef,
} from "../../../../models/question.models";
import FeedbackMultipleChoiceQuestion from "./components/feedback-multiple-choice-question/FeedbackMultipleChoiceQuestion";
import FeedbackSingleChoiceQuestion from "./components/feedback-single-choice-question/FeedbackSingleChoiceQuestion";
import FeedbackScaledQuestion from "./components/feedback-scaled-question/FeedbackScaledQuestion";
import FreeTextQuestion from "./components/free-text-question/FreeTextQuestion";

interface FeedbackQuestionWrapperProps {
  question: QuestionModel;
  questionRef: React.RefObject<QuestionRef>;
  markQuestionAsDone: (question: QuestionModel) => void;
  markQuestionAsUnDone: (question: QuestionModel) => void;
}

const FeedbackQuestionWrapper = ({
  question,
  markQuestionAsDone,
  markQuestionAsUnDone,
  questionRef,
}: FeedbackQuestionWrapperProps) => {
  const questionComponent = React.useMemo(() => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <FeedbackMultipleChoiceQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            // [TODO] If I have time, let's find a way to avoid explicit typing here.
            ref={questionRef as React.ForwardedRef<MultipleChoiceQuestionRef>}
          />
        );
      case "single-choice":
        return (
          <FeedbackSingleChoiceQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef as React.ForwardedRef<SingleChoiceQuestionRef>}
          />
        );
      case "scaled-choice":
        return (
          <FeedbackScaledQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef as React.ForwardedRef<ScaledChoiceQuestionRef>}
          />
        );
      case "free-text":
        return (
          <FreeTextQuestion
            question={question}
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            ref={questionRef as React.ForwardedRef<FreeTextQuestionRef>}
          />
        );
      default:
        return null;
    }
  }, [question]);

  return (
    <View
      // key={extractedKey}
      style={{
        height: 100,
        width: "100%",
        marginVertical: 16,
        backgroundColor: "pink",
      }}
    >
      {questionComponent}
    </View>
  );
};

export default FeedbackQuestionWrapper;
