import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soul Math",
  description: "Numerology readings, comparison cards, and shareable insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
