import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  clearBtn: {
    alignSelf: "flex-start",
    paddingVertical: theme.space.md,
    paddingHorizontal: theme.space.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.inputBg,
    marginBottom: theme.space.xl,
  },
  clearText: { fontWeight: "800", color: theme.colors.text },
  resetBtn: {
    alignSelf: "flex-start",
    paddingVertical: theme.space.md,
    paddingHorizontal: theme.space.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorderStrong,
    backgroundColor: theme.colors.dangerBgStrong,
    marginTop: theme.space.xl,
  },
  resetText: { fontWeight: "900", color: theme.colors.text },
});
