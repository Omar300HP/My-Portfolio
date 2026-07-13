# Portfolio

The ubiquitous language for this portfolio site and the projects it showcases. The site is a Next.js portfolio; its first interactive project is a real-time, agent-based **battle simulation** (working title *Army Clash*) living under the Projects area.

## Language

### Site structure

**Work**:
The section of the site presenting professional/career experience (roles, employers, impact). Distinct from Projects.
_Avoid_: Projects, portfolio pieces

**Projects**:
The area of the site showcasing things built — interactive demos and applications, each on its own page. The battle simulation is the first Project.
_Avoid_: Work, Lab, Playground, experiments

### Battle simulation

**Army**:
One of the two opposing forces in a Battle, assembled by the player from Units before the Battle begins. Each side controls exactly one Army.
_Avoid_: team, faction, side

**Unit**:
A single autonomous combatant, with a position on the battlefield, health, and one Unit Type. The Battle is simulated at the level of individual Units (agent-based) — units seek, close with, and fight enemy units; outcomes are not decided by aggregate formula.
_Avoid_: soldier, troop, agent, entity

**Unit Type**:
One of four archetypes governing a Unit's behavior and combat effectiveness:

- **Swordsman** — melee infantry, generalist. Even match against a Spearman.
- **Spearman** — melee infantry specialised against Cavalry. Even match against a Swordsman.
- **Foot Archer** — ranged infantry. Strong against melee infantry at a distance; overwhelmed by any Unit that reaches melee range.
- **Cavalry** — fast melee shock unit. Strong against Swordsmen and Foot Archers; countered by Spearmen.

**Counter** (type advantage):
The rock-paper-scissors relationship between Unit Types. Cavalry beats Swordsmen and Foot Archers → Spearmen beat Cavalry → Foot Archers beat melee infantry at range → any melee infantry beats Foot Archers in melee; Swordsman vs Spearman is even. Combat effectiveness is a function of Counter *and* Engagement Range together.
_Avoid_: bonus, multiplier

**Engagement Range**:
The distance at which a Unit can deal damage. Foot Archers damage enemies from afar; every other Unit deals damage only on contact (melee). A Foot Archer's advantage over infantry disappears once that infantry closes to melee range.
_Avoid_: reach, attack distance

### Battle lifecycle

**Battle**:
A single simulated clash between the two Armies, run until one Army's Morale breaks and it Routs. One person configures both Armies before it starts — this is a single-player sandbox for exploring "what beats what," not a two-human contest.
_Avoid_: match, fight, game, simulation (reserve "simulation" for the engine)

**Morale**:
An Army's collective will to keep fighting, eroded by casualties and by being outmatched (e.g. Cavalry hitting an exposed flank). When it falls past a breaking point, the Army Routs.
_Avoid_: courage, spirit, willpower

**Rout**:
The collapse of a broken Army — its Units stop fighting and flee the field. A Rout ends the Battle and decides the Winner. Routed Units are lost.
_Avoid_: retreat, flee, surrender

**Winner**:
The Army still holding the field when the opposing Army Routs. A Battle ends on a Rout, not on total annihilation; there is no draw.
_Avoid_: victor, champion

**Survivors** (the remnant):
The Winner's Units still alive and holding when the enemy Routs. They carry into the next Round (healed to full). The losing Army's Routed Units are considered scattered and do **not** carry forward — the loser rebuilds from scratch.
_Avoid_: remaining, leftovers, veterans

**Round**:
One setup-then-Battle cycle. After a Battle, starting **another Round** carries the Winner's Survivors forward (healed to full HP), rebuilds the losing Army from scratch, and lets the player adjust both Armies before the next Battle. Contrast with **Restart**.
_Avoid_: turn, level, wave

**Restart**:
Clearing both Armies back to an empty setup, discarding all Survivors — as opposed to **another Round**, which carries the remnant forward.
_Avoid_: reset, new game

**Reinforcements**:
Units a player adds to an Army during setup — the whole of a rebuilt losing Army, or additions to the Winner's remnant, between Rounds.
_Avoid_: additions, recruits

### Presentation

**Cinematic**:
The directed-camera presentation of a Battle: a sequence of shots — **Deploy → Advance → Clash → Resolution → Victory** — driven by the live simulation's state, with a slow-motion climax on the decisive moment. The player may seize manual camera control (drag to orbit) and hand it back to the director.
_Avoid_: replay, cutscene, animation, movie
