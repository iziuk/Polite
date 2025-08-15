import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://*.vercel.app"),
  title: "Polite — MVP",
  description: "Quick phrases with phonetics and voice",
  openGraph: {type: "website", title: "Polite", description: "Фрази SK↔UA"}
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="uk">
    <head>
      <link rel="manifest" href="/manifest.webmanifest"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
      <meta name="theme-color" content="#4f46e5"/>
      {/*<script defer data-domain="*.vercel.app" src="https://plausible.io/js/script.js"></script>*/}
    </head>
    <body className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
    {children}
    </body>
    </html>
  );
}