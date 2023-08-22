import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { BaseButton } from "../../components/base-button/BaseButton";
import { QuestionModel, QuestionAnswered } from "../../models/question.models";
import { RootStackParamList } from "../../navigation/navigation.models";
import { fetchFeedbackPageById } from "../../services/question.service";
import FeedbackFooter from "./components/feedback-footer/FeedbackFooter";
import FeedbackQuestionWrapper from "./components/feedback-question-wrapper/FeedbackQuestionWrapper";
import { useFeedbackPageFooterState } from "./hooks/useFeedbackPageFooterState";
import { useFetchFeedbackPage } from "./hooks/useFetchFeedbackPage";
import { style } from "./styles";

const FeedbackPage = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Feedback">) => {
  const { questions, questionsAnswered, resetAnswers } = useFetchFeedbackPage({
    id: route.params.id,
  });

  const {
    buttonState,
    // updateButtonState,
    markQuestionAsDone,
    markQuestionAsUnDone,
  } = useFeedbackPageFooterState({ numberOfQuestions: questions.length });

  return (
    <ScrollView
      contentContainerStyle={style.listContentContainer}
      automaticallyAdjustKeyboardInsets={true}
    >
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
        onContinuePress={() => {
          console.log(JSON.stringify(questionsAnswered, null, 1));
        }}
        onResetPress={resetAnswers}
      />
    </ScrollView>
  );
};

export default FeedbackPage;
