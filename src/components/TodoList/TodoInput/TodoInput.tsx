import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { observer } from "mobx-react-lite";
import todoStore from "@/stores/todoStore";
import { theme } from "@/styles/theme";
import { t } from "@/i18n/i18n";
import { styles } from "./TodoInputJSS";

const TodoInput = observer(() => {
  const disabled = todoStore.inputBusy || !todoStore.inputText.trim();
  return (
    <View style={styles.inputRow}>
      <TextInput
        value={todoStore.inputText}
        onChangeText={todoStore.setInputText}
        placeholder={t("todo.inputPlaceholder")}
        placeholderTextColor="rgba(234,240,255,0.45)"
        selectionColor={theme.colors.primary2}
        style={styles.input}
      />
      <Pressable
        onPress={todoStore.submitInput}
        style={[styles.addBtn, disabled && styles.addBtnDisabled]}
        disabled={disabled}
      >
        <Text style={styles.addText}>{t("todo.add")}</Text>
      </Pressable>
    </View>
  );
});

export default TodoInput;
