import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { QuestionModel, QuestionAnswered } from "../../models/question.models";
import { fetchFeedbackPageById } from "../../services/question.service";
import FeedbackQuestionWrapper from "./components/feedback-question-wrapper/FeedbackQuestionWrapper";
import { useFeedbackPageFooterState } from "./hooks/useFeedbackPageFooterState";
import { useFetchFeedbackPage } from "./hooks/useFetchFeedbackPage";

const FeedbackPage = ({ navigation }: { navigation: any }) => {
  const { questions, questionsAnswered } = useFetchFeedbackPage({ id: 1 });

  const {
    buttonState,
    updateButtonState,
    markQuestionAsDone,
    markQuestionAsUnDone,
  } = useFeedbackPageFooterState({ numberOfQuestions: questions.length });

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 300, // Add screen height here
      }}
      style={{}}
    >
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          console.log(JSON.stringify(questionsAnswered, null, 1));
        }}
      />
      {questions.map((question) => {
        return (
          <FeedbackQuestionWrapper
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            question={question}
            questionRef={questionsAnswered[question.questionId]}
          />
        );
      })}
    </ScrollView>
  );
};

export default FeedbackPage;
