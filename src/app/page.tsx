import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soul Math — Numerology insights & comparison",
  description:
    "Discover your core numbers and compare compatibility with someone you care about. Free to try.",
};

export default function LandingPage() {
  return (
    <main className="container landing">
      <header className="landing-hero">
        <p className="landing-eyebrow">Soul Math</p>
        <h1>Numbers that describe your path—and how you connect with others.</h1>
        <p className="landing-lede">
          Get your free core numerology reading, generate a comparison card for two people, and share
          results in one place.
        </p>
        <Link href="/app" className="cta-button">
          Open my free core numbers + comparison card
        </Link>
        <p className="landing-note">No account required for the MVP experience.</p>
      </header>

      <section className="landing-features card">
        <h2 className="landing-features-title">What you can do</h2>
        <ul className="landing-list">
          <li>
            <strong>Personal reading</strong> — name and birth date mapped to core numbers.
          </li>
          <li>
            <strong>Comparison</strong> — see two profiles side by side.
          </li>
          <li>
            <strong>Share</strong> — load readings with a share ID when you need them.
          </li>
        </ul>
      </section>
    </main>
  );
}
