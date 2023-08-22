import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { borderRadius } from "../../theme/borderRadius";
import { colors } from "../../theme/colors";

const BUTTON_SIZE = {
  width: 200,
  height: 36,
};

interface Style {
  container: ViewStyle;
  disabledContainer: ViewStyle;
  text: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      width: BUTTON_SIZE.width,
      height: BUTTON_SIZE.height,
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
      fontSize: 20,
    },
  });
};

export const style = createStyleSheet();
