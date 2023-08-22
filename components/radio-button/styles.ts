import { StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../theme/colors";

const SIZE = 16;
const RADIO_SIZE = SIZE / 1.5;

interface Style {
  container: ViewStyle;
  radioContainer: ViewStyle;
  selectedContainer: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      borderWidth: 1,
      borderColor: colors.selection.notSelected,
    },
    radioContainer: {
      width: RADIO_SIZE,
      height: RADIO_SIZE,
      borderRadius: RADIO_SIZE,
      backgroundColor: colors.selection.selected,
    },
    selectedContainer: {
      borderColor: colors.selection.selected,
    },
  });
};

export const style = createStyleSheet();
