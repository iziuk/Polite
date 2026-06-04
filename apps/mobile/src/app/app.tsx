import { type FC } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "@shared/config";
import { TranslationProvider } from "@shared/core/i18n";
import { PhraseBrowser } from "@widgets/phrase-browser";

export const App: FC = () => (
  <SafeAreaProvider>
    <TranslationProvider>
      <StatusBar backgroundColor={colors.backgroundStart} barStyle="dark-content" />
      <PhraseBrowser />
    </TranslationProvider>
  </SafeAreaProvider>
);
