import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { TodoList } from "../components/TodoList";
import { theme } from "../styles/theme";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]} // dummy elem, hogy legyen "body"
        keyExtractor={() => "home"}
        renderItem={() => <TodoList />}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 16, paddingBottom: 28 },
});
