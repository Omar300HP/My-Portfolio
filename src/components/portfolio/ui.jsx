// Small shared presentational primitives used across sections.

export function SectionHeader({ number, label, line = true, style = {} }) {
  return (
    <div className="flex items-baseline" style={{ gap: 14, marginBottom: 10, ...style }}>
      <span
        className="pf-mono"
        style={{ fontSize: "0.78rem", color: "var(--accent)", letterSpacing: "0.1em" }}
      >
        {number}
      </span>
      <span
        className="pf-mono"
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8b93a2",
        }}
      >
        {label}
      </span>
      {line && (
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.09)" }} />
      )}
    </div>
  );
}

export function Bullet({ html, size = "0.95rem" }) {
  return (
    <li
      className="flex"
      style={{ gap: 10, color: "#c3c9d4", fontSize: size, lineHeight: 1.45 }}
    >
      <span style={{ color: "var(--accent)", flexShrink: 0 }}>▸</span>
      <span className="pf-rich" dangerouslySetInnerHTML={{ __html: html }} />
    </li>
  );
}

export function TagList({ tags, small = false, style = {} }) {
  return (
    <div className="flex flex-wrap" style={{ gap: 7, marginBottom: small ? 16 : 18, ...style }}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="pf-chip"
          style={{
            fontSize: small ? "0.73rem" : "0.75rem",
            padding: small ? "4px 10px" : "5px 11px",
            borderRadius: 999,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function LinkButton({ href, primary = false, children, style = {} }) {
  const shared = {
    gap: primary ? 7 : 6,
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "9px 15px",
    borderRadius: 9,
    ...style,
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center no-underline transition ${
        primary ? "pf-btn-accent" : "pf-btn-ghost"
      }`}
      style={shared}
    >
      {children}
    </a>
  );
}
