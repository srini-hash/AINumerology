import type { GenZNarrative } from "@/lib/genZNarrative";
import type { NumerologyProfile } from "@/lib/numerology";

type ComparisonSummaryPayload = {
  score: number;
  harmonyAdjustedScore?: number;
  overlap: number;
  dynamic: string;
};

export function ComparisonSummary({ comparison }: { comparison: ComparisonSummaryPayload }) {
  return (
    <div className="vibes-compare-summary">
      <h3 className="vibes-compare-summary-title">Compatibility snapshot</h3>
      <p className="vibes-compare-dynamic">{comparison.dynamic}</p>
      <dl className="vibes-scores">
        <div>
          <dt>Harmony score</dt>
          <dd>{comparison.score}</dd>
        </div>
        {comparison.harmonyAdjustedScore != null ? (
          <div>
            <dt>Adjusted (dissonance)</dt>
            <dd>{comparison.harmonyAdjustedScore}</dd>
          </div>
        ) : null}
        <div>
          <dt>Number overlap</dt>
          <dd>{comparison.overlap}</dd>
        </div>
      </dl>
    </div>
  );
}

type SingleProps = {
  genZ: GenZNarrative;
  profile: NumerologyProfile;
  interpretation?: string | null;
  label?: string;
};

export function GenZVibesPanel({ genZ, profile, interpretation, label }: SingleProps) {
  return (
    <div className="vibes-root">
      {label ? <p className="vibes-label">{label}</p> : null}
      <header className="vibes-hero">
        <h3 className="vibes-headline">{genZ.headline}</h3>
        <p className="vibes-meta">
          Life Path {profile.lifePath} · Expression {profile.expression} · Soul Urge {profile.soulUrge} ·
          Personality {profile.personality} · Birthday {profile.birthday}
        </p>
      </header>

      <div className="vibes-grid">
        <article className="vibes-card vibes-card--lp">
          <h4 className="vibes-card-title">Main Character Energy</h4>
          <p className="vibes-card-tag">Life Path {profile.lifePath}</p>
          <p className="vibes-card-body">{genZ.mainCharacterEnergy}</p>
        </article>

        <article className="vibes-card vibes-card--ex">
          <h4 className="vibes-card-title">The Work / Public Flex</h4>
          <p className="vibes-card-tag">Expression {profile.expression}</p>
          <p className="vibes-card-body">{genZ.workPublicFlex}</p>
        </article>

        <article className="vibes-card vibes-card--su">
          <h4 className="vibes-card-title">The Secret Plot Twist</h4>
          <p className="vibes-card-tag">Soul Urge {profile.soulUrge}</p>
          <p className="vibes-card-body">{genZ.secretPlotTwist}</p>
        </article>

        <article className="vibes-card vibes-card--soc">
          <h4 className="vibes-card-title">The Social Battery</h4>
          <p className="vibes-card-tag">
            Personality {profile.personality} &amp; Birthday {profile.birthday}
          </p>
          <p className="vibes-card-body">{genZ.socialBattery}</p>
        </article>
      </div>

      {interpretation?.trim() ? (
        <section className="vibes-ai-remix">
          <h4 className="vibes-ai-remix-title">AI remix</h4>
          <div className="vibes-ai-remix-body">{interpretation.trim()}</div>
        </section>
      ) : null}
    </div>
  );
}

type DualProps = {
  genZA: GenZNarrative;
  genZB: GenZNarrative;
  profileA: NumerologyProfile;
  profileB: NumerologyProfile;
};

export function DualGenZPanels({ genZA, genZB, profileA, profileB }: DualProps) {
  return (
    <div className="vibes-dual">
      <GenZVibesPanel genZ={genZA} profile={profileA} label="Person A" />
      <GenZVibesPanel genZ={genZB} profile={profileB} label="Person B" />
    </div>
  );
}
