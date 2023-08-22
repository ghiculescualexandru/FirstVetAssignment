import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  listContentContainer: ViewStyle;
}

const createStyleSheet = () => {
  return StyleSheet.create<Style>({
    listContentContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 300, // Add screen height here
    },
  });
};

export const style = createStyleSheet();
