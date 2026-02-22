import React from "react";
import { Text } from "react-native";
import { observer } from "mobx-react-lite";
import todoStore from "@/stores/todoStore";
import { t } from "@/i18n/i18n";
import { styles } from "./TodoHeaderJSS";

const TodoHeader = observer(() => {
  return (
    <>
      <Text style={styles.title}>{t("todo.title")}</Text>
      <Text style={styles.stats}>
        {t("todo.stats", {
          total: todoStore.totalCount,
          active: todoStore.activeCount,
          completed: todoStore.completedCount,
          rate: todoStore.completionRate,
        })}
      </Text>
    </>
  );
});

export default TodoHeader;
