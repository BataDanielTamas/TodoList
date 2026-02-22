import React from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import todoStore from "@/stores/todoStore";
import { t } from "@/i18n/i18n";
import { styles } from "./TodoListJSS";
import TodoHeader from "./TodoHeader/TodoHeader";
import TodoFilters from "./TodoFilters/TodoFilters";
import TodoInput from "./TodoInput/TodoInput";
import TodoActions from "./TodoActions/TodoActions";
import TodoItem from "./TodoItem/TodoItem";

const TodoList = observer(() => {

  if (!todoStore.hydrated) {
    return (
      <View style={styles.card}>
        <Text style={styles.empty}>{t("app.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <TodoHeader />
      <TodoFilters />
      <TodoInput />
      <TodoActions />
      <FlatList
        data={todoStore.filteredTodos.slice()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onRemove={() => todoStore.removeTodo(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>{t(`todo.empty.${todoStore.filter}`)}</Text>
        }
      />
    </View>
  );
});

export default TodoList;
