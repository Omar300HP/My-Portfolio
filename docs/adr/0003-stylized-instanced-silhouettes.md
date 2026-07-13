# Units render as stylized merged-primitive silhouettes, instanced

Supersedes ADR-0002. The design handoff (Claude Design, `portfolio-redesign-request/`)
resolved Army Clash's look: each Unit Type is a handful of primitives merged into one
BufferGeometry, drawn as a single InstancedMesh per army × type (8 draw calls for the
whole field), with bob/death-collapse/flee animation, hp-driven tint, and arrow volleys
as a ninth instanced mesh. Chosen over ADR-0002's rigged-glTF-plus-impostor-LOD plan
because it needs no art pipeline or licensing, trivially holds 60fps at the 300/side cap,
reads clearly at cinematic distance (type = silhouette, army = color), and visually
extends the site's abstract engineering aesthetic.

## Consequences

- No asset pipeline exists; changing a Unit's look is a geometry-code edit.
- The LOD/impostor machinery was never built — at ≤600 total instanced units it has
  nothing to earn. If unit counts ever grow ~10×, reopen ADR-0002 rather than bolting
  detail onto this representation.
