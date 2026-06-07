import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import "./styles/globals.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    description: t("app.metadata.description"),
    metadataBase: new URL("https://polite.vercel.app"),
    openGraph: {
      description: t("app.metadata.open-graph-description"),
      title: t("app.metadata.title"),
      type: "website",
    },
    title: t("app.metadata.title"),
  };
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IRootLayoutProps): Promise<React.ReactElement> {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link href="/manifest.webmanifest" rel="manifest" />
        <link href="/favicon-32.png" rel="icon" sizes="32x32" type="image/png" />
        <meta content="#4f46e5" name="theme-color" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
