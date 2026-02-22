import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: theme.space.xs,
  },
  stats: {
    marginBottom: theme.space.md,
    color: theme.colors.textMuted,
    fontWeight: "600",
  },
});
