import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../../../../../theme/spacing";

interface Style {
  answerContainer: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    answerContainer: {
      marginBottom: spacing.s,
    },
  });
};

export const style = createStyleSheet();
