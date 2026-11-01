
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prominent Hearts | Meaningful Connections",
  description:
    "Prominent Hearts is a platform for adults seeking meaningful relationships and intentional connections.",
  applicationName: "Prominent Hearts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
