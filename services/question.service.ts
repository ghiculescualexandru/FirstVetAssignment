import {
  FeedbackAnswerToApi,
  FeedbackPageApiResponse,
} from "../models/api.models";

export const fetchFeedbackPageById = async ({
  id,
}: {
  id: number;
}): Promise<FeedbackPageApiResponse> => {
  try {
    // Create the url for fetching
    const url = `http://127.0.0.1:3000/${id}`;
    // Fetch response
    const response = await fetch(url);
    // Get json from response
    const responseJSON = await response.json();
    // Parse the questions
    const questions = JSON.parse(responseJSON.questions);
    // Resolve the promise with the questions response
    return Promise.resolve({ questions: questions });
  } catch (err) {
    // Reject the promise with the error
    return Promise.reject(err);
  }
};

export const sendFeedbackAnswers = async ({
  id,
  answersToSend,
}: {
  id: number;
  answersToSend: FeedbackAnswerToApi[];
}) => {
  try {
    // Create the url for post
    const url = `http://127.0.0.1:3000/${id}`;
    // Make POST request with the data, at
    // the url by the form
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(answersToSend),
    });
    // Resolve the promise
    return Promise.resolve();
  } catch (err) {
    // Reject the promise with the error
    return Promise.reject(err);
  }
};
