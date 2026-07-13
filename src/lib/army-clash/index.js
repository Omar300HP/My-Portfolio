// Public interface of the Army Clash simulation — the single test seam.
// No React / Three.js / DOM here: pure, deterministic domain logic.

import { createSimulation } from "./simulation";

export { createSimulation } from "./simulation";
export { UNIT_TYPES, TYPE_NAMES } from "./constants";

// Run a Battle to completion and return its result. Convenience over
// createSimulation(...).run() for headless use.
export function simulateBattle(config) {
  return createSimulation(config).run();
}
