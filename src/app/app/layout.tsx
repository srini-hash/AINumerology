import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core numbers & comparison — Soul Math",
  description: "Free numerology reading, comparison card, and share links.",
};

export default function AppSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
