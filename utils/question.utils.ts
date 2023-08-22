import {
  FeedbackAnswerToApi,
  FeedbackResponseToApi,
  QuestionApiResponse,
} from "../models/api.models";
import {
  QuestionAnsweredModel,
  QuestionModel,
} from "../models/question.models";

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

export const normalizeQuestionsAnsweredToApi = (
  questionsAnswered: QuestionAnsweredModel[]
): FeedbackAnswerToApi[] => {
  return questionsAnswered.reduce((result, questionAnswered) => {
    if (questionAnswered.question && questionAnswered.selectedAnswer) {
      const newApiAnswer = {
        question_id: questionAnswered.question?.questionId,
        question_text: questionAnswered.question?.questionText,
        answers_texts: JSON.stringify(questionAnswered.selectedAnswer),
      };

      return [...result, newApiAnswer];
    }

    return result;
  }, [] as FeedbackAnswerToApi[]);
};
