// The Projects showcase — interactive things built, each on its own page.
// Deliberately distinct from WORK (career experience) in the portfolio.

export const PROJECTS = [
  {
    slug: "army-clash",
    href: "/projects/army-clash",
    title: "Army Clash",
    tagline:
      "A real-time, agent-based battle simulation. Compose two armies, press start, and watch an emergent clash unfold as a directed cinematic.",
    status: "In development",
    year: "2026",
    tags: ["Three.js", "react-three-fiber", "Simulation", "WebGL", "Vitest"],
    spec: [
      { k: "ENGINE", v: "emergent agent sim" },
      { k: "SCALE", v: "hundreds per side" },
      { k: "RENDER", v: "instanced · LOD" },
    ],
  },
];
