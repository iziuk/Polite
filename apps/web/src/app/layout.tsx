import type { Metadata } from "next";

import { translate } from "@shared/core/i18n";

import "./styles/globals.css";

export const metadata: Metadata = {
  description: translate("app.metadata.description"),
  metadataBase: new URL("https://polite.vercel.app"),
  openGraph: {
    description: translate("app.metadata.open-graph-description"),
    title: translate("app.metadata.title"),
    type: "website",
  },
  title: translate("app.metadata.title"),
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="uk">
      <head>
        <link href="/manifest.webmanifest" rel="manifest" />
        <link href="/favicon-32.png" rel="icon" sizes="32x32" type="image/png" />
        <meta content="#4f46e5" name="theme-color" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">{children}</body>
    </html>
  );
}
