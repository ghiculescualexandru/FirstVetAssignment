import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { BaseButton } from "../../components/base-button/BaseButton";
import { QuestionModel, QuestionAnswered } from "../../models/question.models";
import { fetchFeedbackPageById } from "../../services/question.service";
import FeedbackFooter from "./components/feedback-footer/FeedbackFooter";
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
      {/* [TODO] If i have time, change this to flat list */}
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
      <FeedbackFooter
        state={buttonState}
        onPress={() => {
          console.log(JSON.stringify(questionsAnswered, null, 1));
        }}
      />
    </ScrollView>
  );
};

export default FeedbackPage;
