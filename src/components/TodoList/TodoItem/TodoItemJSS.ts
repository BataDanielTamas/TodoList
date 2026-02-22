import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.space.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  titleWrap: { flex: 1, paddingRight: theme.space.md },
  title: { fontSize: theme.fontSize.md, fontWeight: "800", color: theme.colors.text },
  done: { textDecorationLine: "line-through", opacity: 0.45 },
  delete: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.lg,
    fontWeight: "900",
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.xs,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    backgroundColor: theme.colors.dangerBg,
  },
});
