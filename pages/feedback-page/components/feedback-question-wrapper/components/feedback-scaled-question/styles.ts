import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../../../../../theme/spacing";
import { colors } from "../../../../../../theme/colors";

const SCALE_CIRCLE_SIZE = 16;

interface Style {
  scaleContainer: ViewStyle;
  answerContainer: ViewStyle;
  scaleCircle: ViewStyle;
  selectedScaleCircle: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    scaleContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    answerContainer: {
      alignItems: "center",
      marginHorizontal: spacing.xs,
    },
    scaleCircle: {
      width: SCALE_CIRCLE_SIZE,
      height: SCALE_CIRCLE_SIZE,
      borderRadius: SCALE_CIRCLE_SIZE / 2,
      backgroundColor: colors.text.secondary,
      marginBottom: spacing.xs,
    },
    selectedScaleCircle: {
      backgroundColor: colors.selection.selected,
    },
  });
};

export const style = createStyleSheet();
