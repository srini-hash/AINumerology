"use client";

import Link from "next/link";
import { useState } from "react";

type JsonValue = Record<string, unknown> | null;

async function postJSON(url: string, payload: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function getJSON(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export default function ToolPage() {
  const [readingData, setReadingData] = useState<JsonValue>(null);
  const [compareData, setCompareData] = useState<JsonValue>(null);
  const [shareData, setShareData] = useState<JsonValue>(null);
  const [shareId, setShareId] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  return (
    <main className="container">
      <p className="nav-back">
        <Link href="/">← Soul Math home</Link>
      </p>
      <h1>Core numbers + comparison</h1>
      <p className="sub">Your reading, side-by-side comparison, and shareable cards.</p>

      <section className="card">
        <h2>Reading</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            setLoading("reading");
            try {
              const data = await postJSON("/api/reading", {
                fullName: form.get("fullName"),
                dob: form.get("dob"),
              });
              setReadingData(data);
              if (data.shareId) setShareId(String(data.shareId));
            } catch (err) {
              setReadingData({ error: (err as Error).message });
            } finally {
              setLoading(null);
            }
          }}
        >
          <label>
            Full Name
            <input name="fullName" type="text" required />
          </label>
          <label>
            Date of Birth
            <input name="dob" type="date" required />
          </label>
          <button type="submit" disabled={loading === "reading"}>
            {loading === "reading" ? "Loading..." : "Get Reading"}
          </button>
        </form>
        <pre>{readingData ? JSON.stringify(readingData, null, 2) : "No data yet."}</pre>
      </section>

      <section className="card">
        <h2>Comparison</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            setLoading("compare");
            try {
              const data = await postJSON("/api/compare", {
                personA: { fullName: form.get("aName"), dob: form.get("aDob") },
                personB: { fullName: form.get("bName"), dob: form.get("bDob") },
              });
              setCompareData(data);
            } catch (err) {
              setCompareData({ error: (err as Error).message });
            } finally {
              setLoading(null);
            }
          }}
        >
          <div className="grid">
            <label>
              Person A
              <input name="aName" type="text" required />
            </label>
            <label>
              Person A Date of Birth
              <input name="aDob" type="date" required />
            </label>
            <label>
              Person B
              <input name="bName" type="text" required />
            </label>
            <label>
              Person B Date of Birth
              <input name="bDob" type="date" required />
            </label>
          </div>
          <button type="submit" disabled={loading === "compare"}>
            {loading === "compare" ? "Loading..." : "Compare"}
          </button>
        </form>
        <pre>{compareData ? JSON.stringify(compareData, null, 2) : "No data yet."}</pre>
      </section>

      <section className="card">
        <h2>Shared Reading</h2>
        <label>
          Share ID
          <input value={shareId} onChange={(e) => setShareId(e.target.value)} />
        </label>
        <button
          type="button"
          onClick={async () => {
            if (!shareId.trim()) return;
            setLoading("share");
            try {
              const data = await getJSON(`/api/share/${shareId.trim()}`);
              setShareData(data);
            } catch (err) {
              setShareData({ error: (err as Error).message });
            } finally {
              setLoading(null);
            }
          }}
          disabled={loading === "share"}
        >
          {loading === "share" ? "Loading..." : "Load Share"}
        </button>
        <pre>{shareData ? JSON.stringify(shareData, null, 2) : "No data yet."}</pre>
      </section>
    </main>
  );
}
