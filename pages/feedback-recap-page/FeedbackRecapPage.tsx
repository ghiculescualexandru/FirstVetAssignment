import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { RootStackParamList } from "../../navigation/navigation.models";
import { style } from "./styles";
import {
  QuestionAnswered,
  MultipleChoiceQuestionAnswered,
  MultipleChoiceQuestionAnswerModel,
} from "../../models/question.models";
import BaseCard from "../../components/base-card/BaseCard";
import {
  FreeTextQuestionAnswerModel,
  ScaledChoiceQuestionAnswerModel,
  SingleChoiceQuestionAnswerModel,
} from "../../models/question.models";

const FeedbackRecapPage = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "FeedbackRecap">) => {
  const answers = route.params.answers;

  const getAnswerByQuestion = (item: QuestionAnswered) => {
    switch (item?.question?.type) {
      case "free-text":
        return (item.selectedAnswer as FreeTextQuestionAnswerModel) ?? "";
      case "multiple-choice":
        return (
          (item.selectedAnswer as MultipleChoiceQuestionAnswerModel[])?.[0]
            .text ?? ""
        );
      case "scaled-choice":
        return (
          item.selectedAnswer as ScaledChoiceQuestionAnswerModel
        ).toString();
      case "single-choice":
        return (item.selectedAnswer as SingleChoiceQuestionAnswerModel).text;
      default:
        return "";
    }
  };

  const renderListItem = ({ item }: { item: QuestionAnswered }) => {
    return (
      <BaseCard containerStyle={style.cardStyle}>
        <View>
          <Text style={style.questionText}>{item.question?.questionText}</Text>
          <Text>{getAnswerByQuestion(item)}</Text>
        </View>
      </BaseCard>
    );
  };

  return (
    <FlatList
      contentContainerStyle={style.listContentContainer}
      data={answers}
      renderItem={renderListItem}
    />
  );
};

export default FeedbackRecapPage;
