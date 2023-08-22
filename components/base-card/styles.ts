import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { borderRadius } from "../../theme/borderRadius";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

interface Style {
  container: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {
      width: "100%",
      justifyContent: "center",
      padding: spacing.m,
      borderRadius: borderRadius.small,
      backgroundColor: colors.surfaces.underground,
      borderWidth: 1,
      borderColor: colors.text.secondary,
    },
  });
};

export const style = createStyleSheet();
