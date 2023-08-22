import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { RootStackParamList } from "../../navigation/navigation.models";
import { style } from "./styles";
import { QuestionAnsweredModel } from "../../models/question.models";
import BaseCard from "../../components/base-card/BaseCard";
import { BaseButton } from "../../components/base-button/BaseButton";
import * as QuestionService from "../../services/question.service";
import { normalizeQuestionsAnsweredToApi } from "../../utils/question.utils";
import { RequestStatus } from "../../types/global.types";
import { COMMON_STRINGS } from "../../strings/strings.common";

const FeedbackRecapPage = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "FeedbackRecap">) => {
  const questionsAnswered = route.params.questionsAnswered;

  const [requestStatus, setRequestStatus] = React.useState<
    RequestStatus | undefined
  >(undefined);

  const onFinish = () => {
    // Update request status to display loading in the footer
    setRequestStatus("loading");
    // Normalize data to send for api
    const answersToSend = normalizeQuestionsAnsweredToApi(questionsAnswered);
    // Send data to server
    QuestionService.sendFeedbackAnswers({
      id: 0,
      answersToSend,
    })
      .then(() => {
        navigation.popToTop();
      })
      .catch(() => {
        setRequestStatus(undefined);
        Alert.alert("Something went wrong");
      });
  };

  const getAnswerByQuestion = (item: QuestionAnsweredModel) => {
    switch (item.type) {
      case "free-text":
        return item.selectedAnswer ?? "";
      case "multiple-choice":
        return item.selectedAnswer?.map(
          (value, index) =>
            // Concatenate the checked symbol with the text and
            // add newline for all items, unless is the last
            `✓ ${value.text} ${
              index !== (item.selectedAnswer?.length ?? 0) - 1 ? "\n" : ""
            }`
        );
      case "scaled-choice":
        return item.selectedAnswer?.toString();
      case "single-choice":
        return item.selectedAnswer?.text;
      default:
        return "";
    }
  };

  const renderListItem = ({ item }: { item: QuestionAnsweredModel }) => {
    return (
      <BaseCard containerStyle={style.cardStyle}>
        <View>
          <Text style={style.questionText}>{item.question?.questionText}</Text>
          <Text>{getAnswerByQuestion(item)}</Text>
        </View>
      </BaseCard>
    );
  };

  const listHeader = (
    <Text style={style.headerText}>{COMMON_STRINGS.finish}</Text>
  );

  const listFooter = (
    <BaseButton
      containerStyle={style.buttonContainer}
      text={"Finish"}
      onPress={onFinish}
      status={requestStatus === "loading" ? "loading" : "enabled"}
    />
  );

  return (
    <FlatList
      contentContainerStyle={style.listContentContainer}
      data={questionsAnswered}
      renderItem={renderListItem}
      ListHeaderComponent={listHeader}
      ListFooterComponent={listFooter}
    />
  );
};

export default FeedbackRecapPage;
