// Uniform spatial-hash grid over the battlefield, so each Unit can find its
// nearest enemy without scanning all others. Rebuilt each tick from living
// Units. Cell/key scheme ported from the design prototype (offset keeps keys
// positive inside the ±58 battlefield bounds).

const CELL = 4;

export const cellKey = (x, z) => (((x / CELL + 128) | 0) * 512) + ((z / CELL + 128) | 0);

export function buildGrid(world) {
  const { n, posX, posZ, alive } = world;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    if (!alive[i]) continue;
    const k = cellKey(posX[i], posZ[i]);
    let bucket = map.get(k);
    if (!bucket) {
      bucket = [];
      map.set(k, bucket);
    }
    bucket.push(i);
  }
  return map;
}

// Nearest living enemy of Unit i within maxRing rings of cells; -1 if none.
export function nearestEnemy(grid, world, i, maxRing) {
  const { posX, posZ, team } = world;
  const x = posX[i];
  const z = posZ[i];
  const myTeam = team[i];
  const cx = (x / 4 + 128) | 0;
  const cz = (z / 4 + 128) | 0;

  let best = -1;
  let bestD = Infinity;

  for (let ring = 0; ring <= maxRing; ring++) {
    for (let gx = cx - ring; gx <= cx + ring; gx++) {
      for (let gz = cz - ring; gz <= cz + ring; gz++) {
        if (Math.max(Math.abs(gx - cx), Math.abs(gz - cz)) !== ring) continue;
        const bucket = grid.get(gx * 512 + gz);
        if (!bucket) continue;
        for (let b = 0; b < bucket.length; b++) {
          const j = bucket[b];
          if (j === i || team[j] === myTeam) continue;
          const dx = posX[j] - x;
          const dz = posZ[j] - z;
          const d = dx * dx + dz * dz;
          if (d < bestD) {
            bestD = d;
            best = j;
          }
        }
      }
    }
    // One extra ring after the first hit so a diagonal neighbour can't shadow
    // a nearer unit in the next ring (ported behaviour from the prototype).
    if (best >= 0 && ring > 0) break;
  }

  return best;
}
