import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../theme/spacing";

interface Style {
  container: ViewStyle;
  buttonContainer: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      marginBottom: spacing.m,
    },
  });
};

export const style = createStyleSheet();
