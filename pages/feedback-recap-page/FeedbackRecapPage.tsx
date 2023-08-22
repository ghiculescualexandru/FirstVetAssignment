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
import { ButtonStatus } from "../../types/global.types";
import { COMMON_STRINGS } from "../../strings/strings.common";

const FeedbackRecapPage = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "FeedbackRecap">) => {
  const { questionsAnswered, id } = route.params;

  const [buttonStatus, setButtonStatus] =
    React.useState<ButtonStatus>("enabled");

  const onFinish = () => {
    // Update button status to display loading in the footer
    setButtonStatus("loading");
    // Normalize data to send for api
    const answersToSend = normalizeQuestionsAnsweredToApi(questionsAnswered);
    // Send data to server
    QuestionService.sendFeedbackAnswers({
      id,
      answersToSend,
    })
      .then(() => {
        navigation.popToTop();
      })
      .catch(() => {
        setButtonStatus("enabled");
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
      case "date-choice":
        return item.selectedAnswer;
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
    <Text style={style.headerText}>{COMMON_STRINGS.finishInfo}</Text>
  );

  const listFooter = (
    <BaseButton
      containerStyle={style.buttonContainer}
      text={COMMON_STRINGS.finish}
      onPress={onFinish}
      status={buttonStatus}
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
