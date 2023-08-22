import { QuestionType } from "../types/global.types";

/**
 * Base Question model.
 * All questions should have an id, a text and a type
 */
interface BaseQuestionModel<QType extends QuestionType> {
  questionId: number;
  questionText: string;
  type: QType;
}

/**
 * Base model for the answered question.
 * All answered questions should have the question, the selected answer
 * and their type
 */
interface BaseQuestionAnsweredModel<
  QModel,
  SAModel,
  QType extends QuestionType
> {
  question?: QModel;
  selectedAnswer?: SAModel;
  type: QType;
}

/**
 * Base model for a text answer.
 */
interface BaseTextAnswerModel {
  id: number;
  text: string;
}

/**
 * Models related to single choice question
 */
export type SingleChoiceQuestionAnswerModel = BaseTextAnswerModel;
export interface SingleChoiceQuestionModel
  extends BaseQuestionModel<"single-choice"> {
  answers: SingleChoiceQuestionAnswerModel[];
}
export interface SingleChoiceQuestionAnsweredModel
  extends BaseQuestionAnsweredModel<
    SingleChoiceQuestionModel,
    SingleChoiceQuestionAnswerModel,
    "single-choice"
  > {}

/**
 * Models related to multiplce choice question
 */
export type MultipleChoiceQuestionAnswerModel = BaseTextAnswerModel;
export interface MultipleChoiceQuestionModel
  extends BaseQuestionModel<"multiple-choice"> {
  answers: MultipleChoiceQuestionAnswerModel[];
}
export interface MultipleChoiceQuestionAnsweredModel
  extends BaseQuestionAnsweredModel<
    MultipleChoiceQuestionModel,
    MultipleChoiceQuestionAnswerModel[],
    "multiple-choice"
  > {}
{
}

/**
 * Models related to scaled choice question
 */
export type ScaledChoiceQuestionAnswerModel = number;
export interface ScaledChoiceQuestionModel
  extends BaseQuestionModel<"scaled-choice"> {
  answers: ScaledChoiceQuestionAnswerModel[];
}
export interface ScaledChoiceQuestionAnsweredModel
  extends BaseQuestionAnsweredModel<
    ScaledChoiceQuestionModel,
    ScaledChoiceQuestionAnswerModel,
    "scaled-choice"
  > {}

/**
 * Models related to free text question
 */
export type FreeTextQuestionAnswerModel = string;
export interface FreeTextQuestionModel extends BaseQuestionModel<"free-text"> {}
export interface FreeTextQuestionAnsweredModel
  extends BaseQuestionAnsweredModel<
    FreeTextQuestionModel,
    FreeTextQuestionAnswerModel,
    "free-text"
  > {}

/**
 * Models related to date choice question
 */
export type DateChoiceQuestionAnswerModel = string;
export interface DateChoiceQuestionModel
  extends BaseQuestionModel<"date-choice"> {}
export interface DateChoiceQuestionAnsweredModel
  extends BaseQuestionAnsweredModel<
    DateChoiceQuestionModel,
    DateChoiceQuestionAnswerModel,
    "date-choice"
  > {}

/**
 * Merged models
 */
export type QuestionModel =
  | SingleChoiceQuestionModel
  | MultipleChoiceQuestionModel
  | ScaledChoiceQuestionModel
  | FreeTextQuestionModel
  | DateChoiceQuestionModel;

export type QuestionAnsweredModel =
  | SingleChoiceQuestionAnsweredModel
  | MultipleChoiceQuestionAnsweredModel
  | ScaledChoiceQuestionAnsweredModel
  | FreeTextQuestionAnsweredModel
  | DateChoiceQuestionAnsweredModel;
