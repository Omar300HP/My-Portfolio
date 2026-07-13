import { ARMY_COLORS, MONO } from "./ui-data";

// Battle HUD: morale bars + alive counts per Army, the phase/clock/speed
// cluster, and the camera hint / resume-director control. The fast-changing
// values are written directly into the DOM by the frame loop via `bridge`.
export default function BattleHud({ bridge, isManual, onResumeDirector }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Army A */}
        <div style={{ flex: "0 1 320px", minWidth: 220 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: MONO,
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              color: ARMY_COLORS.A,
              marginBottom: 6,
            }}
          >
            <span>
              ARMY A ·{" "}
              <span
                ref={(el) => {
                  bridge.aliveA = el;
                }}
              >
                0
              </span>
            </span>
            <span style={{ color: "#7b8391" }}>MORALE</span>
          </div>
          <div
            style={{
              height: 7,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              ref={(el) => {
                bridge.moraleA = el;
              }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 4,
                background: ARMY_COLORS.A,
                boxShadow: "0 0 12px rgba(190,242,100,0.6)",
                transition: "width .3s",
              }}
            />
          </div>
        </div>

        {/* Phase / clock / speed */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            ref={(el) => {
              bridge.phase = el;
            }}
            style={{
              fontFamily: MONO,
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              color: "#F4F6FA",
              background: "rgba(12,15,21,0.8)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "7px 16px",
            }}
          >
            DEPLOY
          </span>
          <span style={{ display: "flex", gap: 8 }}>
            <span
              ref={(el) => {
                bridge.clock = el;
              }}
              style={{ fontFamily: MONO, fontSize: "0.66rem", color: "#8b93a2" }}
            >
              0:00
            </span>
            <span
              ref={(el) => {
                bridge.speed = el;
              }}
              style={{ fontFamily: MONO, fontSize: "0.66rem", color: "#8b93a2" }}
            >
              1.0×
            </span>
          </span>
        </div>

        {/* Army B */}
        <div style={{ flex: "0 1 320px", minWidth: 220 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: MONO,
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              color: ARMY_COLORS.B,
              marginBottom: 6,
            }}
          >
            <span style={{ color: "#7b8391" }}>MORALE</span>
            <span>
              <span
                ref={(el) => {
                  bridge.aliveB = el;
                }}
              >
                0
              </span>{" "}
              · ARMY B
            </span>
          </div>
          <div
            style={{
              height: 7,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
              direction: "rtl",
            }}
          >
            <div
              ref={(el) => {
                bridge.moraleB = el;
              }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 4,
                background: ARMY_COLORS.B,
                boxShadow: "0 0 12px rgba(103,232,249,0.6)",
                transition: "width .3s",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {isManual ? (
          <button
            type="button"
            onClick={onResumeDirector}
            className="ac-resume"
            style={{
              pointerEvents: "auto",
              border: "1px solid #BEF264",
              background: "rgba(190,242,100,0.1)",
              color: "#BEF264",
              borderRadius: 999,
              padding: "9px 18px",
              fontFamily: MONO,
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              cursor: "pointer",
              transition: ".15s",
            }}
          >
            ⟲ RESUME DIRECTOR
          </button>
        ) : (
          <span
            style={{
              fontFamily: MONO,
              fontSize: "0.64rem",
              letterSpacing: "0.14em",
              color: "#626b7a",
              background: "rgba(12,15,21,0.7)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 999,
              padding: "8px 16px",
            }}
          >
            DRAG TO TAKE THE CAMERA · SCROLL TO ZOOM
          </span>
        )}
      </div>
    </div>
  );
}
