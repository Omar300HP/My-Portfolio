import { ARMY_COLORS, MONO, PRESETS, UNIT_META, UNIT_ORDER, totalUnits } from "./ui-data";

// The Army composition screen: one HUD panel per Army with a stepper per Unit
// Type, presets, a live unit total, and the big START button between them.
export default function SetupOverlay({
  cfgA,
  cfgB,
  roundNum,
  vetSide,
  toast,
  onAdjust,
  onPreset,
  onStart,
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div style={{ flex: "1 0 auto", minHeight: 96 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 14,
          padding: "0 20px",
          flexWrap: "wrap",
        }}
      >
        <ArmyPanel
          army="A"
          cfg={cfgA}
          roundNum={roundNum}
          vetSide={vetSide}
          onAdjust={onAdjust}
          onPreset={onPreset}
        />

        <div
          style={{
            pointerEvents: "auto",
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            paddingBottom: 6,
          }}
        >
          {toast && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: "0.7rem",
                color: "#FDBA57",
                background: "rgba(253,186,87,0.08)",
                border: "1px solid rgba(253,186,87,0.35)",
                borderRadius: 9,
                padding: "8px 14px",
              }}
            >
              {toast}
            </div>
          )}
          <button
            type="button"
            onClick={onStart}
            className="ac-start"
            style={{
              border: "none",
              background: "#BEF264",
              color: "#0A0C11",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.02em",
              padding: "16px 34px",
              borderRadius: 13,
              cursor: "pointer",
              boxShadow: "0 10px 40px -8px rgba(190,242,100,0.5)",
              transition: ".2s",
            }}
          >
            ▶ START BATTLE
          </button>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              color: "#626b7a",
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            CAV ▸ SWORD &amp; ARCHER · SPEAR ▸ CAV
            <br />
            ARCHER ▸ all at range · melee ▸ ARCHER
          </div>
        </div>

        <ArmyPanel
          army="B"
          cfg={cfgB}
          roundNum={roundNum}
          vetSide={vetSide}
          onAdjust={onAdjust}
          onPreset={onPreset}
        />
      </div>
      <div style={{ height: 18 }} />
    </div>
  );
}

function ArmyPanel({ army, cfg, roundNum, vetSide, onAdjust, onPreset }) {
  const color = ARMY_COLORS[army];
  const cornerStyle = (side) => ({
    position: "absolute",
    top: 10,
    [side]: 10,
    width: 12,
    height: 12,
    [`border${side === "left" ? "Left" : "Right"}`]: `1.5px solid ${hex(color, 0.7)}`,
    borderTop: `1.5px solid ${hex(color, 0.7)}`,
  });

  return (
    <div
      style={{
        pointerEvents: "auto",
        flex: "0 1 400px",
        minWidth: "min(100%,330px)",
        background: "rgba(12,15,21,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${hex(color, 0.28)}`,
        borderRadius: 16,
        padding: "16px 18px",
        position: "relative",
      }}
    >
      <div style={cornerStyle("left")} />
      <div style={cornerStyle("right")} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span
          className="animate-pf-pulse"
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.18em",
            color,
          }}
        >
          ARMY {army}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: MONO,
            fontSize: "0.7rem",
            color: "#c9d0db",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 7,
            padding: "4px 9px",
          }}
        >
          {totalUnits(cfg)} UNITS
        </span>
      </div>

      {vetSide === army && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.64rem",
            letterSpacing: "0.1em",
            color,
            margin: "4px 0 2px",
          }}
        >
          ★ VETERANS OF ROUND {roundNum - 1} — HEALED, YOURS TO REINFORCE
        </div>
      )}

      {UNIT_ORDER.map((type) => (
        <UnitRow key={type} army={army} type={type} count={cfg[type]} color={color} onAdjust={onAdjust} />
      ))}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {PRESETS.map(([name, presetCfg]) => (
          <button
            key={name}
            type="button"
            onClick={() => onPreset(army, presetCfg)}
            className="ac-preset"
            style={{
              "--army-color": color,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "#9aa2b1",
              borderRadius: 999,
              padding: "5px 11px",
              fontFamily: MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: ".15s",
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function UnitRow({ army, type, count, color, onAdjust }) {
  const meta = UNIT_META[type];
  const btn = (label, delta, wide) => (
    <button
      type="button"
      onClick={() => onAdjust(army, type, delta)}
      className="ac-step"
      style={{
        "--army-color": color,
        width: wide ? 30 : 26,
        height: 28,
        border: "1px solid rgba(255,255,255,0.13)",
        background: "rgba(255,255,255,0.03)",
        color: "#c3c9d4",
        borderRadius: 7,
        fontFamily: MONO,
        fontSize: wide ? "0.62rem" : "0.72rem",
        cursor: "pointer",
        transition: ".15s",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          border: `1px solid ${hex(color, 0.35)}`,
          borderRadius: 8,
          fontFamily: MONO,
          fontSize: "0.66rem",
          fontWeight: 700,
          color,
          background: hex(color, 0.06),
        }}
      >
        {meta.glyph}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#F4F6FA" }}>
          {meta.label}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: MONO,
            fontSize: "0.6rem",
            color: "#7b8391",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {meta.sub}
        </span>
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {btn("-10", -10, true)}
        {btn("-", -1, false)}
        <span
          style={{
            width: 44,
            textAlign: "center",
            fontFamily: MONO,
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "#F4F6FA",
          }}
        >
          {count}
        </span>
        {btn("+", 1, false)}
        {btn("+10", 10, true)}
      </span>
    </div>
  );
}

// rgba() from a #rrggbb hex + alpha — the design leans on translucent accents.
function hex(color, alpha) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
