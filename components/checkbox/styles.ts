import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../theme/colors";
import { borderRadius } from "../../theme/borderRadius";

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
      fontSize: 12,
    },
    selectedContainer: {
      borderColor: colors.selection.selected,
      backgroundColor: colors.selection.selected,
    },
  });
};

export const style = createStyleSheet();
