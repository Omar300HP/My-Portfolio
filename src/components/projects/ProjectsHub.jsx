import Link from "next/link";
import { BRAND } from "@/components/portfolio/data";

// The Projects hub, implemented from the Claude Design handoff
// (Projects.dc.html): one flagship card today, built to grow.

const LIME = "#BEF264";
const CYAN = "#67E8F9";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const BULLETS = [
  "Deterministic engine — same armies + same seed replay the exact same battle",
  "Counter-triangle combat, morale & rout — composition genuinely matters",
  "Cinematic camera director with slow-mo climax — or grab the camera yourself",
  "Round loop — your surviving veterans carry forward into the next fight",
];

const TAGS = [
  "Three.js",
  "Instanced rendering",
  "Agent simulation",
  "Seeded determinism",
  "Spatial hashing",
];

const TILES = [
  { value: "600", color: LIME, caption: ["AUTONOMOUS AGENTS", "MAX PER BATTLE"] },
  { value: "60", unit: "fps", color: "#F4F6FA", caption: ["FIXED-TIMESTEP SIM", "INSTANCED DRAW"] },
  { value: "4", color: CYAN, caption: ["UNIT TYPES IN A", "COUNTER TRIANGLE"] },
  { value: "1:1", color: "#F4F6FA", caption: ["SEEDED REPLAY", "DETERMINISM"] },
];

export default function ProjectsHub() {
  return (
    <div
      style={{
        background: "#0A0C11",
        color: "#E9ECF1",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(620px 420px at 84% 4%,rgba(190,242,100,0.09),transparent 68%),radial-gradient(700px 500px at 6% 100%,rgba(103,232,249,0.07),transparent 70%)",
        }}
      />

      <HubNav />

      <main
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(36px,6vw,72px) 26px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.78rem", color: LIME, letterSpacing: "0.1em" }}>
            /
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8b93a2",
            }}
          >
            Projects — interactive artifacts
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.09)" }} />
        </div>
        <h1
          style={{
            fontSize: "clamp(2.2rem,5vw,3.6rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            margin: "0 0 10px",
            color: "#F4F6FA",
          }}
        >
          Built pieces, not bullet points.
        </h1>
        <p
          style={{
            color: "#9aa2b1",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            maxWidth: "38em",
            margin: "0 0 40px",
          }}
        >
          Real systems you can run in the browser — each one an argument that I build
          software, not slides about software.
        </p>

        <FlagshipCard />

        <p
          style={{
            fontFamily: MONO,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: "#626b7a",
            margin: "28px 4px 0",
          }}
        >
          MORE ARTIFACTS IN PROGRESS — THIS HUB IS BUILT TO GROW.
        </p>
      </main>

      <footer
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 26px 50px",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: "0.74rem", color: "#626b7a" }}>
          © 2026 {BRAND.name}
        </span>
        <Link
          href="/"
          className="ac-link"
          style={{ fontFamily: MONO, fontSize: "0.74rem", color: "#9aa2b1", textDecoration: "none" }}
        >
          ← Back to portfolio
        </Link>
      </footer>
    </div>
  );
}

function HubNav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(10,12,17,0.72)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "15px 26px",
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#E9ECF1" }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              display: "grid",
              placeItems: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: "0.9rem",
              color: LIME,
              background: "rgba(190,242,100,0.07)",
            }}
          >
            {BRAND.initials}
          </span>
          <span style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1rem" }}>
            {BRAND.name}
          </span>
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <Link
            href="/"
            className="no-underline text-[#c3c9d4] text-[0.92rem] px-[13px] py-2 rounded-lg transition-colors hover:text-white hover:bg-white/[0.06]"
          >
            ← Portfolio
          </Link>
          <Link
            href="/#contact"
            style={{
              textDecoration: "none",
              color: "#0A0C11",
              fontWeight: 600,
              fontSize: "0.92rem",
              padding: "9px 16px",
              borderRadius: 9,
              background: LIME,
              marginLeft: 8,
              transition: ".2s",
            }}
            className="ac-primary"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </nav>
  );
}

