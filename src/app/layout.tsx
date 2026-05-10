import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Numerology",
  description: "AI numerology with shareable social comparisons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
