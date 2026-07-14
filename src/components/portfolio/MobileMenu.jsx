import { useEffect, useRef } from "react";
import Link from "next/link";
import { BRAND, NAV_LINKS, CONTACT } from "./data";

// Location strap-line, kept 1:1 with the imported design.
const LOCATION = "ALEXANDRIA, EGYPT · REMOTE WORLDWIDE";

// Full-screen navigation for phones / small tablets. Sibling of <Nav>'s <nav>
// (never a child) because the nav's backdrop-filter would otherwise trap this
// position:fixed overlay inside the ~70px-tall bar.
export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    // Restore focus to whatever opened the menu (the hamburger) on close.
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Minimal focus trap: keep Tab cycling inside the dialog.
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="pf-menu md:hidden"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10,12,17,0.97)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex",
        flexDirection: "column",
        padding: "15px 26px 30px",
        overflowY: "auto",
      }}
    >
      {/* Header: logo + name + close */}
      <div className="flex items-center gap-3">
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
        <span style={{ fontWeight: 600, fontSize: "1rem", color: "#F4F6FA" }}>
          {BRAND.name}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="pf-menu-close pf-mono ml-auto shrink-0"
          style={{
            width: 44,
            height: 40,
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            color: "#E9ECF1",
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: ".2s",
          }}
        >
          ✕
        </button>
      </div>

      {/* Numbered section links */}
      <nav
        aria-label="Mobile"
        className="flex flex-col"
        style={{ marginTop: 38 }}
      >
        {NAV_LINKS.map((link, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isPage = link.href.startsWith("/");
          const inner = (
            <>
              <span
                className="pf-mono"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                }}
              >
                {num}
              </span>
              {link.label}
              {/* NEW badge flags the one link that leaves the one-pager. */}
              {isPage && (
                <span
                  className="pf-mono"
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "#0A0C11",
                    background: "var(--accent)",
                    borderRadius: 5,
                    padding: "3px 7px",
                    fontWeight: 700,
                    alignSelf: "center",
                  }}
                >
                  NEW
                </span>
              )}
            </>
          );
          const linkStyle = {
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            textDecoration: "none",
            color: "#F4F6FA",
            fontSize: "clamp(1.7rem,8vw,2.2rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            padding: "15px 4px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            transition: "color .2s",
          };
          return isPage ? (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="pf-menu-link"
              style={linkStyle}
            >
              {inner}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="pf-menu-link"
              style={linkStyle}
            >
              {inner}
            </a>
          );
        })}
      </nav>

      {/* Bottom CTAs */}
      <div
        className="flex flex-col"
        style={{ marginTop: "auto", gap: 10, paddingTop: 32 }}
      >
        <a
          href="#contact"
          onClick={onClose}
          className="pf-btn-accent flex justify-center items-center no-underline"
          style={{
            gap: 9,
            fontWeight: 700,
            fontSize: "1.02rem",
            padding: "15px 22px",
            borderRadius: 12,
          }}
        >
          Let&apos;s talk →
        </a>
        <a
          href={CONTACT.cv}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="pf-btn-ghost flex justify-center items-center no-underline"
          style={{
            gap: 8,
            fontWeight: 500,
            fontSize: "0.95rem",
            padding: "13px 20px",
            borderRadius: 12,
          }}
        >
          Résumé ↗
        </a>
      </div>

      <div
        className="pf-mono"
        style={{
          fontSize: "0.66rem",
          letterSpacing: "0.12em",
          color: "#626b7a",
          marginTop: 24,
          textAlign: "center",
        }}
      >
        {LOCATION}
      </div>
    </div>
  );
}
