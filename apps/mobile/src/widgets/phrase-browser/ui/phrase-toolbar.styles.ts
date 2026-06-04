"use client";

import { StyleSheet } from "react-native";

import { colors, spacing } from "@shared/config";

export const phraseToolbarStyles = StyleSheet.create({
  packButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  languageButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  languageGroup: {
    gap: spacing.xs,
  },
  languageLabel: {
    color: colors.muted,
    fontSize: 14,
  },
  searchGroup: {
    gap: spacing.xs,
  },
  searchLabel: {
    color: colors.muted,
    fontSize: 14,
  },
  toolbar: {
    gap: spacing.md,
  },
});
