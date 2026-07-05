import { ACCENT } from "./data";
import Nav from "./Nav";
import Hero from "./Hero";
import Work from "./Work";
import Skills from "./Skills";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Portfolio({ accent = ACCENT, showBeyondCode = true }) {
  return (
    <div
      id="omar-portfolio"
      className="font-grotesk"
      style={{
        // Single source of truth for the theme accent — everything downstream
        // reads var(--accent) (inline styles, color-mix, Tailwind bg-accent).
        "--accent": accent,
        background: "#0A0C11",
        color: "#E9ECF1",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Ambient corner glows */}
      <div
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
        <Nav />
        <Hero />
        <Work />
        <Skills />
        <About show={showBeyondCode} />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
