import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../theme/spacing";

interface Style {
  container: ViewStyle;
  listContentContainer: ViewStyle;
  buttonContainer: ViewStyle;
  cardStyle: ViewStyle;
  questionText: TextStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    listContentContainer: {
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
      paddingBottom: 100,
    },
    buttonContainer: {
      marginVertical: spacing.m,
      alignSelf: "center",
    },
    cardStyle: {
      marginBottom: spacing.m,
    },
    questionText: {
      fontSize: 20,
      marginBottom: spacing.xs,
    },
  });
};

export const style = createStyleSheet();
