import { ARMY_COLORS, MONO } from "./ui-data";

// Battle resolved: winner banner, the FIELDED / SURVIVORS / VETERAN CORE
// table, and the three ways onward — next Round, replay the seed, restart.
export default function ResultsOverlay({ result, onNextRound, onReplay, onRestart }) {
  const color = ARMY_COLORS[result.winner];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 25,
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(80% 80% at 50% 45%,rgba(10,12,17,0.55),rgba(10,12,17,0.92))",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          width: "min(560px,92vw)",
          background: "rgba(12,15,21,0.96)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: "30px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-ac-scan"
          style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            height: 2,
            background: `linear-gradient(90deg,transparent,${color},transparent)`,
            opacity: 0.4,
          }}
        />
        <Corner side="left" color={color} />
        <Corner side="right" color={color} />

        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.66rem",
            letterSpacing: "0.24em",
            color: "#8b93a2",
            marginBottom: 10,
          }}
        >
          BATTLE RESOLVED — SEED {result.seed}
        </div>
        <div
          style={{
            fontSize: "clamp(2rem,5vw,2.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color,
            lineHeight: 1,
          }}
        >
          ARMY {result.winner} WINS
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.74rem",
            color: "#9aa2b1",
            margin: "12px 0 20px",
          }}
        >
          Army {result.loser} routed at {result.clock} · {result.survivors} of{" "}
          {result.fielded} veterans stand
        </div>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 22,
          }}
        >
          {result.rows.map((row) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr",
                gap: 8,
                padding: "10px 14px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                fontFamily: MONO,
                fontSize: "0.76rem",
              }}
            >
              <span style={{ color: "#7b8391", letterSpacing: "0.08em" }}>{row.label}</span>
              <span style={{ color: ARMY_COLORS.A, textAlign: "right" }}>{row.a}</span>
              <span style={{ color: ARMY_COLORS.B, textAlign: "right" }}>{row.b}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button
            type="button"
            onClick={onNextRound}
            className="ac-primary"
            style={{
              flex: "1 1 auto",
              border: "none",
              background: color,
              color: "#0A0C11",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "13px 20px",
              borderRadius: 11,
              cursor: "pointer",
              transition: ".2s",
            }}
          >
            NEXT ROUND — KEEP VETERANS
          </button>
          <button type="button" onClick={onReplay} className="ac-ghost" style={ghostStyle("#dfe4ec")}>
            REPLAY SEED
          </button>
          <button type="button" onClick={onRestart} className="ac-ghost" style={ghostStyle("#9aa2b1")}>
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}

const ghostStyle = (color) => ({
  border: "1px solid rgba(255,255,255,0.16)",
  background: "transparent",
  color,
  fontFamily: MONO,
  fontSize: "0.74rem",
  letterSpacing: "0.06em",
  padding: "13px 16px",
  borderRadius: 11,
  cursor: "pointer",
  transition: ".2s",
});

function Corner({ side, color }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        [side]: 12,
        width: 14,
        height: 14,
        [side === "left" ? "borderLeft" : "borderRight"]: `1.5px solid ${color}`,
        borderTop: `1.5px solid ${color}`,
        opacity: 0.7,
      }}
    />
  );
}
