import { QuestionApiResponse } from "../models/api.models";
import { QuestionModel } from "../models/question.models";

const normalizeQuestionAnswers = (question: QuestionApiResponse) => {
  switch (question.type) {
    case "single-choice":
      return question.answers.map((apiAnswer: any) => {
        return {
          id: apiAnswer.id,
          text: apiAnswer.text,
        };
      });
    case "multiple-choice":
      return question.answers.map((apiAnswer: any) => {
        return {
          id: apiAnswer.id,
          text: apiAnswer.text,
        };
      });
    case "scaled-choice":
      return question.answers;
    case "free-text":
    default:
      return [];
  }
};

const normalizeQuestion = (question: QuestionApiResponse): QuestionModel => {
  return {
    type: question.type,
    questionId: question.question_id,
    questionText: question.question_text,
    answers: normalizeQuestionAnswers(question) as [],
  };
};

export const normalizeQuestions = (
  questions: QuestionApiResponse[]
): QuestionModel[] => {
  return questions.map(normalizeQuestion);
};
