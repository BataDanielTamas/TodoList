import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    gap: theme.space.md,
    marginBottom: theme.space.xl,
  },
  filterBtn: {
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: "transparent",
  },
  filterBtnActive: {
    backgroundColor: theme.colors.primarySubtle,
    borderColor: theme.colors.primaryBorder,
  },
  filterText: { fontWeight: "800", color: theme.colors.textMuted },
  filterTextActive: { color: theme.colors.text },
});
