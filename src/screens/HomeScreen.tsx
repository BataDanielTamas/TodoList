import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import TodoList from "@/components/TodoList/index";
import { theme } from "@/styles/theme";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 16, paddingBottom: 28 },
});
