import { WORK } from "./data";
import { Reveal } from "./motion";
import { usePrefersReducedMotion, useTilt } from "./hooks";
import { SectionHeader, Bullet, TagList, LinkButton } from "./ui";

// Reveal on scroll + subtle pointer tilt, composed without transform conflicts:
// the outer Reveal owns the entrance, the inner card owns the tilt.
function TiltCard({ wrapperStyle, className = "", style = {}, children }) {
  const reduced = usePrefersReducedMotion();
  const tiltRef = useTilt(reduced);
  return (
    <Reveal style={wrapperStyle}>
      <div
        ref={tiltRef}
        className={`pf-card pf-hover-card ${className}`}
        style={{ transformStyle: "preserve-3d", height: "100%", ...style }}
      >
        {children}
      </div>
    </Reveal>
  );
}

function DotGrid({ mask }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)",
        backgroundSize: "16px 16px",
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
}

const monoLabel = {
  fontSize: "0.62rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#8b93a2",
  marginBottom: 8,
};

function Dot() {
  return (
    <span
      className="animate-pf-pulse"
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 8px var(--accent)",
        marginRight: 7,
        verticalAlign: "middle",
      }}
    />
  );
}

function FeaturedCard() {
  const f = WORK.featured;
  return (
    <TiltCard
      style={{
        borderRadius: 20,
        padding: "clamp(20px,2.6vw,32px)",
        display: "flex",
        flexWrap: "wrap",
        gap: "clamp(22px,3vw,40px)",
      }}
    >
      {/* Left: narrative */}
      <div style={{ flex: "1 1 360px", minWidth: "min(100%,300px)" }}>
        <div
          className="flex items-center flex-wrap"
          style={{ gap: 10, marginBottom: 14 }}
        >
          <span
            className="pf-mono bg-accent text-ink"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 9px",
              borderRadius: 6,
              fontWeight: 700,
            }}
          >
            {f.badge}
          </span>
          <span
            className="pf-mono"
            style={{ fontSize: "0.72rem", color: "#8b93a2" }}
          >
            {f.period}
          </span>
        </div>
        <h3
          style={{
            fontSize: "clamp(1.5rem,2.4vw,2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "#F4F6FA",
          }}
        >
          {f.title}
        </h3>
        <p
          className="pf-mono"
          style={{
            fontSize: "0.8rem",
            color: "var(--accent)",
            margin: "4px 0 14px",
          }}
        >
          {f.role}
        </p>
        <p
          style={{
            color: "#aab1bf",
            lineHeight: 1.6,
            fontSize: "1rem",
            margin: "0 0 16px",
          }}
        >
          {f.summary}
        </p>
        <ul
          className="flex flex-col"
          style={{ listStyle: "none", padding: 0, margin: "0 0 18px", gap: 9 }}
        >
          {f.bullets.map((b, i) => (
            <Bullet key={i} html={b} />
          ))}
        </ul>
        <TagList tags={f.tags} />
        <div className="flex flex-wrap" style={{ gap: 10 }}>
          {f.links.map((l) => (
            <LinkButton key={l.href} href={l.href} primary={l.primary}>
              {l.label}
            </LinkButton>
          ))}
        </div>
      </div>

      {/* Right: spec panel */}
      <div
        className="flex flex-col"
        style={{
          flex: "1 1 340px",
          minWidth: "min(100%,280px)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          background: "radial-gradient(130% 120% at 82% 8%,#12161f,#0a0d13)",
          minHeight: "clamp(260px,30vw,340px)",
        }}
      >
        <DotGrid mask="radial-gradient(circle at 72% 18%,#000,transparent 78%)" />
        <div
          style={{
            position: "absolute",
            top: "-34%",
            right: "-22%",
            width: "74%",
            aspectRatio: "1",
            border:
              "1px solid color-mix(in srgb, var(--accent) 18%, transparent)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-16%",
            right: "-6%",
            width: "46%",
            aspectRatio: "1",
            border:
              "1px solid color-mix(in srgb, var(--accent) 24%, transparent)",
            borderRadius: "50%",
          }}
        />
        <div
          className="animate-pf-scan"
          style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            height: 2,
            background:
              "linear-gradient(90deg,transparent,var(--accent),transparent)",
            opacity: 0.45,
          }}
        />
        <div
          className="flex flex-col"
          style={{ position: "relative", padding: "22px 24px", height: "100%" }}
        >
          <div className="pf-mono" style={{ ...monoLabel, marginBottom: 16 }}>
            <Dot />
            System spec
          </div>
          <div
            style={{
              fontSize: "clamp(1.7rem,2.5vw,2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--accent)",
              lineHeight: 1,
            }}
          >
            {f.spec.title}
          </div>
          <div
            style={{ color: "#9aa2b1", fontSize: "0.9rem", margin: "7px 0 0" }}
          >
            {f.spec.subtitle}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 18 }}>
            {f.spec.rows.map((row) => (
              <div
                key={row.k}
                className="pf-mono flex justify-between"
                style={{
                  gap: 12,
                  padding: "9px 0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  fontSize: "0.74rem",
                }}
              >
                <span style={{ color: "#6b7482", letterSpacing: "0.06em" }}>
                  {row.k}
                </span>
                <span style={{ color: "#dfe4ec" }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function LoadBars({ load }) {
  return (
    <div style={{ position: "relative", minWidth: 150, flex: "0 1 190px" }}>
      <div
        className="pf-mono"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#8b93a2",
          marginBottom: 9,
        }}
      >
        {load.label}
      </div>
      <div className="flex items-center" style={{ gap: 9, marginBottom: 7 }}>
        <span
          className="pf-mono"
          style={{ fontSize: "0.68rem", color: "#6b7482", width: 32 }}
        >
          {load.before}
        </span>
        <div
          style={{
            flex: 1,
            height: 7,
            borderRadius: 4,
            background: "rgba(255,255,255,0.12)",
          }}
        />
      </div>
      <div className="flex items-center" style={{ gap: 9 }}>
        <span
          className="pf-mono"
          style={{ fontSize: "0.68rem", color: "var(--accent)", width: 32 }}
        >
          {load.after}
        </span>
        <div
          style={{
            flex: 1,
            height: 7,
            borderRadius: 4,
            background: "rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              width: `${load.pct}%`,
              height: "100%",
              borderRadius: 4,
              background: "var(--accent)",
              boxShadow:
                "0 0 10px color-mix(in srgb, var(--accent) 70%, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ card }) {
  return (
    <TiltCard
      wrapperStyle={{ flex: "1 1 380px", minWidth: "min(100%,300px)" }}
      style={{ borderRadius: 20, overflow: "hidden" }}
    >
      {/* Metric header */}
      <div
        className="flex flex-wrap"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "22px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background:
            "radial-gradient(130% 150% at 88% 0%,color-mix(in srgb, var(--accent) 11%, #0c1016),#0b0e14)",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: card.load ? 20 : 16,
        }}
      >
        <DotGrid mask="radial-gradient(circle at 85% 0%,#000,transparent 70%)" />

        {card.outcome && (
          <div style={{ position: "relative" }}>
            <div className="pf-mono" style={monoLabel}>
              <Dot />
              {card.outcome.label}
            </div>
            <div
              style={{
                fontSize: "clamp(2rem,3vw,2.5rem)",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {card.outcome.value}
              <span
                style={{
                  fontSize: "0.42em",
                  color: "#9aa2b1",
                  fontWeight: 500,
                }}
              >
                {card.outcome.unit}
              </span>
            </div>
            <div
              style={{ color: "#9aa2b1", fontSize: "0.82rem", marginTop: 5 }}
            >
              {card.outcome.caption}
            </div>
          </div>
        )}

        {card.shipped && (
          <div style={{ position: "relative" }}>
            <div className="pf-mono" style={monoLabel}>
              <Dot />
              {card.shipped.label}
            </div>
            <div
              style={{
                fontSize: "clamp(2rem,3vw,2.5rem)",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {card.shipped.value}
            </div>
            <div
              style={{ color: "#9aa2b1", fontSize: "0.82rem", marginTop: 5 }}
            >
              {card.shipped.caption}
            </div>
          </div>
        )}

        {card.load && <LoadBars load={card.load} />}

        {card.badges && (
          <div
            className="flex flex-col items-end"
            style={{ gap: 6, position: "relative" }}
          >
            {card.badges.map((b) => (
              <span
                key={b}
                className="pf-mono"
                style={{
                  fontSize: "0.66rem",
                  color: "#cdd3dd",
                  padding: "4px 9px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 7,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        <div
          className="pf-mono"
          style={{ fontSize: "0.72rem", color: "#8b93a2", marginBottom: 8 }}
        >
          {card.period}
        </div>
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "#F4F6FA",
          }}
        >
          {card.title}
        </h3>
        <p
          className="pf-mono"
          style={{
            fontSize: "0.78rem",
            color: "var(--accent)",
            margin: "4px 0 14px",
          }}
        >
          {card.role}
        </p>
        <ul
          className="flex flex-col"
          style={{ listStyle: "none", padding: 0, margin: "0 0 16px", gap: 9 }}
        >
          {card.bullets.map((b, i) => (
            <Bullet key={i} html={b} size="0.92rem" />
          ))}
        </ul>
        <TagList tags={card.tags} small />
        <div className="flex flex-wrap" style={{ gap: 10 }}>
          {card.links.map((l) => (
            <LinkButton
              key={l.href}
              href={l.href}
              style={{ fontSize: "0.83rem", padding: "8px 13px" }}
            >
              {l.label}
            </LinkButton>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="mx-auto"
      style={{ maxWidth: 1200, padding: "clamp(40px,7vw,90px) 26px" }}
    >
      <Reveal>
        <SectionHeader number="01" label="Selected Work" />
        <h2
          style={{
            fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "0 0 8px",
            color: "#F4F6FA",
          }}
        >
          Where I&apos;ve made an impact
        </h2>
        <p
          style={{
            color: "#9aa2b1",
            fontSize: "1.05rem",
            maxWidth: "40em",
            margin: "0 0 34px",
          }}
        >
          More than three teams, three continents — each shipped to real users
          in production.
        </p>
      </Reveal>

      <div className="flex flex-col" style={{ gap: 22 }}>
        <FeaturedCard />
        <div className="flex flex-wrap" style={{ gap: 22 }}>
          {WORK.cards.map((card) => (
            <ExperienceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
