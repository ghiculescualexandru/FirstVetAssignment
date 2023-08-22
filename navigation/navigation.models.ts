import { QuestionAnswered } from "../models/question.models";

export type RootStackParamList = {
  Home: undefined;
  Feedback: { id: number };
  FeedbackRecap: { answers: QuestionAnswered[] };
};
