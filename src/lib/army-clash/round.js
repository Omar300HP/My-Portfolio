import { TYPE_NAMES } from "./constants";

// The Round transition (CONTEXT.md): starting another Round carries the
// Winner's Survivors forward — healed to full by construction, since a new
// Battle always builds Units at full HP — while the losing Army is rebuilt
// from scratch by the player. Returns fresh unit lists keyed by army id.
export function nextRoundArmies(result) {
  const winnerUnits = TYPE_NAMES.map((name) => ({
    type: name,
    count: result.survivors[result.winner][name] || 0,
  })).filter((u) => u.count > 0);

  return {
    [result.winner]: winnerUnits,
    [result.loser]: [],
  };
}
