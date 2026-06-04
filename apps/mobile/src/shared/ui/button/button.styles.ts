"use client";

import { StyleSheet } from "react-native";

import { colors, radii, spacing } from "@shared/config";

export const buttonStyles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  defaultSize: {
    minHeight: 42,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  ghost: {
    backgroundColor: colors.warningSoft,
    borderColor: colors.warningSoft,
  },
  ghostText: {
    color: colors.warning,
  },
  iconSize: {
    height: 42,
    width: 42,
  },
  pressed: {
    opacity: 0.76,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryText: {
    color: colors.surface,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.text,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
});
