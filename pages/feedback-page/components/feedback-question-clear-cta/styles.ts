import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../../../theme/spacing";
import { typography } from "../../../../theme/typography";

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
      fontSize: typography.size.extraSmall,
    },
  });
};

export const style = createStyleSheet();
