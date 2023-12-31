import React from "react";
import { QuestionModel } from "../../../models/question.models";
import { ButtonStatus } from "../../../types/global.types";

export const useFeedbackPageFooterState = ({
  numberOfQuestions,
}: {
  numberOfQuestions: number;
}) => {
  // Start with disabled because the user first needs to
  // complete the feedback form
  const [buttonState, setButtonState] =
    React.useState<ButtonStatus>("disabled");

  // Used to keep track of all question marked as done so
  // we can update the button state
  const completedQuestionsByIdRef = React.useRef<Record<number, boolean>>({});

  // Updates the button state with the new state
  const updateButtonState = (newState: ButtonStatus) => {
    setButtonState(newState);
  };

  // Marks a question as done, by id
  const markQuestionAsCompleted = (question: QuestionModel) => {
    if (completedQuestionsByIdRef.current[question.questionId]) {
      return;
    }
    // Mark the question as done
    completedQuestionsByIdRef.current[question.questionId] = true;
    // Update the button state if necessary
    if (
      Object.keys(completedQuestionsByIdRef.current).length ===
      numberOfQuestions
    ) {
      updateButtonState("enabled");
    }
  };

  // Marks a question as not done, by id
  const markQuestionAsNotCompleted = (question: QuestionModel) => {
    if (!completedQuestionsByIdRef.current[question.questionId]) {
      return;
    }
    // Remove the question from the record
    delete completedQuestionsByIdRef.current[question.questionId];
    // Update the button state if necessary
    if (
      Object.keys(completedQuestionsByIdRef.current).length < numberOfQuestions
    ) {
      updateButtonState("disabled");
    }
  };

  return {
    buttonState,
    updateButtonState,
    markQuestionAsCompleted,
    markQuestionAsNotCompleted,
  };
};
