import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../../../theme/colors";
import { spacing } from "../../../../theme/spacing";

interface Style {
  container: ViewStyle;
  resetButtonContainer: ViewStyle;
  resetButtonText: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      marginTop: spacing.l,
      alignItems: "center",
    },
    resetButtonContainer: {
      marginTop: spacing.m,
    },
    resetButtonText: {
      color: colors.text.secondary,
    },
  });
};

export const style = createStyleSheet();
