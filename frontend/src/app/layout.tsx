import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phone Village",
  description: "A Nigerian marketplace for discovering and listing phones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body>{children}</body>
    </html>
  );
}
