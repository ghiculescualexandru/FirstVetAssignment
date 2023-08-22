import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../../../theme/spacing";

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      alignItems: "flex-end",
      paddingHorizontal: spacing.xs,
    },
    text: {
      fontSize: 12,
    },
  });
};

export const style = createStyleSheet();
