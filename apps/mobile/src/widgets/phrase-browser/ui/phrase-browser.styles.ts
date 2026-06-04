"use client";

import { StyleSheet } from "react-native";

import { colors, spacing } from "@shared/config";

export const phraseBrowserStyles = StyleSheet.create({
  cardList: {
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  emptyState: {
    color: colors.muted,
    fontSize: 16,
    paddingVertical: 48,
    textAlign: "center",
  },
  footer: {
    gap: spacing.sm,
    marginTop: 40,
  },
  footerText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  footerTextStrong: {
    color: colors.text,
    fontWeight: "700",
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  packTitle: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  packTitleEmoji: {
    fontSize: 24,
  },
  packTitleText: {
    color: colors.text,
    flex: 1,
    fontSize: 21,
    fontWeight: "800",
  },
  scroll: {
    flex: 1,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
});
