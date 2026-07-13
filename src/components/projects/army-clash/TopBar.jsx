import Link from "next/link";
import { MONO } from "./ui-data";

const chip = {
  fontFamily: MONO,
  fontSize: "0.68rem",
  letterSpacing: "0.1em",
  color: "#7b8391",
  padding: "7px 11px",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  background: "rgba(10,12,17,0.6)",
};

export default function TopBar({ seed, roundNum, bridge }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 20px",
          pointerEvents: "none",
          background: "linear-gradient(180deg,rgba(10,12,17,0.85),transparent)",
        }}
      >
        <Link
          href="/projects"
          className="ac-link"
          style={{
            pointerEvents: "auto",
            textDecoration: "none",
            color: "#c3c9d4",
            fontFamily: MONO,
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            padding: "8px 12px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 9,
            background: "rgba(10,12,17,0.6)",
            transition: ".2s",
          }}
        >
          ← PROJECTS
        </Link>
        <Link
          href="/"
          className="ac-link"
          style={{
            pointerEvents: "auto",
            textDecoration: "none",
            color: "#7b8391",
            fontFamily: MONO,
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            padding: "8px 12px",
            transition: ".2s",
          }}
        >
          PORTFOLIO
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={chip}>SEED {seed}</span>
          <span
            style={chip}
            ref={(el) => {
              bridge.fps = el;
            }}
          >
            — FPS
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 15,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 29,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.66rem",
            letterSpacing: "0.24em",
            color: "#8b93a2",
          }}
        >
          REAL-TIME AGENT SIMULATION
        </div>
        <div
          style={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontSize: "1.15rem",
            color: "#F4F6FA",
          }}
        >
          ARMY CLASH
          {roundNum > 1 && (
            <span
              style={{
                color: "#BEF264",
                fontFamily: MONO,
                fontSize: "0.7rem",
                verticalAlign: "middle",
                marginLeft: 10,
                letterSpacing: "0.12em",
              }}
            >
              ROUND {roundNum}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
