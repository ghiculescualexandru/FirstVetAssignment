/**
 * Models for api answers
 */
export interface SingleChoiceQuestionAnswerApiResponse {
  id: number;
  text: string;
}
export interface MultipleChoiceQuestionAnswerApiResponse {
  id: number;
  text: string;
}
export type ScaledChoiceQuestionAnswerApiResponse = number;
export type FreeTextQuestionAnswerApiResponse = string;

/**
 * Models related to api questions, with their type and response
 */
interface SingleChoiceQuestionApiResponse {
  type: "single-choice";
  question_id: number;
  question_text: string;
  answers: SingleChoiceQuestionAnswerApiResponse[];
}

interface MultipleChoiceQuestionApiResponse {
  type: "multiple-choice";
  question_id: number;
  question_text: string;
  answers: MultipleChoiceQuestionAnswerApiResponse[];
}

interface ScaledChoiceQuestionApiResponse {
  type: "scaled-choice";
  question_id: number;
  question_text: string;
  answers: ScaledChoiceQuestionAnswerApiResponse[];
}

interface FreeTextQuestionApiResponse {
  type: "free-text";
  question_id: number;
  question_text: string;
}

/**
 * Merged model for question response from api
 */
export type QuestionApiResponse =
  | SingleChoiceQuestionApiResponse
  | MultipleChoiceQuestionApiResponse
  | ScaledChoiceQuestionApiResponse
  | FreeTextQuestionApiResponse;

/**
 * Model for the whole feedback page.
 * (for the moment, it only has the questions array)
 */
export interface FeedbackPageApiResponse {
  questions: QuestionApiResponse[];
}
