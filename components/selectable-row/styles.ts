import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { borderRadius } from "../../theme/borderRadius";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

interface Style {
  container: ViewStyle;
  selectedContainer: ViewStyle;
  selectionComponentContainer: ViewStyle;
  text: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: spacing.m,
      borderRadius: borderRadius.small,
      borderWidth: 1,
      borderColor: colors.selection.notSelected,
    },
    selectedContainer: {
      borderColor: colors.selection.selected,
    },
    selectionComponentContainer: {
      marginRight: spacing.xs,
    },
    text: {
      flex: 1,
    },
  });
};

export const style = createStyleSheet();
