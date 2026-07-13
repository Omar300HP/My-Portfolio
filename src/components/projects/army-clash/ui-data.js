// UI-side vocabulary for Army Clash: labels, presets and colors from the
// design handoff. Domain type names follow CONTEXT.md.

export const ARMY_COLORS = { A: "#BEF264", B: "#67E8F9" };

export const UNIT_ORDER = ["swordsman", "spearman", "archer", "cavalry"];

export const UNIT_META = {
  swordsman: { label: "Swordsman", glyph: "SW", sub: "line infantry · even vs spears" },
  spearman: { label: "Spearman", glyph: "SP", sub: "pike wall · hard-counters cavalry" },
  archer: { label: "Foot Archer", glyph: "AR", sub: "ranged volleys · folds in melee" },
  cavalry: { label: "Cavalry", glyph: "CV", sub: "shock flanks · overruns SW & AR" },
};

export const BALANCED = { swordsman: 60, spearman: 50, archer: 45, cavalry: 25 };
export const EMPTY = { swordsman: 0, spearman: 0, archer: 0, cavalry: 0 };

export const PRESETS = [
  ["BALANCED", BALANCED],
  ["PIKE WALL", { swordsman: 20, spearman: 120, archer: 40, cavalry: 0 }],
  ["CAV RUSH", { swordsman: 0, spearman: 0, archer: 30, cavalry: 130 }],
  ["ARCHERS", { swordsman: 30, spearman: 30, archer: 120, cavalry: 0 }],
  ["CLEAR", EMPTY],
];

export const UNIT_CAP = 300;

export const MONO = "'JetBrains Mono', ui-monospace, monospace";
export const GROTESK = "'Space Grotesk', system-ui, sans-serif";

export const totalUnits = (cfg) => UNIT_ORDER.reduce((sum, t) => sum + cfg[t], 0);

export const cfgToUnits = (cfg) =>
  UNIT_ORDER.map((type) => ({ type, count: cfg[type] })).filter((u) => u.count > 0);

export const unitsToCfg = (units) => {
  const cfg = { ...EMPTY };
  for (const u of units) cfg[u.type] = (cfg[u.type] || 0) + u.count;
  return cfg;
};

export const formatClock = (t) => {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

export const vetCore = (cfg) =>
  `SW ${cfg.swordsman} · SP ${cfg.spearman} · AR ${cfg.archer} · CV ${cfg.cavalry}`;

export const newSeed = () => ((Math.random() * 90000) | 0) + 1000;
