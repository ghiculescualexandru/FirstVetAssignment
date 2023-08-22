import { StyleSheet, TextStyle } from "react-native";
import { spacing } from "../../../../../../theme/spacing";
import { colors } from "../../../../../../theme/colors";
import { borderRadius } from "../../../../../../theme/borderRadius";

const INPUT_HEIGHT = 128;

interface Style {
  textInput: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    textInput: {
      color: colors.text.primary,
      borderRadius: borderRadius.small,
      borderWidth: 1,
      borderColor: colors.text.secondary,
      paddingTop: spacing.xs,
      paddingHorizontal: spacing.xs,
      paddingBottom: spacing.xs,
      height: INPUT_HEIGHT,
      textAlignVertical: "top",
      marginBottom: spacing.m,
    },
  });
};

export const style = createStyleSheet();
