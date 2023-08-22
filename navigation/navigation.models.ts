import { QuestionAnsweredModel } from "../models/question.models";

export type RootStackParamList = {
  Home: undefined;
  Feedback: { id: number };
  FeedbackRecap: { questionsAnswered: QuestionAnsweredModel[] };
};
