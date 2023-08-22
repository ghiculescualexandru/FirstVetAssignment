import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { BaseButton } from "../../components/base-button/BaseButton";
import { RootStackParamList } from "../../navigation/navigation.models";
import { style } from "./styles";

const HomePage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  return (
    <View style={style.container}>
      <BaseButton
        text={"Go to form 1"}
        containerStyle={style.buttonContainer}
        onPress={() => {
          navigation.navigate("Feedback", {
            id: 0,
          });
        }}
      />
      <BaseButton
        text={"Go to form 2"}
        containerStyle={style.buttonContainer}
        onPress={() => {
          navigation.navigate("Feedback", {
            id: 1,
          });
        }}
      />
    </View>
  );
};

export default HomePage;
