import { CONTACT, CONTACT_SECTION } from "./data";
import { Reveal } from "./motion";
import { SectionHeader } from "./ui";

const TILES = [
  { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  {
    label: "GitHub",
    value: `${CONTACT.githubLabel} ↗`,
    href: CONTACT.github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Connect ↗",
    href: CONTACT.linkedin,
    external: true,
  },
  {
    label: "Résumé",
    value: "Download PDF ↓",
    href: CONTACT.cv,
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto"
      style={{
        maxWidth: 1200,
        padding: "clamp(40px,7vw,90px) 26px clamp(30px,4vw,50px)",
      }}
    >
      <Reveal
        style={{
          background:
            "radial-gradient(120% 140% at 80% 0%,color-mix(in srgb, var(--accent) 12%, #0f1219),#0d1016)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "clamp(30px,5vw,64px)",
        }}
      >
        <SectionHeader
          number="04"
          label="Contact"
          line={false}
          style={{ marginBottom: 18 }}
        />

        <h2
          style={{
            fontSize: "clamp(2rem,4.6vw,3.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "#F4F6FA",
            maxWidth: "14em",
          }}
        >
          {CONTACT_SECTION.heading}
        </h2>
        <p
          style={{
            color: "#9aa2b1",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            maxWidth: "34em",
            margin: "16px 0 30px",
          }}
        >
          {CONTACT_SECTION.paragraph}
        </p>

        <a
          href={`mailto:${CONTACT.email}`}
          className="pf-btn-accent inline-flex items-center justify-center w-full sm:w-auto transition hover:-translate-y-0.5"
          style={{
            gap: 10,
            fontWeight: 700,
            fontSize: "clamp(0.78rem,3.2vw,1.05rem)",
            padding: "clamp(12px,3.5vw,16px) clamp(14px,4vw,28px)",
            borderRadius: 13,
            textDecoration: "none",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {CONTACT.email} →
        </a>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 2,
            marginTop: 40,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {TILES.map((tile) => (
            <a
              key={tile.label}
              href={tile.href}
              target={tile.external ? "_blank" : undefined}
              rel={tile.external ? "noreferrer" : undefined}
              className="no-underline transition-colors hover:bg-[#141821]"
              style={{
                background: "#0f1219",
                padding: 20,
              }}
            >
              <div
                className="pf-mono"
                style={{
                  fontSize: "0.66rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8b93a2",
                  marginBottom: 7,
                }}
              >
                {tile.label}
              </div>
              <div
                style={{
                  color: "#e6eaf0",
                  fontSize: "clamp(0.78rem,3.2vw,1.05rem)",
                }}
              >
                {tile.value}
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
