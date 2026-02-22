import React from "react";
import { View, Text, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import { TodoItem as TodoItemModel } from "@/stores/todoItem";
import { t } from "@/i18n/i18n";
import { styles } from "./TodoItemJSS";

type Props = {
  todo: TodoItemModel;
  onRemove: () => void;
};

const TodoItem = observer(({ todo, onRemove }: Props) => (
  <View style={styles.row}>
    <Pressable onPress={todo.toggle} style={styles.titleWrap}>
      <Text style={[styles.title, todo.done && styles.done]}>{todo.title}</Text>
    </Pressable>
    <Pressable onPress={onRemove}>
      <Text style={styles.delete}>{t("todo.delete")}</Text>
    </Pressable>
  </View>
));

export default TodoItem;
