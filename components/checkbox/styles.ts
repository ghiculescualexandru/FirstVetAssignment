import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

const SIZE = 16;

interface Style {
  container: ViewStyle;
  selectedContainer: ViewStyle;
  checkIcon: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 4,
      borderWidth: 1,
      borderColor: colors.selection.notSelected,
    },
    checkIcon: {
      color: colors.text.inverted,
      fontSize: typography.size.extraSmall,
    },
    selectedContainer: {
      borderColor: colors.selection.selected,
      backgroundColor: colors.selection.selected,
    },
  });
};

export const style = createStyleSheet();
