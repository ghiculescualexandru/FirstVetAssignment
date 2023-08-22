import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { borderRadius } from "../../theme/borderRadius";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

const BUTTON_SIZE = {
  width: 200,
  height: 36,
};

interface Style {
  container: ViewStyle;
  disabledContainer: ViewStyle;
  text: TextStyle;
  leftComponent: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      width: BUTTON_SIZE.width,
      height: BUTTON_SIZE.height,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: borderRadius.small,
      backgroundColor: colors.button.background,
    },
    disabledContainer: {
      backgroundColor: colors.button.disabledBackground,
    },
    text: {
      color: colors.text.inverted,
      fontSize: typography.size.medium,
    },
    leftComponent: {
      marginRight: spacing.xs,
    },
  });
};

export const style = createStyleSheet();
