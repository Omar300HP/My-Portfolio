import { BRAND, NAV_LINKS } from "./data";

export default function Nav() {
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
          {/* Section links collapse on phones; the CTA always stays. */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="no-underline text-[#c3c9d4] text-[0.92rem] px-[13px] py-2 rounded-lg transition-colors hover:text-white hover:bg-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-accent text-ink no-underline font-semibold text-[0.92rem] ml-2 px-4 py-[9px] rounded-[9px] transition hover:brightness-110 shrink-0"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </nav>
  );
}
