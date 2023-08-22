import { QuestionAnswered } from "../../../models/question.models";

export interface FeedbackQuestionForwardedRef {
  clearAnswers: () => void;
}

export type AnsweredQuestionRef = QuestionAnswered &
  FeedbackQuestionForwardedRef;
