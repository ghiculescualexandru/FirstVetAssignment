import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedbackPage from "./pages/feedback-page/FeedbackPage";
import HomePage from "./pages/home-page/HomePage";
import { RootStackParamList } from "./navigation/navigation.models";
import FeedbackRecapPage from "./pages/feedback-recap-page/FeedbackRecapPage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Feedback" component={FeedbackPage} />
        <Stack.Screen name="FeedbackRecap" component={FeedbackRecapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
