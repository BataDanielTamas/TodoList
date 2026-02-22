import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  card: {
    marginTop: theme.space.xxl,
    padding: theme.space.xxl,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.card,
    ...theme.shadow.card,
  },
  empty: {
    paddingVertical: theme.space.lg,
    color: theme.colors.textMuted,
    fontWeight: "700",
  },
});
