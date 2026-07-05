import { SKILL_GROUPS } from "./data";
import { Reveal } from "./motion";
import { SectionHeader } from "./ui";

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto"
      style={{ maxWidth: 1200, padding: "clamp(40px,7vw,90px) 26px" }}
    >
      <Reveal>
        <SectionHeader number="02" label="Capabilities" />
        <h2
          style={{
            fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "0 0 34px",
            color: "#F4F6FA",
          }}
        >
          The full stack, end to end
        </h2>
      </Reveal>

      <Reveal
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}
      >
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.title}
            className="pf-hover-skill"
            style={{
              background: "#12151d",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "20px 22px",
            }}
          >
            <div
              className="pf-mono"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 14,
              }}
            >
              {group.title}
            </div>
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              {group.items.map((tech) => (
                <span
                  key={tech}
                  className="pf-mono"
                  style={{
                    fontSize: "0.8rem",
                    padding: "6px 11px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#cdd3dd",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
