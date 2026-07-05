export default function Footer() {
  const monoFaint = {
    fontSize: "0.74rem",
    color: "#626b7a",
  };
  return (
    <footer
      className="mx-auto flex flex-wrap justify-between items-center"
      style={{
        maxWidth: 1200,
        padding: "24px 26px 50px",
        gap: 12,
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span className="pf-mono" style={monoFaint}>
        © 2026 Omar AbdelHalim
      </span>
      <span className="pf-mono" style={monoFaint}>
        Built with Next.js, Three.js &amp; react-three-fiber — no template.
      </span>
    </footer>
  );
}
