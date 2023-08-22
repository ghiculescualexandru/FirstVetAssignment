import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { RootStackParamList } from "../../navigation/navigation.models";
import { style } from "./styles";
import { QuestionAnsweredModel } from "../../models/question.models";
import BaseCard from "../../components/base-card/BaseCard";
import { BaseButton } from "../../components/base-button/BaseButton";

const FeedbackRecapPage = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "FeedbackRecap">) => {
  const answers = route.params.answers;

  const onFinish = () => {
    // [TODO] Send items to backend
    navigation.popToTop();
  };

  const getAnswerByQuestion = (item: QuestionAnsweredModel) => {
    switch (item.type) {
      case "free-text":
        return item.selectedAnswer ?? "";
      case "multiple-choice":
        return item.selectedAnswer?.map(
          (value, index) =>
            // Concatenate the checked symbol with the text and
            // add newline for all items, unless is the last item
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

  const listFooter = (
    <BaseButton
      containerStyle={style.buttonContainer}
      text={"Finish"}
      onPress={onFinish}
    />
  );

  return (
    <FlatList
      contentContainerStyle={style.listContentContainer}
      data={answers}
      renderItem={renderListItem}
      ListFooterComponent={listFooter}
    />
  );
};

export default FeedbackRecapPage;
