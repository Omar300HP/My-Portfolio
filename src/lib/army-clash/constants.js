// Domain constants for the battle simulation. Vocabulary follows CONTEXT.md;
// the numeric tuning is ported 1:1 from the Claude Design prototype
// (portfolio-redesign-request/project/Army Clash.dc.html), which plays well.

export const UNIT_TYPES = {
  SWORDSMAN: "swordsman",
  SPEARMAN: "spearman",
  ARCHER: "archer",
  CAVALRY: "cavalry",
};

// id ↔ name mapping so Unit Type can live in a typed array (Structure-of-Arrays).
export const TYPE_NAMES = ["swordsman", "spearman", "archer", "cavalry"];
export const TYPE_ID = { swordsman: 0, spearman: 1, archer: 2, cavalry: 3 };
export const SWORDSMAN = 0;
export const SPEARMAN = 1;
export const ARCHER = 2;
export const CAVALRY = 3;

// Per-type stats, indexed by type id: [swordsman, spearman, archer, cavalry].
//   hp       — health
//   speed    — world units / second
//   damage   — damage per hit
//   cooldown — seconds between attacks
//   range    — Engagement Range: distance at which the Unit can deal damage
//   weight   — morale weight (how much losing this Unit hurts the Army)
export const STATS = {
  hp: [100, 100, 70, 160],
  speed: [4.3, 4.0, 4.5, 9.2],
  damage: [10, 12, 7, 13],
  cooldown: [0.8, 0.9, 1.6, 0.7],
  range: [1.8, 2.5, 26, 2.2],
  weight: [1, 1, 1, 1.5],
};

// The Counter matrix (CONTEXT.md): a multiplier on attacker damage given the
// attacker/defender Unit Types and whether the attack is ranged.
// Cavalry > Swordsman & Archer · Spearman > Cavalry · melee > Archer ·
// Archers fight at full strength only at range.
export function counterMultiplier(a, b, ranged) {
  if (a === CAVALRY) {
    return b === SWORDSMAN ? 2.0 : b === ARCHER ? 2.6 : b === SPEARMAN ? 0.5 : 1;
  }
  if (a === SPEARMAN && b === CAVALRY) return 2.6;
  if (a === ARCHER) return ranged ? (b === CAVALRY ? 0.8 : 1) : 0.45;
  if (b === ARCHER) return 1.7;
  // Sword-vs-spear should be a coin flip (CONTEXT.md): the spear's longer
  // reach wins the first strike, so the swordsman hits harder once inside it.
  if (a === SWORDSMAN && b === SPEARMAN) return 1.12;
  return 1;
}

// Archer specifics: they volley at range but are near-helpless in melee, and
// back away (kite) from approaching melee enemies.
export const ARCHER_MELEE_RANGE = 1.9;
export const ARCHER_MELEE_DAMAGE = 4;
export const ARCHER_MELEE_COOLDOWN = 1.0;
export const ARCHER_MIN_VOLLEY_DIST = 2.6;
export const ARCHER_KITE_DIST = 10;
export const ARCHER_KITE_SPEED = 0.9;
export const ARROW_SPEED = 26;
export const ARROW_HIT_RADIUS = 2.4;

// Fixed simulation timestep (seconds) and a hard step cap as a terminal backstop.
export const DT = 1 / 30;
export const MAX_STEPS = 20000;

// Battlefield: distance between the two Armies' front ranks at deploy, and the
// square bound units are clamped inside.
export const DEPLOY_GAP = 64;
export const BOUNDS = 58;

// Morale: an Army's will to fight, from 1 (fresh) to 0 (broken → Rout).
// Derived from its weighted surviving fraction, floored so the first ~30% of
// losses are absorbed, and pushed down when the enemy is in better shape.
export const MORALE_FLOOR = 0.3;
export const MORALE_PRESSURE = 0.45;
// One-shot cinematic climax signal when either Army's Morale first dips here.
export const CLIMAX_MORALE = 0.2;
// A dead-even grind is decided at this sim time: the lower-Morale Army routs.
export const STALEMATE_TIME = 75;
export const FLEE_SPEED_MULT = 1.35;

// Targeting/motion tuning.
export const RETARGET_BASE = 0.45;
export const RETARGET_JITTER = 0.2;
export const NEAREST_MAX_RING = 7;
export const SEPARATION_DIST_SQ = 1.21;
export const SEPARATION_PUSH = 2.2;
