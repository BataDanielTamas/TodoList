import React from "react";
import { View, Text, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import { Todo } from "../stores/todoStore";
import { styles } from "./TodoItem.styles";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
};

export const TodoItem = observer(({ todo, onToggle, onRemove }: Props) => {
  return (
    <View style={styles.row}>
      {/* Bal oldal: kattintásra toggle */}
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.left,
          pressed && { opacity: 0.75, transform: [{ scale: 0.995 }] },
        ]}
      >
        <Text style={[styles.title, todo.isDone && styles.done]}>
          {todo.title}
        </Text>
      </Pressable>

      {/* Jobb oldal: törlés */}
      <Pressable
        onPress={onRemove}
        style={({ pressed }) => [
          styles.deleteBtn,
          pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },
        ]}
      >
        <Text style={styles.deleteText}>Törlés</Text>
      </Pressable>
    </View>
  );
});
