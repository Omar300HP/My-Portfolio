import { Fragment } from "react";
import dynamic from "next/dynamic";
import { HERO, CONTACT } from "./data";
import { CountUp } from "./motion";

// The WebGL viewer is client-only (uses canvas / WebGL / window).
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <ViewerFallback />,
});

function ViewerFallback() {
  return (
    <div>
      <div
        style={{
          height: "clamp(380px,54vh,600px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          background:
            "radial-gradient(120% 120% at 50% 20%,#12161f 0%,#0a0d13 70%)",
        }}
      />
      <p
        className="pf-mono"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.05em",
          color: "#626b7a",
          margin: "12px 4px 0",
          textAlign: "center",
        }}
      >
        Loading Three.js demo…
      </p>
    </div>
  );
}

function MultilineLabel({ text }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex flex-wrap items-center"
      style={{
        maxWidth: 1200,
        padding: "clamp(30px,5vw,60px) 26px 46px",
        gap: "clamp(28px,4vw,56px)",
        minHeight: "calc(100vh - 68px)",
      }}
    >
      {/* Left column */}
      <div style={{ flex: "1 1 440px", minWidth: "min(100%,440px)" }}>
        <div
          className="pf-mono inline-flex items-center"
          style={{
            gap: 9,
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#c9d0db",
            padding: "7px 13px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span
            className="animate-pf-pulse"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 12px var(--accent)",
            }}
          />
          {HERO.status}
        </div>

        <p
          className="pf-mono"
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: "26px 0 14px",
          }}
        >
          {HERO.eyebrow}
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem,6vw,4.15rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            fontWeight: 700,
            margin: 0,
            color: "#F4F6FA",
          }}
        >
          I build fast,
          <br />
          <span style={{ color: "var(--accent)" }}>
            browser-native&nbsp;3D,
          </span>
          <br />
          next & react web apps.
        </h1>

        <p
          style={{
            fontSize: "clamp(1.02rem,1.4vw,1.2rem)",
            lineHeight: 1.6,
            color: "#9aa2b1",
            maxWidth: "33em",
            margin: "22px 0 30px",
          }}
        >
          {HERO.description}
        </p>

        <div className="flex flex-wrap" style={{ gap: 12 }}>
          <a
            href="#work"
            className="inline-flex items-center bg-accent text-ink no-underline font-semibold transition hover:-translate-y-0.5 hover:brightness-110"
            style={{
              gap: 8,
              fontSize: "0.98rem",
              padding: "13px 22px",
              borderRadius: 11,
            }}
          >
            View selected work →
          </a>
          <a
            href="#contact"
            className="inline-flex items-center no-underline font-medium transition"
            style={{
              gap: 8,
              fontSize: "0.98rem",
              padding: "13px 20px",
              borderRadius: 11,
              color: "#e6eaf0",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            Get in touch
          </a>
          <a
            href={CONTACT.cv}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center no-underline font-medium transition text-[#9aa2b1] hover:text-white"
            style={{
              gap: 8,
              fontSize: "0.98rem",
              padding: "13px 16px",
              borderRadius: 11,
            }}
          >
            Résumé ↗
          </a>
        </div>

        {/* Stats */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
            gap: 14,
            marginTop: 38,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 26,
          }}
        >
          {HERO.stats.map((stat, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: "clamp(1.6rem,2.6vw,2.1rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: stat.accent ? "var(--accent)" : "#F4F6FA",
                }}
              >
                {stat.value === null ? (
                  stat.display
                ) : (
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                  />
                )}
              </div>
              <div
                className="pf-mono"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#8b93a2",
                  marginTop: 5,
                  lineHeight: 1.4,
                }}
              >
                <MultilineLabel text={stat.label} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — 3D viewer */}
      <div style={{ flex: "1 1 480px", minWidth: "min(100%,320px)" }}>
        <Hero3D />
      </div>
    </section>
  );
}
