import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { Todo } from "../stores/todoStore";
import { theme } from "../styles/theme";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
};

export const TodoItem = observer(({ todo, onToggle, onRemove }: Props) => {
  return (
    <View style={styles.row}>
      <Pressable onPress={onToggle} style={styles.titleWrap}>
        <Text style={[styles.title, todo.done && styles.done]}>
          {todo.title}
        </Text>
      </Pressable>

      <Pressable onPress={onRemove}>
        <Text style={styles.delete}>✕</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  titleWrap: { flex: 1, paddingRight: 10 },
  title: { fontSize: 16, fontWeight: "800", color: theme.colors.text },
  done: { textDecorationLine: "line-through", opacity: 0.45 },
  delete: {
    color: theme.colors.danger,
    fontSize: 18,
    fontWeight: "900",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(255,77,109,0.45)",
    backgroundColor: "rgba(255,77,109,0.12)",
  },
});
