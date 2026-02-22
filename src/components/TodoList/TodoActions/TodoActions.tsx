import React from "react";
import { Pressable, Text } from "react-native";
import { observer } from "mobx-react-lite";
import todoStore from "@/stores/todoStore";
import { t } from "@/i18n/i18n";
import { styles } from "./TodoActionsJSS";

const TodoActions = observer(() => {
  return (
    <>
      {todoStore.completedCount > 0 && (
        <Pressable onPress={todoStore.clearCompleted} style={styles.clearBtn}>
          <Text style={styles.clearText}>{t("todo.clearCompleted")}</Text>
        </Pressable>
      )}
      <Pressable onPress={todoStore.clearStorage} style={styles.resetBtn}>
        <Text style={styles.resetText}>{t("todo.clearStorage")}</Text>
      </Pressable>
    </>
  );
});

export default TodoActions;
