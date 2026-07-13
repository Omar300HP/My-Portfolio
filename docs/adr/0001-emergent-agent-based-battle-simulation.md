# Battle outcome is an emergent agent-based simulation, not a statistical resolution

The battle game (*Army Clash*) could decide winners with a formula (Lanchester's laws / weighted stats + RNG) and play a scripted animation on top. We instead simulate **every Unit as an autonomous agent** — position, health, target-seeking, melee/ranged attack, type counters — and let the Winner *emerge*; the Cinematic is a directed camera riding over that live simulation. Chosen because the project's purpose is to demonstrate software-engineering depth in a portfolio: a real emergent system (spatial logic, fixed-timestep loop, counter dynamics) is the substance on show, and the technical audience being courted would see straight through on-rails theatre.

## Considered options

- **Statistical / formula resolution + scripted cinematic** — rejected: the combat is fake and demonstrates no engineering.
- **Hybrid coarse-blob sim** — rejected: neither genuinely emergent nor meaningfully simpler.

## Consequences

- Combat correctness and balance become real work, not a lookup table.
- Determinism is required — the sim is **seeded and fixed-timestep**, so battles are reproducible and debuggable (and shareable later).
