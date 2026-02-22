import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    gap: theme.space.md,
    marginBottom: theme.space.xl,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.space.lg,
    height: theme.inputHeight,
    color: theme.colors.text,
  },
  addBtn: {
    paddingHorizontal: theme.space.xl,
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorderStrong,
    backgroundColor: theme.colors.primaryBg,
  },
  addText: { fontWeight: "900", color: theme.colors.text },
  addBtnDisabled: { opacity: 0.35 },
});
