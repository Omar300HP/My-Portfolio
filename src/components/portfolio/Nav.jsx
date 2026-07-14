import { useCallback, useState } from "react";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "./data";
import MobileMenu from "./MobileMenu";

const NAV_LINK_CLASS =
  "no-underline text-[#c3c9d4] text-[0.92rem] px-[13px] py-2 rounded-lg transition-colors hover:text-white hover:bg-white/[0.06]";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
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
          className="mx-auto flex items-center gap-[18px]"
          style={{ maxWidth: 1200, padding: "15px 26px" }}
        >
          <a href="#top" className="flex items-center gap-3 no-underline text-inherit">
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
            {/* Name is dropped on very narrow phones to keep the bar one line tall. */}
            <span
              className="hidden min-[400px]:inline"
              style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1rem" }}
            >
              {BRAND.name}
            </span>
          </a>

          <div className="ml-auto flex items-center gap-1">
            {/* Section links + CTA collapse into the mobile menu below md. */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${NAV_LINK_CLASS} relative`}
                  >
                    {link.label}
                    {/* Accent dot: marks the link that leaves the one-pager. */}
                    <span
                      className="absolute"
                      style={{
                        top: 7,
                        right: 5,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--accent)",
                      }}
                    />
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className={NAV_LINK_CLASS}>
                    {link.label}
                  </a>
                )
              )}
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-accent text-ink no-underline font-semibold text-[0.92rem] ml-2 px-4 py-[9px] rounded-[9px] transition hover:brightness-110 shrink-0"
            >
              Let&apos;s talk
            </a>

            {/* Mobile hamburger — opens the full-screen menu. */}
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="pf-burger md:hidden inline-flex flex-col justify-center items-start shrink-0"
              style={{
                gap: 4,
                width: 44,
                height: 40,
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                cursor: "pointer",
                padding: "0 0 0 12px",
                transition: ".2s",
              }}
            >
              <span style={{ display: "block", width: 18, height: 2, borderRadius: 2, background: "#E9ECF1" }} />
              <span style={{ display: "block", width: 11, height: 2, borderRadius: 2, background: "var(--accent)" }} />
              <span style={{ display: "block", width: 18, height: 2, borderRadius: 2, background: "#E9ECF1" }} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
