import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { spacing } from "../../../../theme/spacing";

interface Style {
  cardContainer: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    cardContainer: {
      paddingHorizontal: spacing.l,
      marginVertical: spacing.s,
      width: "100%",
    },
  });
};

export const style = createStyleSheet();
