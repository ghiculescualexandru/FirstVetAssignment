import { QuestionType } from "../types/global.types";

/**
 * Base Question model for API
 */
interface BaseQuestionApiResponse<QType extends QuestionType> {
  question_id: number;
  question_text: string;
  type: QType;
}
/**
 * Models for API answers
 */
interface BaseTextAnswerApiResponse {
  id: number;
  text: string;
}
export type SingleChoiceQuestionAnswerApiResponse = BaseTextAnswerApiResponse;
export type MultipleChoiceQuestionAnswerApiResponse = BaseTextAnswerApiResponse;
export type ScaledChoiceQuestionAnswerApiResponse = number;
export type FreeTextQuestionAnswerApiResponse = string;

/**
 * Models related to API questions, with their type and response
 */
interface SingleChoiceQuestionApiResponse
  extends BaseQuestionApiResponse<"single-choice"> {
  answers: SingleChoiceQuestionAnswerApiResponse[];
}
interface MultipleChoiceQuestionApiResponse
  extends BaseQuestionApiResponse<"multiple-choice"> {
  answers: MultipleChoiceQuestionAnswerApiResponse[];
}

interface ScaledChoiceQuestionApiResponse
  extends BaseQuestionApiResponse<"scaled-choice"> {
  answers: ScaledChoiceQuestionAnswerApiResponse[];
}
interface FreeTextQuestionApiResponse
  extends BaseQuestionApiResponse<"free-text"> {}

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

/**
 * Model for an answer that will be send to server
 */
export interface FeedbackAnswerToApi {
  question_id: number;
  question_text: string;
  answers_texts: string;
}

/**
 * Model for the whole feedback response that will be send to server
 */
export interface FeedbackResponseToApi {
  id: number;
  answers: FeedbackAnswerToApi[];
}