function FlagshipCard() {
  return (
    <Link
      href="/projects/army-clash"
      className="ac-card"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#13161f,#101319)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 22,
      }}
    >
      <div
        className="animate-ac-scan"
        style={{
          position: "absolute",
          left: "6%",
          right: "6%",
          height: 2,
          background: `linear-gradient(90deg,transparent,${LIME},transparent)`,
          opacity: 0.3,
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Narrative */}
        <div style={{ flex: "1 1 420px", minWidth: "min(100%,340px)", padding: "clamp(26px,3.4vw,44px)" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0C11",
                background: LIME,
                padding: "4px 9px",
                borderRadius: 6,
                fontWeight: 700,
              }}
            >
              Project 01 — Flagship
            </span>
            <span style={{ fontFamily: MONO, fontSize: "0.7rem", color: "#8b93a2" }}>
              2026 · Playable in browser
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
              color: "#F4F6FA",
            }}
          >
            Army Clash
          </h2>
          <p
            style={{
              color: "#aab1bf",
              lineHeight: 1.65,
              fontSize: "1.02rem",
              margin: "0 0 20px",
              maxWidth: "34em",
            }}
          >
            A real-time, agent-based battle simulation. Compose two armies from four unit
            types, press start, and watch a directed cinematic as hundreds of autonomous
            agents fight it out — the winner{" "}
            <em style={{ color: "#F4F6FA", fontStyle: "normal" }}>emerges</em> from the
            simulation, it isn&apos;t scripted.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: 9,
            }}
          >
            {BULLETS.map((b) => (
              <li key={b} style={{ display: "flex", gap: 10, color: "#c3c9d4", fontSize: "0.94rem" }}>
                <span style={{ color: LIME }}>▸</span>
                {b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 26 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: MONO,
                  fontSize: "0.73rem",
                  padding: "5px 11px",
                  border: "1px solid rgba(255,255,255,0.11)",
                  borderRadius: 999,
                  color: "#cdd3dd",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: LIME,
              color: "#0A0C11",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 26px",
              borderRadius: 12,
            }}
          >
            ▶ Launch Army Clash
          </span>
        </div>

        {/* Telemetry panel */}
        <div
          style={{
            flex: "1 1 340px",
            minWidth: "min(100%,300px)",
            position: "relative",
            background: "radial-gradient(120% 120% at 50% 30%,#12161f,#0a0d13)",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(26px,3vw,40px)",
            gap: 10,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
              backgroundSize: "36px 36px",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%,#000 30%,transparent 80%)",
              maskImage: "radial-gradient(circle at 50% 50%,#000 30%,transparent 80%)",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: MONO,
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              color: "#8b93a2",
            }}
          >
            <span
              className="animate-pf-pulse"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: LIME,
                boxShadow: `0 0 10px ${LIME}`,
              }}
            />
            LIVE TELEMETRY
          </div>
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {TILES.map((tile) => (
              <div
                key={tile.caption[0]}
                style={{
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 12,
                  padding: 14,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: tile.color,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tile.value}
                  {tile.unit && (
                    <span style={{ fontSize: "0.6em", color: "#8b93a2" }}>{tile.unit}</span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    color: "#8b93a2",
                    marginTop: 3,
                  }}
                >
                  {tile.caption[0]}
                  <br />
                  {tile.caption[1]}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "relative",
              fontFamily: MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.06em",
              color: "#626b7a",
              lineHeight: 1.8,
              marginTop: 6,
            }}
          >
            CAV ▸ SWORD &amp; ARCHER · SPEAR ▸ CAV
            <br />
            ARCHER ▸ all at range · melee ▸ ARCHER
          </div>
        </div>
      </div>
    </Link>
  );
}
