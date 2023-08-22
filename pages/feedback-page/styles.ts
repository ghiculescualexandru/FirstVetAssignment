import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../theme/spacing";

interface Style {
  listContentContainer: ViewStyle;
  loadingContainer: ViewStyle;
  loadingIndicator: ViewStyle;
  loadingText: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    listContentContainer: {
      paddingBottom: 100, // Add screen height here
    },
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    loadingIndicator: {
      marginTop: spacing.l,
    },
    loadingText: {
      marginTop: spacing.l,
      alignSelf: "center",
    },
  });
};

export const style = createStyleSheet();
