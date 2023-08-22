import { QuestionAnsweredModel } from "../../../models/question.models";

export interface FeedbackQuestionForwardedRef {
  clearAnswers: () => void;
}

/**
 * Used for forwarding ref so we can update each
 * card component from the parent (the feedback page).
 */
export type QuestionAnsweredRef = QuestionAnsweredModel &
  FeedbackQuestionForwardedRef;
