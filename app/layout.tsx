import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPAL | Dubai to Iran Free Zones",
  description: "Luxury vehicle import from Dubai to Iran free zones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
}
