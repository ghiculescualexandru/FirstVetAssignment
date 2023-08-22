import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../theme/colors";

interface Style {
  container: ViewStyle;
  disabledContainer: ViewStyle;
  text: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      width: 200,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: colors.button.background,
    },
    disabledContainer: {
      backgroundColor: colors.button.disabledBackground,
    },
    text: {
      color: colors.text.inverted,
      fontSize: 20,
    },
  });
};

export const style = createStyleSheet();
