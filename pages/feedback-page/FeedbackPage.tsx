import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { QuestionModel, QuestionRef } from "../../models/question.models";
import FeedbackQuestionWrapper from "./components/feedback-question-wrapper/FeedbackQuestionWrapper";
const FeedbackPage = ({ navigation }: { navigation: any }) => {
  // The questions will be updated into a state, so that the page
  // rerenders and the question can be passed as props to the
  // qustion wrapper components
  const [questions, setQuestions] = React.useState<QuestionModel[]>([]);

  // This is the source of truth for the page, which will be passed as data
  // when making the API call for the response
  const questionsRefs = React.useRef<
    Record<number, React.RefObject<QuestionRef>>
  >({});

  const markedAsDone = React.useRef<Record<number, boolean>>({});

  const markQuestionAsDone = (question: QuestionModel) => {
    if (markedAsDone.current[question.questionId]) {
      return;
    }

    markedAsDone.current[question.questionId] = true;

    if (Object.keys(markedAsDone.current).length === questions.length) {
      console.error("All done");
    }
  };

  const markQuestionAsUnDone = (question: QuestionModel) => {
    if (!markedAsDone.current[question.questionId]) {
      return;
    }

    delete markedAsDone.current[question.questionId];
    //  [...markedAsDone.current, question.questionId];
    if (Object.keys(markedAsDone.current).length < questions.length) {
      console.error("Not ready");
    }
  };

  const fetchData = async () => {
    // Fetch response
    const response = await fetch("http://127.0.0.1:3000/0");
    // Get json from response
    const responseJSON = await response.json();
    // Parse the field from the response
    const questions = JSON.parse(responseJSON.questions);
    // Normalize data
    const normalizedData: QuestionModel[] = questions.map(
      (apiQuestion: any) => {
        return {
          type: apiQuestion.type,
          questionId: apiQuestion.question_id,
          questionText: apiQuestion.question_text,
          answers:
            apiQuestion.type === "single-choice"
              ? apiQuestion.answers.map((apiAnswer: any) => {
                  return {
                    id: apiAnswer.id,
                    text: apiAnswer.text,
                  };
                })
              : apiQuestion.type === "multiple-choice"
              ? apiQuestion.answers.map((apiAnswer: any) => {
                  return {
                    id: apiAnswer.id,
                    text: apiAnswer.text,
                  };
                })
              : apiQuestion.type === "scaled-choice"
              ? apiQuestion.answers
              : [],
        };
      }
    );

    // Create source of truth
    normalizedData.map((question) => {
      questionsRefs.current[question.questionId] =
        React.createRef<QuestionRef>();
    });
    // Update state
    setQuestions(normalizedData);
  };

  // Make the API call when the navigation is finished
  React.useEffect(() => {
    fetchData();
  }, []);

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
          console.log(JSON.stringify(questionsRefs, null, 1));
        }}
      />
      {questions.map((question) => {
        return (
          <FeedbackQuestionWrapper
            markQuestionAsDone={markQuestionAsDone}
            markQuestionAsUnDone={markQuestionAsUnDone}
            question={question}
            questionRef={questionsRefs.current[question.questionId]}
          />
        );
      })}
    </ScrollView>
  );
};

export default FeedbackPage;
