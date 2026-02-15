import { StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export const styles = StyleSheet.create({
  card: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 6,
  },

  stats: {
    marginBottom: theme.spacing.md,
    color: theme.colors.muted,
    fontWeight: "600",
  },

  filters: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  filterActive: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
  },

  filterText: {
    fontWeight: "700",
    color: theme.colors.muted,
  },

  filterTextActive: {
    color: theme.colors.text,
  },

  inputRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    height: 46,
    color: theme.colors.text,
    backgroundColor: "#111521",
  },

  addBtn: {
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primarySoft,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  addText: {
    fontWeight: "800",
    color: theme.colors.text,
  },

  clearBtn: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },

  clearText: {
    fontWeight: "700",
    color: theme.colors.text,
  },

  empty: {
    paddingVertical: 14,
    color: theme.colors.muted,
    fontWeight: "600",
  },

  resetBtn: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.dangerSoft,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    marginTop: theme.spacing.md,
  },

  resetText: {
    fontWeight: "800",
    color: theme.colors.text,
  },
});
