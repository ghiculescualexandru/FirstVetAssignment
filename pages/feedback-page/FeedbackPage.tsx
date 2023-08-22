import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { QuestionModel } from "../../models/question.models";
import { RootStackParamList } from "../../navigation/navigation.models";
import FeedbackFooter from "./components/feedback-footer/FeedbackFooter";
import FeedbackQuestionWrapper from "./components/feedback-question-wrapper/FeedbackQuestionWrapper";
import { useFeedbackPageFooterState } from "./hooks/useFeedbackPageFooterState";
import { useFetchFeedbackPage } from "./hooks/useFetchFeedbackPage";
import { style } from "./styles";
import { COMMON_STRINGS } from "../../strings/strings.common";

const FeedbackPage = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Feedback">) => {
  const {
    questions,
    requestStatus,
    questionsAnswered,
    resetAnswers,
    getAnswersData,
  } = useFetchFeedbackPage({
    id: route.params.id,
  });

  const {
    buttonState,
    // updateButtonState,
    markQuestionAsDone,
    markQuestionAsUnDone,
  } = useFeedbackPageFooterState({ numberOfQuestions: questions.length });

  const onContinuePress = () => {
    const data = getAnswersData();
    console.log(data);
    navigation.navigate("FeedbackRecap", { answers: data });
  };

  const renderListItem = ({ item }: { item: QuestionModel }) => {
    return (
      <FeedbackQuestionWrapper
        markQuestionAsDone={markQuestionAsDone}
        markQuestionAsUnDone={markQuestionAsUnDone}
        question={item}
        questionRef={questionsAnswered[item.questionId]}
      />
    );
  };

  const listHeader = React.useMemo(() => {
    // Guard here, so we don't display the header
    // if something went wrong
    if (requestStatus !== "success" || questions.length === 0) {
      return null;
    }

    return <Text style={style.headerText}>{COMMON_STRINGS.start}</Text>;
  }, [requestStatus, questions]);

  const listEmpty = React.useMemo(() => {
    switch (requestStatus) {
      case "initial-loading":
      case "loading":
        return (
          <View style={style.loadingContainer}>
            <ActivityIndicator style={style.loadingIndicator} />
            <Text style={style.loadingText}>{COMMON_STRINGS.loading}</Text>
          </View>
        );
      case "success":
        return (
          <Text style={style.loadingText}>{COMMON_STRINGS.nothingToSee}</Text>
        );
      case "failure":
      default:
        return (
          <Text style={style.loadingText}>
            {COMMON_STRINGS.somethingWentWrong}
          </Text>
        );
    }
  }, [requestStatus]);

  const listFooter = React.useMemo(() => {
    // Guard here, so we don't display the footer
    // if something went wrong
    if (requestStatus !== "success" || questions.length === 0) {
      return null;
    }

    return (
      <FeedbackFooter
        state={buttonState}
        onContinuePress={onContinuePress}
        onResetPress={resetAnswers}
      />
    );
  }, [buttonState, requestStatus, questions]);

  return (
    <FlatList
      contentContainerStyle={style.listContentContainer}
      data={questions}
      renderItem={renderListItem}
      ListHeaderComponent={listHeader}
      ListFooterComponent={listFooter}
      ListEmptyComponent={listEmpty}
      automaticallyAdjustKeyboardInsets={true}
    />
  );
};

export default FeedbackPage;
