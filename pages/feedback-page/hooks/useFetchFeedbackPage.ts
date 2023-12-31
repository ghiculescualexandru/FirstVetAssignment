import React from "react";
import {
  QuestionModel,
  QuestionAnsweredModel,
} from "../../../models/question.models";
import { RequestStatus } from "../../../types/global.types";
import { normalizeQuestions } from "../../../utils/question.utils";
import { QuestionAnsweredRef } from "../utils/interfaces";
import * as QuestionService from "../../../services/question.service";

export const useFetchFeedbackPage = ({ id }: { id: number }) => {
  // The questions will be updated into a state, so that the page
  // rerenders and the question can be passed as props to the
  // qustion wrapper components
  const [results, setResults] = React.useState<{
    requestStatus: RequestStatus;
    questions: QuestionModel[];
  }>({
    requestStatus: "initial-loading",
    questions: [],
  });

  // This is the source of truth for the page, which will be passed as data
  // when making the API call for the response
  const questionsAnsweredRefs = React.useRef<
    Record<number, React.RefObject<QuestionAnsweredRef>>
  >({});

  // Main function which fetches all data for the page
  const fetchData = async () => {
    try {
      // Fetch the response for feedback page
      const response = await QuestionService.fetchFeedbackPageById({ id });
      // Parse the field from the response
      const questions = response.questions;
      // Normalize data
      const normalizedData: QuestionModel[] = normalizeQuestions(questions);
      // Create source of truth
      normalizedData.map((question) => {
        questionsAnsweredRefs.current[question.questionId] =
          React.createRef<QuestionAnsweredRef>();
      });
      // Update state
      setResults({
        requestStatus: "success",
        questions: normalizedData,
      });
    } catch (err) {
      // Update state
      setResults({
        requestStatus: "failure",
        questions: [],
      });
    }
  };

  // Used to reset the source of truth while
  // resetting each card answers at the same time
  const resetAnswers = () => {
    Object.values(questionsAnsweredRefs.current).forEach((questionAnswered) => {
      questionAnswered.current?.clearAnswers();
    });
  };

  // Returns the questions and selected answers from the local source of truth
  const getQuestionsAnsweredData = (): QuestionAnsweredModel[] => {
    return Object.values(questionsAnsweredRefs.current).map(
      (questionAnsweredRef) =>
        ({
          question: questionAnsweredRef.current?.question,
          selectedAnswer: questionAnsweredRef.current?.selectedAnswer,
          type: questionAnsweredRef.current?.type,
        } as QuestionAnsweredModel)
    );
  };

  // Make the API call when hook is called
  React.useEffect(() => {
    fetchData();
  }, []);

  return {
    questions: results.questions,
    requestStatus: results.requestStatus,
    questionsAnswered: questionsAnsweredRefs.current,
    resetAnswers,
    getQuestionsAnsweredData,
  };
};
