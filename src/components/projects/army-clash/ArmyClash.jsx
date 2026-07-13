// Top-level component for the Army Clash project. In this first slice it renders
// an intentional placeholder shell; later tickets mount the live simulation,
// setup UI and cinematic in place of the placeholder stage.

const FLOW = [
  { n: "01", label: "Compose", text: "Field two armies from four unit types." },
  { n: "02", label: "Clash", text: "Press start; the battle simulates for real." },
  { n: "03", label: "Resolve", text: "One army routs. Rematch or run another round." },
];

export default function ArmyClash() {
  return (
    <section
      className="mx-auto"
      style={{ maxWidth: 1200, padding: "clamp(30px,5vw,64px) 26px 90px" }}
    >
      <div style={{ marginBottom: 26 }}>
        <span
          className="pf-mono"
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8b93a2",
          }}
        >
          Project · Simulation
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem,4vw,3.1rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "10px 0 10px",
            color: "#F4F6FA",
          }}
        >
          Army Clash
        </h1>
        <p
          style={{
            color: "#9aa2b1",
            fontSize: "1.05rem",
            maxWidth: "46em",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          A real-time, agent-based battle simulation. Every soldier is an
          autonomous unit that seeks, closes with and fights the enemy — the
          winner emerges from the simulation, not a script.
        </p>
      </div>

      <ClashStage />

      <div
        className="grid"
        style={{
          marginTop: 22,
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,240px),1fr))",
        }}
      >
        {FLOW.map((step) => (
          <div
            key={step.n}
            className="pf-card"
            style={{ borderRadius: 14, padding: "18px 20px" }}
          >
            <div
              className="pf-mono"
              style={{ fontSize: "0.78rem", color: "var(--accent)" }}
            >
              {step.n}
            </div>
            <div
              style={{ fontWeight: 700, color: "#F4F6FA", margin: "6px 0 4px" }}
            >
              {step.label}
            </div>
            <div style={{ color: "#9aa2b1", fontSize: "0.9rem", lineHeight: 1.5 }}>
              {step.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// The framed battlefield surface. The live sim + cinematic mount here in a
// later ticket; for now it's a labelled placeholder that reads as deliberate.
function ClashStage() {
  return (
    <div
      style={{
        position: "relative",
        height: "clamp(360px,56vh,620px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        overflow: "hidden",
        background:
          "radial-gradient(120% 120% at 50% 18%,#12161f 0%,#0a0d13 72%)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%,#000 30%,transparent 80%)",
          maskImage:
            "radial-gradient(circle at 50% 45%,#000 30%,transparent 80%)",
        }}
      />
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      <div style={{ position: "relative", textAlign: "center", padding: 24 }}>
        <div
          className="pf-mono"
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Battlefield
        </div>
        <div
          className="pf-mono"
          style={{ color: "#7b8391", marginTop: 10, fontSize: "0.9rem" }}
        >
          &gt; simulation module initializing…
        </div>
      </div>
    </div>
  );
}

function Bracket({ pos }) {
  const base = {
    position: "absolute",
    width: 16,
    height: 16,
    borderColor: "color-mix(in srgb, var(--accent) 70%, transparent)",
  };
  const map = {
    tl: { top: 14, left: 14, borderLeft: "1.5px solid", borderTop: "1.5px solid" },
    tr: { top: 14, right: 14, borderRight: "1.5px solid", borderTop: "1.5px solid" },
    bl: { bottom: 14, left: 14, borderLeft: "1.5px solid", borderBottom: "1.5px solid" },
    br: { bottom: 14, right: 14, borderRight: "1.5px solid", borderBottom: "1.5px solid" },
  };
  return <div aria-hidden style={{ ...base, ...map[pos] }} />;
}
