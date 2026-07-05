import { ABOUT } from "./data";
import { Reveal } from "./motion";
import { SectionHeader } from "./ui";

export default function About({ show = true }) {
  if (!show) return null;
  return (
    <section
      id="about"
      className="mx-auto"
      style={{ maxWidth: 1200, padding: "clamp(40px,7vw,90px) 26px" }}
    >
      <Reveal>
        <SectionHeader number="03" label="Beyond the code" />
      </Reveal>

      <Reveal
        className="pf-card flex flex-wrap items-center"
        style={{
          gap: "clamp(24px,4vw,48px)",
          borderRadius: 20,
          padding: "clamp(24px,3vw,40px)",
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: "min(100%,300px)" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem,2.8vw,2.3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 14px",
              color: "#F4F6FA",
            }}
          >
            {ABOUT.heading}
          </h2>
          <p
            style={{
              color: "#aab1bf",
              lineHeight: 1.65,
              fontSize: "1.05rem",
              margin: "0 0 22px",
            }}
          >
            {ABOUT.paragraph}
          </p>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {ABOUT.chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center"
                style={{
                  gap: 8,
                  fontSize: "0.9rem",
                  color: "#dfe4ec",
                  padding: "9px 14px",
                  border: "1px solid rgba(255,255,255,0.11)",
                  borderRadius: 11,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>◆</span>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
