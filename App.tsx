import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedbackPage from "./pages/feedback-page/FeedbackPage";
import HomePage from "./pages/home-page/HomePage";
import { RootStackParamList } from "./navigation/navigation.models";
import FeedbackRecapPage from "./pages/feedback-recap-page/FeedbackRecapPage";
import { PAGES_STRINGS } from "./strings/strings.pages";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: PAGES_STRINGS.titles["Home"] }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackPage}
          options={{ title: PAGES_STRINGS.titles["Feedback"] }}
        />
        <Stack.Screen
          name="FeedbackRecap"
          component={FeedbackRecapPage}
          options={{ title: PAGES_STRINGS.titles["FeedbackRecap"] }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
