import Link from "next/link";
import { PROJECTS } from "./projectsData";
import { SectionHeader, TagList } from "@/components/portfolio/ui";

export default function ProjectsHub() {
  return (
    <section
      className="mx-auto"
      style={{ maxWidth: 1200, padding: "clamp(40px,7vw,90px) 26px" }}
    >
      <SectionHeader number="//" label="Projects" />
      <h1
        style={{
          fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "0 0 8px",
          color: "#F4F6FA",
        }}
      >
        Things I&apos;ve built
      </h1>
      <p
        style={{
          color: "#9aa2b1",
          fontSize: "1.05rem",
          maxWidth: "42em",
          margin: "0 0 34px",
        }}
      >
        Interactive experiments and applications — each a small system I
        designed, built, and shipped end to end. More landing over time.
      </p>

      <div
        className="grid"
        style={{
          gap: 22,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <Link
      href={project.href}
      className="no-underline"
      style={{ color: "inherit" }}
    >
      <article
        className="pf-card pf-hover-card"
        style={{
          borderRadius: 20,
          padding: "clamp(20px,2.4vw,28px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          className="flex items-center"
          style={{ gap: 10, justifyContent: "space-between" }}
        >
          <span
            className="pf-mono"
            style={{
              fontSize: "0.66rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              border:
                "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
              background: "color-mix(in srgb, var(--accent) 8%, transparent)",
              borderRadius: 6,
              padding: "4px 9px",
            }}
          >
            {project.status}
          </span>
          <span
            className="pf-mono"
            style={{ fontSize: "0.72rem", color: "#8b93a2" }}
          >
            {project.year}
          </span>
        </div>

        <div>
          <h2
            style={{
              fontSize: "clamp(1.4rem,2.2vw,1.85rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 8px",
              color: "#F4F6FA",
            }}
          >
            {project.title}
          </h2>
          <p style={{ color: "#aab1bf", lineHeight: 1.6, fontSize: "0.95rem", margin: 0 }}>
            {project.tagline}
          </p>
        </div>

        {project.spec && (
          <div style={{ marginTop: "auto" }}>
            {project.spec.map((row) => (
              <div
                key={row.k}
                className="pf-mono flex justify-between"
                style={{
                  gap: 12,
                  padding: "8px 0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  fontSize: "0.72rem",
                }}
              >
                <span style={{ color: "#6b7482", letterSpacing: "0.06em" }}>
                  {row.k}
                </span>
                <span style={{ color: "#dfe4ec" }}>{row.v}</span>
              </div>
            ))}
          </div>
        )}

        <TagList tags={project.tags} small style={{ marginBottom: 0 }} />

        <span
          className="pf-mono"
          style={{
            fontSize: "0.82rem",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          Open project →
        </span>
      </article>
    </Link>
  );
}
