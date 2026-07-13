import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createSimulation, nextRoundArmies } from "@/lib/army-clash";
import { usePrefersReducedMotion } from "@/components/portfolio/hooks";
import {
  BALANCED,
  EMPTY,
  UNIT_CAP,
  cfgToUnits,
  formatClock,
  newSeed,
  totalUnits,
  unitsToCfg,
  vetCore,
} from "./ui-data";
import BattleCanvas from "./BattleCanvas";
import TopBar from "./TopBar";
import SetupOverlay from "./SetupOverlay";
import BattleHud from "./BattleHud";
import ResultsOverlay from "./ResultsOverlay";

// The Army Clash game. React state drives which screen shows (setup → battle
// → results); everything per-frame (sim stepping, camera, HUD counters) lives
// on a mutable `game` object shared with the canvas so the render loop never
// causes React re-renders.
export default function ArmyClash() {
  const reduced = usePrefersReducedMotion();

  const [mode, setMode] = useState("setup");
  const [cfgA, setCfgA] = useState(BALANCED);
  const [cfgB, setCfgB] = useState(BALANCED);
  const [seed, setSeed] = useState(42137);
  const [roundNum, setRoundNum] = useState(1);
  const [vetSide, setVetSide] = useState(null);
  const [toast, setToast] = useState("");
  const [isManual, setIsManual] = useState(false);
  const [result, setResult] = useState(null);

  // Mutable per-frame state, owned here, driven inside the canvas frame loop.
  const game = useRef({
    sim: null,
    running: false,
    acc: 0,
    timeScale: 1,
    climaxHandled: false,
    climaxEndAt: 0,
    uiPhase: null,
    endScheduled: false,
    manual: false,
    orbit: { theta: 0.6, phi: 0.42, r: 62 },
    deathClock: null,
    reduced: false,
    mode: "setup",
    onDecided: null,
  }).current;
  game.reduced = reduced;
  game.mode = mode;

  const bridge = useRef({}).current; // DOM refs the frame loop writes into

  const rebuildPreview = useCallback(
    (a, b, s) => {
      const sim = createSimulation({
        armies: [
          { id: "A", units: cfgToUnits(a) },
          { id: "B", units: cfgToUnits(b) },
        ],
        seed: s,
      });
      game.sim = sim;
      game.deathClock = new Float32Array(sim.world.n).fill(-1);
      game.running = false;
    },
    [game],
  );

  // Deploy preview: in setup mode the composed armies stand on the field.
  useEffect(() => {
    if (mode === "setup") rebuildPreview(cfgA, cfgB, seed);
  }, [mode, cfgA, cfgB, seed, rebuildPreview]);

  const adjust = (army, type, delta) => {
    const [cfg, setCfg] = army === "A" ? [cfgA, setCfgA] : [cfgB, setCfgB];
    const next = { ...cfg, [type]: Math.max(0, cfg[type] + delta) };
    const total = totalUnits(next);
    if (total > UNIT_CAP) {
      next[type] -= total - UNIT_CAP;
      setToast(`CAP ${UNIT_CAP}/SIDE — KEEPS THE SIM AT 60FPS`);
    } else {
      setToast("");
    }
    setCfg(next);
  };

  const applyPreset = (army, presetCfg) => {
    (army === "A" ? setCfgA : setCfgB)({ ...presetCfg });
    setToast("");
  };

  const lastSetup = useRef(null);

  const launch = useCallback(
    (setup) => {
      const sim = createSimulation({
        armies: [
          { id: "A", units: cfgToUnits(setup.cfgA) },
          { id: "B", units: cfgToUnits(setup.cfgB) },
        ],
        seed: setup.seed,
      });
      game.sim = sim;
      game.deathClock = new Float32Array(sim.world.n).fill(-1);
      game.running = true;
      game.acc = 0;
      game.timeScale = 1;
      game.climaxHandled = false;
      game.uiPhase = null;
      game.endScheduled = false;
      game.manual = false;
      setIsManual(false);
      setResult(null);
      setToast("");
      setMode("battle");
    },
    [game],
  );

  const startBattle = () => {
    if (!totalUnits(cfgA) || !totalUnits(cfgB)) {
      setToast("BOTH ARMIES NEED AT LEAST ONE UNIT");
      return;
    }
    lastSetup.current = { cfgA: { ...cfgA }, cfgB: { ...cfgB }, seed };
    launch(lastSetup.current);
  };

  // Called by the frame loop (via timeout) once the Battle is decided.
  game.onDecided = useCallback(
    (simResult) => {
      const sum = (byType) => Object.values(byType).reduce((a, c) => a + c, 0);
      const vetCounts = unitsToCfg(nextRoundArmies(simResult)[simResult.winner]);
      setResult({
        winner: simResult.winner,
        loser: simResult.loser,
        seed: lastSetup.current?.seed ?? seed,
        clock: formatClock(simResult.routedAt),
        survivors: sum(simResult.survivors[simResult.winner]),
        fielded: sum(simResult.fielded[simResult.winner]),
        vetCounts,
        rows: [
          {
            label: "FIELDED",
            a: String(sum(simResult.fielded.A)),
            b: String(sum(simResult.fielded.B)),
          },
          {
            label: "SURVIVORS",
            a: String(sum(simResult.standing.A)),
            b: String(sum(simResult.standing.B)),
          },
          {
            label: "VETERAN CORE",
            a: simResult.winner === "A" ? vetCore(vetCounts) : "—",
            b: simResult.winner === "B" ? vetCore(vetCounts) : "—",
          },
        ],
      });
      setMode("results");
    },
    [seed],
  );

  const replayBattle = () => {
    if (lastSetup.current) launch(lastSetup.current);
  };

  const restartAll = () => {
    setCfgA(BALANCED);
    setCfgB(BALANCED);
    setSeed(newSeed());
    setRoundNum(1);
    setVetSide(null);
    setResult(null);
    setIsManual(false);
    game.manual = false;
    setMode("setup");
  };

  const nextRound = () => {
    if (!result) return;
    if (result.winner === "A") {
      setCfgA({ ...result.vetCounts });
      setCfgB({ ...EMPTY });
    } else {
      setCfgB({ ...result.vetCounts });
      setCfgA({ ...EMPTY });
    }
    setVetSide(result.winner);
    setRoundNum((r) => r + 1);
    setSeed(newSeed());
    setResult(null);
    setIsManual(false);
    game.manual = false;
    setMode("setup");
  };

  const resumeDirector = () => {
    game.manual = false;
    setIsManual(false);
  };

  // Pointer / wheel camera control: dragging or scrolling takes the camera.
  const hostRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let downId = null;
    let lx = 0;
    let ly = 0;
    let moved = 0;

    const takeCamera = () => {
      if (!game.manual) {
        game.manual = true;
        if (modeRef.current === "battle") setIsManual(true);
      }
    };
    const down = (e) => {
      if (e.target.closest && e.target.closest("button,a")) return;
      downId = e.pointerId;
      lx = e.clientX;
      ly = e.clientY;
      moved = 0;
    };
    const move = (e) => {
      if (downId === null) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 6) takeCamera();
      if (game.manual) {
        game.orbit.theta -= dx * 0.0055;
        game.orbit.phi = Math.max(0.12, Math.min(1.25, game.orbit.phi + dy * 0.004));
      }
    };
    const up = () => {
      downId = null;
    };
    const wheel = (e) => {
      e.preventDefault();
      takeCamera();
      game.orbit.r = Math.max(14, Math.min(150, game.orbit.r * (1 + e.deltaY * 0.001)));
    };

    host.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    host.addEventListener("wheel", wheel, { passive: false });
    return () => {
      host.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      host.removeEventListener("wheel", wheel);
    };
  }, [game]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0C11",
        color: "#E9ECF1",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div ref={hostRef} style={{ position: "absolute", inset: 0, cursor: "grab", touchAction: "none" }}>
        <BattleCanvas game={game} bridge={bridge} />
      </div>

      <TopBar seed={seed} roundNum={roundNum} bridge={bridge} />

      {mode === "setup" && (
        <SetupOverlay
          cfgA={cfgA}
          cfgB={cfgB}
          roundNum={roundNum}
          vetSide={vetSide}
          toast={toast}
          onAdjust={adjust}
          onPreset={applyPreset}
          onStart={startBattle}
        />
      )}

      {mode === "battle" && (
        <BattleHud bridge={bridge} isManual={isManual} onResumeDirector={resumeDirector} />
      )}

      {mode === "results" && result && (
        <ResultsOverlay
          result={result}
          onNextRound={nextRound}
          onReplay={replayBattle}
          onRestart={restartAll}
        />
      )}
    </div>
  );
}
