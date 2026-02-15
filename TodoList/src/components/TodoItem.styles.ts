import { StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  left: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.text,
  },

  done: {
    textDecorationLine: "line-through",
    opacity: 0.45,
  },

  // kis “pill” gomb a törléshez
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    backgroundColor: theme.colors.dangerSoft,
  },

  deleteText: {
    fontWeight: "900",
    color: theme.colors.text,
    fontSize: 14,
  },
});
