# Render animated models near-camera, impostor LOD for the distant mass

**Status: superseded by ADR-0003.** The Claude Design handoff settled unit
visuals on instanced merged-primitive silhouettes — no rigged models, no LOD.

Units are drawn as **animated low-poly character models close to the camera** and as **cheap instanced impostors/primitives for the far mass** — rather than uniform primitives everywhere, or fully-animated models everywhere. Skinned character crowds are the single most expensive thing to render; naïve `SkinnedMesh` collapses past a few dozen, so near-camera Units use baked vertex-animation textures / instanced GPU skinning while the distant field degrades to impostors (the standard large-battle technique). Chosen to keep the visceral "real soldiers fighting" look exactly where the directed Cinematic camera spends its time, while still holding **hundreds per side at 60fps**.

## Considered options

- **Uniform geometric primitives everywhere** — rejected as the primary look (less impressive, off the desired feel), but it survives *as* the far-LOD impostor representation, so the work isn't wasted.
- **Fully-animated models everywhere** — rejected: won't hold framerate at hundreds of Units.

## Consequences

- Introduces an **art pipeline** (four rigged/animated Unit Types) and a bundle-size cost, and intentionally shifts the piece's aesthetic away from the site's abstract HUD toward "game."
- Scope is **deliberately bounded to a CPU sim at hundreds/side** — no GPU simulation or million-Unit path. This is a one-shot portfolio piece; building for scale that will never arrive would be speculative over-engineering. If that judgement is ever revisited, this is the constraint to reopen.
