import Link from "next/link";
import { ACCENT, BRAND } from "@/components/portfolio/data";

// Themed page frame for everything under /projects — mirrors the home page's
// accent variable, background and ambient glows so the two areas feel like one
// site, while keeping its own breadcrumb nav (the home nav is anchor-based and
// only makes sense on the one-pager).
export default function ProjectShell({ accent = ACCENT, crumb, children }) {
  return (
    <div
      className="font-grotesk"
      style={{
        "--accent": accent,
        background: "#0A0C11",
        color: "#E9ECF1",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(620px 420px at 84% 6%,color-mix(in srgb, var(--accent) 11%, transparent),transparent 68%),radial-gradient(720px 520px at 8% 96%,rgba(103,232,249,0.07),transparent 70%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ProjectNav crumb={crumb} />
        {children}
      </div>
    </div>
  );
}

function Crumb({ href, active, children }) {
  const style = {
    color: active ? "var(--accent)" : "#8b93a2",
    fontSize: "0.85rem",
    letterSpacing: "0.04em",
  };
  if (!href) {
    return (
      <span className="pf-mono" style={style}>
        {children}
      </span>
    );
  }
  return (
    <Link className="pf-mono no-underline" href={href} style={style}>
      {children}
    </Link>
  );
}

function ProjectNav({ crumb }) {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(10,12,17,0.72)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="mx-auto flex items-center"
        style={{ maxWidth: 1200, padding: "15px 26px", gap: 12 }}
      >
        <Link
          href="/"
          aria-label="Back to home"
          className="flex items-center no-underline text-inherit"
        >
          <span
            className="pf-mono grid place-items-center shrink-0"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 9%, #12151d)",
            }}
          >
            {BRAND.initials}
          </span>
        </Link>

        <span className="pf-mono" style={{ color: "#4b5563" }}>
          /
        </span>
        <Crumb href={crumb ? "/projects" : undefined} active={!crumb}>
          projects
        </Crumb>
        {crumb && (
          <>
            <span className="pf-mono" style={{ color: "#4b5563" }}>
              /
            </span>
            <Crumb active>{crumb}</Crumb>
          </>
        )}

        <Link
          href="/"
          className="pf-btn-ghost pf-mono no-underline inline-flex items-center"
          style={{
            marginLeft: "auto",
            fontSize: "0.8rem",
            padding: "8px 13px",
            borderRadius: 9,
          }}
        >
          ← Home
        </Link>
      </div>
    </nav>
  );
}
