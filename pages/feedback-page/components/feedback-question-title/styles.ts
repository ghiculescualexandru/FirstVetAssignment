import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../../../theme/colors";
import { spacing } from "../../../../theme/spacing";
import { typography } from "../../../../theme/typography";

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      marginBottom: spacing.m,
    },
    text: {
      color: colors.text.primary,
      fontSize: typography.size.medium,
    },
  });
};

export const style = createStyleSheet();
