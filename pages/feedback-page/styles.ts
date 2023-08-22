import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

interface Style {
  listContentContainer: ViewStyle;
  loadingContainer: ViewStyle;
  loadingIndicator: ViewStyle;
  loadingText: TextStyle;
  headerText: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    listContentContainer: {
      paddingBottom: 100,
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
    headerText: {
      fontSize: typography.size.large,
      marginVertical: spacing.l,
      paddingHorizontal: spacing.l,
    },
  });
};

export const style = createStyleSheet();
