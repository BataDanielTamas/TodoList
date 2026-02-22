import React from "react";
import { View, Pressable, Text } from "react-native";
import { observer } from "mobx-react-lite";
import todoStore, { TodoFilter } from "@/stores/todoStore";
import { t } from "@/i18n/i18n";
import { styles } from "./TodoFiltersJSS";

const FILTERS: TodoFilter[] = ["all", "active", "done"];

const TodoFilters = observer(() => {
  return (
    <View style={styles.filters}>
      {FILTERS.map((f) => (
        <Pressable
          key={f}
          onPress={() => todoStore.setFilter(f)}
          style={[styles.filterBtn, todoStore.filter === f && styles.filterBtnActive]}
        >
          <Text style={[styles.filterText, todoStore.filter === f && styles.filterTextActive]}>
            {t(`todo.filter.${f}`)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
});

export default TodoFilters;
