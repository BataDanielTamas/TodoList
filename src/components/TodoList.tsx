import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/StoreContext";
import { TodoItem } from "./TodoItem";
import { TodoFilter } from "../stores/todoStore";
import { theme } from "../styles/theme";

export const TodoList = observer(() => {
  const { todoStore } = useStores();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  // ✅ hydration ellenőrzés ITT legyen (render előtt), nem az add() függvényben
  if (!todoStore.hydrated) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Todos</Text>
        <Text style={styles.stats}>Betöltés…</Text>
      </View>
    );
  }

  const add = () => {
    if (busy) return;
    if (!text.trim()) return;

    setBusy(true);
    todoStore.addTodo(text);
    setText("");

    setTimeout(() => setBusy(false), 200);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Teendők</Text>

      <Text style={styles.stats}>
        Összes: {todoStore.totalCount} • Aktív: {todoStore.activeCount} • Kész:{" "}
        {todoStore.completedCount} • {todoStore.completionRate}%
      </Text>

      <View style={styles.filters}>
        {(["all", "active", "done"] as TodoFilter[]).map((f) => (
          <Pressable
            key={f}
            onPress={() => todoStore.setFilter(f)}
            style={[
              styles.filterBtn,
              todoStore.filter === f && styles.filterBtnActive,
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

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Új feladat…"
          placeholderTextColor="rgba(234,240,255,0.45)"
          selectionColor={theme.colors.primary2}
          style={styles.input}
        />

        <Pressable
          onPress={add}
          style={[
            styles.addBtn,
            (busy || !text.trim()) && styles.addBtnDisabled,
          ]}
          disabled={busy || !text.trim()}
        >
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      {/* ✅ CSAK EZ az egy lista renderel */}
      <FlatList
        data={todoStore.filteredTodos.slice()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => todoStore.toggleTodo(item.id)}
            onRemove={() => todoStore.removeTodo(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {todoStore.filter === "all"
              ? "Még nincs feladatod."
              : todoStore.filter === "active"
                ? "Nincs aktív feladat."
                : "Nincs kész feladat."}
          </Text>
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

const styles = StyleSheet.create({
  card: {
    marginTop: theme.space.lg,
    padding: theme.space.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.card,
    ...theme.shadow.card,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 6,
  },
  stats: {
    marginBottom: theme.space.sm,
    color: theme.colors.textMuted,
    fontWeight: "600",
  },

  filters: {
    flexDirection: "row",
    gap: theme.space.sm,
    marginBottom: theme.space.md,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: "transparent",
  },
  filterBtnActive: {
    backgroundColor: "rgba(124,92,252,0.18)",
    borderColor: "rgba(124,92,252,0.45)",
  },
  filterText: { fontWeight: "800", color: theme.colors.textMuted },
  filterTextActive: { color: theme.colors.text },

  inputRow: {
    flexDirection: "row",
    gap: theme.space.sm,
    marginBottom: theme.space.md,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    height: 44,
    color: theme.colors.text,
  },

  addBtn: {
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(124,92,252,0.55)",
    backgroundColor: "rgba(124,92,252,0.25)",
  },
  addText: { fontWeight: "900", color: theme.colors.text },
  addBtnDisabled: { opacity: 0.35 },

  clearBtn: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.inputBg,
    marginBottom: theme.space.md,
  },
  clearText: { fontWeight: "800", color: theme.colors.text },

  empty: {
    paddingVertical: 12,
    color: theme.colors.textMuted,
    fontWeight: "700",
  },

  resetBtn: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(255,77,109,0.55)",
    backgroundColor: "rgba(255,77,109,0.16)",
    marginTop: theme.space.md,
  },
  resetText: { fontWeight: "900", color: theme.colors.text },
});
