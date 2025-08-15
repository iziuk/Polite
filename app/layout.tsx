import "./globals.css";

export const metadata = {
  title: "Polite — MVP",
  description: "Quick phrases with phonetics and anti‑stupor"
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="uk">
    <body className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
    {children}
    </body>
    </html>
  );
}