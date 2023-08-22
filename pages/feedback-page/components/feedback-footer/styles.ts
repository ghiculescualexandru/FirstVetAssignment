import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    container: {},
  });
};

export const style = createStyleSheet();
