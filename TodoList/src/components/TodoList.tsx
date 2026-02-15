import React from "react";
import { View, TextInput, Pressable, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import { TodoItem } from "./TodoItem";
import { styles } from "./ToDoList.styles";
import { TodoFilter } from "../stores/todoStore";
import { useStores } from "../stores/StoreContext";

export const TodoList = observer(() => {
  const { todoStore } = useStores();

  // ✅ hydration check a render ELEJÉN
  if (!todoStore.hydrated) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Todos</Text>
        <Text style={styles.stats}>Betöltés…</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Todos</Text>

      <Text style={styles.stats}>
        Összes: {todoStore.totalCount} • Aktív: {todoStore.activeCount} • Kész:{" "}
        {todoStore.completedCount} • {todoStore.completionRate}%
      </Text>

      {/* Filter UI: csak setFilter hívás */}
      <View style={styles.filters}>
        {(["all", "active", "done"] as TodoFilter[]).map((f) => (
          <Pressable
            key={f}
            onPress={() => todoStore.setFilter(f)}
            style={[
              styles.filterBtn,
              todoStore.filter === f && styles.filterActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                todoStore.filter === f && styles.filterTextActive,
              ]}
            >
              {f === "all" ? "Összes" : f === "active" ? "Aktív" : "Kész"}
            </Text>
          </Pressable>
        ))}
      </View>

      {todoStore.completedCount > 0 && (
        <Pressable
          onPress={() => todoStore.clearCompleted()}
          style={styles.clearBtn}
        >
          <Text style={styles.clearText}>Kész feladatok törlése</Text>
        </Pressable>
      )}

      {/* Input: value + onChange store-ba, nincs useState */}
      <View style={styles.inputRow}>
        <TextInput
          value={todoStore.inputText}
          onChangeText={(t) => todoStore.setInputText(t)}
          placeholder="Új feladat…"
          style={styles.input}
        />

        {/* Add: store dönti el disabled */}
        <Pressable
          onPress={() => todoStore.addFromInput()}
          disabled={!todoStore.canAdd}
          style={({ pressed }) => [
            styles.addBtn,
            !todoStore.canAdd && { opacity: 0.4 },
            pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
          ]}
        >
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todoStore.filteredTodos.slice()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => item.toggle()} // ✅ OOP: Todo intézi magát
            onRemove={() => todoStore.removeTodo(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>{todoStore.emptyMessage}</Text>
        }
      />

      <Pressable
        onPress={() => todoStore.clearStorage()}
        style={styles.resetBtn}
      >
        <Text style={styles.resetText}>Összes adat törlése</Text>
      </Pressable>
    </View>
  );
});
