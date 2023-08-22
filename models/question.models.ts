/**
 * Models related to single choice question
 */
export interface SingleChoiceQuestionAnswerModel {
  id: number;
  text: string;
}

export interface SingleChoiceQuestionModel {
  type: "single-choice";
  questionId: number;
  questionText: string;
  answers: SingleChoiceQuestionAnswerModel[];
}

export interface SingleChoiceQuestionRef {
  question?: SingleChoiceQuestionModel;
  selectedAnswer?: SingleChoiceQuestionAnswerModel;
}

/**
 * Models related to multiplce choice question
 */
export interface MultipleChoiceQuestionAnswerModel {
  id: number;
  text: string;
}

export interface MultipleChoiceQuestionModel {
  type: "multiple-choice";
  questionId: number;
  questionText: string;
  answers: MultipleChoiceQuestionAnswerModel[];
}

export interface MultipleChoiceQuestionRef {
  // [TODO TO DO] delete if unused
  question?: MultipleChoiceQuestionModel;
  selectedAnswers?: MultipleChoiceQuestionAnswerModel[];
}

/**
 * Models related to scaled choice question
 */
export type ScaledChoiceQuestionAnswerModel = number;

export interface ScaledChoiceQuestionModel {
  type: "scaled-choice";
  questionId: number;
  questionText: string;
  answers: ScaledChoiceQuestionAnswerModel[];
}

export interface ScaledChoiceQuestionRef {
  question?: ScaledChoiceQuestionModel;
  selectedAnswer?: ScaledChoiceQuestionAnswerModel;
}

/**
 * Models related to free text question
 */
export type FreeTextQuestionAnswerModel = string;

export interface FreeTextQuestionModel {
  type: "free-text";
  questionId: number;
  questionText: string;
}

export interface FreeTextQuestionRef {
  question?: FreeTextQuestionModel;
  selectedAnswer?: FreeTextQuestionAnswerModel;
}

/**
 * Merged models
 */
export type QuestionModel =
  | SingleChoiceQuestionModel
  | MultipleChoiceQuestionModel
  | ScaledChoiceQuestionModel
  | FreeTextQuestionModel;

// [TODO] move this and all refs to utils right in the page
// OR right on the question component
// also rename this to AnsweredQuestionModel
export type QuestionRef =
  | SingleChoiceQuestionRef
  | MultipleChoiceQuestionRef
  | ScaledChoiceQuestionRef
  | FreeTextQuestionRef;
