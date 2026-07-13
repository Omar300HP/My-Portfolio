import { describe, it, expect } from "vitest";
import { createSimulation, nextRoundArmies, simulateBattle } from "./index";

const army = (id, units) => ({ id, units });
const only = (type, count) => [{ type, count }];

describe("nextRoundArmies — the Round transition (T7)", () => {
  const result = simulateBattle({
    armies: [army("A", only("swordsman", 60)), army("B", only("swordsman", 20))],
    seed: 5,
  });

  it("carries the Winner's Survivors forward and rebuilds the loser from scratch", () => {
    const next = nextRoundArmies(result);

    const carried = next.A.reduce((sum, u) => sum + u.count, 0);
    const survivorCount = Object.values(result.survivors.A).reduce((a, c) => a + c, 0);

    expect(result.winner).toBe("A");
    expect(carried).toBe(survivorCount);
    expect(carried).toBeGreaterThan(0);
    expect(next.B).toEqual([]);
  });

  it("Survivors enter the next Battle healed to full", () => {
    const next = nextRoundArmies(result);
    const sim = createSimulation({
      armies: [army("A", next.A), army("B", only("spearman", 30))],
      seed: 6,
    });

    for (let i = 0; i < sim.world.n; i++) {
      expect(sim.world.hp[i]).toBe(sim.world.maxHp[i]);
    }
  });
});
