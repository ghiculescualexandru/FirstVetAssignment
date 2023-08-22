import { StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../../../../../../theme/spacing";

interface Style {
  datePicker: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    datePicker: {
      alignSelf: "center",
      marginBottom: spacing.s,
    },
  });
};

export const style = createStyleSheet();
