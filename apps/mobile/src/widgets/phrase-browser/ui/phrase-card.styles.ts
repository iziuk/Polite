"use client";

import { StyleSheet } from "react-native";

import { colors, radii, spacing } from "@shared/config";

export const phraseCardStyles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 220,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.rounded,
    borderWidth: 1,
    padding: spacing.lg,
    shadowColor: colors.text,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
  direction: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  fallbackRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  phonetic: {
    color: colors.muted,
    fontStyle: "italic",
    lineHeight: 24,
  },
  phoneticLarge: {
    fontSize: 21,
    lineHeight: 30,
  },
  phoneticNormal: {
    fontSize: 16,
  },
  phrase: {
    color: colors.text,
    fontWeight: "800",
    lineHeight: 28,
  },
  phraseLarge: {
    fontSize: 26,
    lineHeight: 34,
  },
  phraseNormal: {
    fontSize: 19,
  },
  replies: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  replyCard: {
    alignItems: "center",
    backgroundColor: colors.mutedSurface,
    borderRadius: radii.soft,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    padding: spacing.md,
  },
  replyCopyRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  replyTextBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  replyToggle: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
  },
  translation: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
});
