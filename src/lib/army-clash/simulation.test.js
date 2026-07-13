import { describe, it, expect } from "vitest";
import { simulateBattle, createSimulation } from "./index";

const army = (id, units) => ({ id, units });
const only = (type, count) => [{ type, count }];
const alive = (side) => Object.values(side).reduce((a, c) => a + c, 0);

function meanZ(world, team) {
  let sum = 0;
  let n = 0;
  for (let i = 0; i < world.n; i++) {
    if (!world.alive[i] || world.team[i] !== team) continue;
    sum += world.posZ[i];
    n += 1;
  }
  return n ? sum / n : 0;
}

describe("simulateBattle — resolution", () => {
  it("a numerically superior army wins and wipes out the weaker one", () => {
    const result = simulateBattle({
      armies: [army("A", only("swordsman", 12)), army("B", only("swordsman", 3))],
      seed: 1,
    });

    expect(result.winner).toBe("A");
    expect(alive(result.survivors.B)).toBe(0);
    expect(alive(result.survivors.A)).toBeGreaterThan(0);
  });
});

describe("simulateBattle — determinism", () => {
  it("the same armies and seed reproduce an identical battle", () => {
    const config = {
      armies: [
        army("A", only("cavalry", 20)),
        army("B", [
          { type: "archer", count: 10 },
          { type: "spearman", count: 10 },
        ]),
      ],
      seed: 42,
    };

    const r1 = simulateBattle(config);
    const r2 = simulateBattle(config);

    expect(r1.winner).toBe(r2.winner);
    expect(r1.steps).toBe(r2.steps);
    expect(r1.survivors).toEqual(r2.survivors);
    expect(Array.from(r1.world.posX)).toEqual(Array.from(r2.world.posX));
    expect(Array.from(r1.world.hp)).toEqual(Array.from(r2.world.hp));
  });
});

describe("createSimulation — seeking", () => {
  it("armies advance toward each other over time", () => {
    const sim = createSimulation({
      armies: [army("A", only("swordsman", 9)), army("B", only("swordsman", 9))],
      seed: 7,
    });

    // A deploys on negative z, B on positive z — the gap closes as they seek.
    const gapStart = meanZ(sim.world, 1) - meanZ(sim.world, 0);
    for (let i = 0; i < 60; i++) sim.tick();
    const gapAfter = meanZ(sim.world, 1) - meanZ(sim.world, 0);

    expect(gapStart).toBeGreaterThan(0);
    expect(gapAfter).toBeLessThan(gapStart);
  });
});

describe("simulateBattle — the Counter matrix and Engagement Range (T3)", () => {
  it("an all-Spearman Army breaks an equal all-Cavalry Army", () => {
    const result = simulateBattle({
      armies: [army("A", only("spearman", 40)), army("B", only("cavalry", 40))],
      seed: 11,
    });
    expect(result.winner).toBe("A");
  });

  it("an all-Cavalry Army overruns an equal all-Foot-Archer Army", () => {
    const result = simulateBattle({
      armies: [army("A", only("cavalry", 40)), army("B", only("archer", 40))],
      seed: 12,
    });
    expect(result.winner).toBe("A");
  });

  it("an all-Cavalry Army beats an equal all-Swordsman Army", () => {
    const result = simulateBattle({
      armies: [army("A", only("cavalry", 40)), army("B", only("swordsman", 40))],
      seed: 13,
    });
    expect(result.winner).toBe("A");
  });

  it("melee infantry beats Foot Archers forced into melee (no room to kite)", () => {
    // A cramped field: the armies deploy adjacent and the walls leave the
    // archers nowhere to back away to, so the fight is melee from the start.
    const result = simulateBattle({
      armies: [army("A", only("swordsman", 40)), army("B", only("archer", 40))],
      seed: 14,
      deployGap: 6,
      fieldBounds: 8,
    });
    expect(result.winner).toBe("A");
  });
});
