import React from "react";
import { SafeAreaView } from "react-native";
import { TodoList } from "../components/TodoList";
import { theme } from "../styles/theme";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <TodoList />
    </SafeAreaView>
  );
};
