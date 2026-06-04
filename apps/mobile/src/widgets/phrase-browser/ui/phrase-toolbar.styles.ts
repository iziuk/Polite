"use client";

import { StyleSheet } from "react-native";

import { colors, spacing } from "@shared/config";

export const phraseToolbarStyles = StyleSheet.create({
  packButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
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
