import {
  ARCHER,
  CAVALRY,
  DEPLOY_GAP,
  SPEARMAN,
  STATS,
  SWORDSMAN,
  TYPE_ID,
} from "./constants";
import { makeRng } from "./rng";

// Build the Structure-of-Arrays world from two Army configs + a seed, with the
// auto-formation deployment from the design prototype: spearmen form the front
// ranks, swordsmen behind them, archers behind the infantry block, cavalry
// split into two flank blocks. Army A faces +z from negative z; B mirrors.
// An Army config is `{ id, units: [{ type, count }, ...] }`.
export function buildWorld({ armies, seed = 0, deployGap = DEPLOY_GAP }) {
  const rng = makeRng(seed);

  let n = 0;
  for (const a of armies) for (const u of a.units) n += u.count;

  const world = {
    n,
    posX: new Float32Array(n),
    posZ: new Float32Array(n),
    hp: new Float32Array(n),
    maxHp: new Float32Array(n),
    yaw: new Float32Array(n),
    cd: new Float32Array(n),
    retarget: new Float32Array(n),
    team: new Uint8Array(n),
    type: new Uint8Array(n),
    alive: new Uint8Array(n),
    fleeing: new Uint8Array(n),
    target: new Int32Array(n).fill(-1),
    ids: armies.map((a, i) => a.id ?? (i === 0 ? "A" : "B")),
  };

  let idx = 0;
  const place = (ti, tid, x, z) => {
    const hp = STATS.hp[tid];
    world.posX[idx] = x;
    world.posZ[idx] = z;
    world.hp[idx] = hp;
    world.maxHp[idx] = hp;
    world.team[idx] = ti;
    world.type[idx] = tid;
    world.alive[idx] = 1;
    world.yaw[idx] = ti === 0 ? 0 : Math.PI;
    world.cd[idx] = rng() * STATS.cooldown[tid];
    world.retarget[idx] = rng() * 0.5;
    idx++;
  };

  armies.forEach((armyCfg, ti) => {
    const count = (type) =>
      armyCfg.units
        .filter((u) => TYPE_ID[u.type] === type)
        .reduce((a, u) => a + u.count, 0);

    const spears = count(SPEARMAN);
    const swords = count(SWORDSMAN);
    const archers = count(ARCHER);
    const cavalry = count(CAVALRY);

    const side = ti === 0 ? -1 : 1;
    const z0 = (side * deployGap) / 2;

    // Infantry block — spearmen first so they fill the front ranks.
    const inf = [];
    for (let i = 0; i < spears; i++) inf.push(SPEARMAN);
    for (let i = 0; i < swords; i++) inf.push(SWORDSMAN);
    const cols = Math.max(8, Math.min(34, Math.ceil(Math.sqrt(Math.max(1, inf.length) * 2.4))));
    const cw = 1.7;
    const rw = 2.0;
    inf.forEach((tid, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      place(ti, tid, (col - (cols - 1) / 2) * cw + (rng() - 0.5) * 0.5, z0 + side * row * rw);
    });

    // Archers — behind the infantry block.
    const infRows = Math.ceil(inf.length / cols);
    const acols = Math.max(6, cols - 4);
    for (let i = 0; i < archers; i++) {
      const row = Math.floor(i / acols);
      const col = i % acols;
      place(
        ti,
        ARCHER,
        (col - (acols - 1) / 2) * 2.0 + (rng() - 0.5) * 0.5,
        z0 + side * ((infRows + 1.4) * rw + row * 2.1),
      );
    }

    // Cavalry — split into two flank blocks just outside the infantry frontage.
    const half = Math.ceil(cavalry / 2);
    const fx = cols * cw * 0.5 + 6;
    for (let i = 0; i < cavalry; i++) {
      const blk = i < half ? -1 : 1;
      const j = i < half ? i : i - half;
      const row = Math.floor(j / 5);
      const col = j % 5;
      place(
        ti,
        CAVALRY,
        blk * (fx + col * 2.1) + (rng() - 0.5) * 0.6,
        z0 + side * (row * 2.6 + 1),
      );
    }
  });

  return world;
}
