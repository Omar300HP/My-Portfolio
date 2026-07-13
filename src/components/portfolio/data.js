// Content + config for the portfolio, extracted 1:1 from the imported design.

export const ACCENT = "#BEF264";
export const ACCENT_OPTIONS = ["#BEF264", "#5EEAD4", "#FDBA57", "#C4A6FF"];
export const ACCENT_SECONDARY = "#67E8F9"; // cyan used in the 3D scene

export const BRAND = {
  initials: "OA",
  name: "Omar AbdelHalim",
};

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

export const CONTACT = {
  email: "omar.essam.se@gmail.com",
  phone: "+20 127 621 0449",
  phoneHref: "tel:+201276210449",
  github: "https://github.com/Omar300HP",
  githubLabel: "github.com/Omar300HP",
  linkedin: "https://www.linkedin.com/in/omar-abdel-halim-452b821a5/",
  cv: "/cv.pdf",
};

export const HERO = {
  status: "Available for senior frontend/fullstack roles",
  eyebrow: "Omar AbdelHalim — Senior Frontend Developer",
  description:
    "Senior frontend engineer with 6+ years turning complex requirements into scalable React & Next.js products — from a HIPAA-grade 3D dental platform to logistics portals that saved six figures.",
  stats: [
    { value: 6, suffix: "+", label: "Years shipping\nproduction apps" },
    {
      value: 100,
      prefix: "$",
      suffix: "K",
      label: "Saved in annual\nlicensing fees",
      accent: true,
    },
    {
      value: 45,
      prefix: "−",
      suffix: "%",
      label: "Bundle size,\nfaster loads",
    },
    { value: null, display: "3D", label: "Patient models,\nin the browser" },
  ],
};

export const WORK = {
  featured: {
    badge: "Featured",
    period: "2024 — Present · Remote (USA)",
    title: "Atomica AI",
    role: "Senior Frontend Developer",
    summary:
      "A HIPAA-grade SaaS where dentists view, manipulate and edit complex 3D patient models right in the browser — no desktop software required.",
    bullets: [
      "Engineered the 3D visualization module in Three.js & WebGL — real-time view, manipulate and edit of patient scans.",
      "Led the frontend migration to Next.js + TypeScript, enforcing strict type-safety that cut runtime errors.",
      "Built a scalable Admin & Billing dashboard for multi-tiered subscriptions, plus a HIPAA-compliant file pipeline.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "WebGL",
      "Ant Design",
      "Shadcn/ui",
      "Tailwind",
    ],
    links: [
      { label: "atomica.ai ↗", href: "https://atomica.ai/", primary: true },
      { label: "Case Cloud app ↗", href: "https://my.atomica.ai/login" },
    ],
    spec: {
      title: "Real-time 3D",
      subtitle: "viewer, delivered in the browser",
      rows: [
        { k: "RENDER", v: "Three.js · React-three-fiber" },
        { k: "MODELS", v: "view · manipulate · edit" },
        { k: "DATA", v: "HIPAA-compliant" },
        { k: "SCALE", v: "multi-tier SaaS" },
      ],
    },
  },
  cards: [
    {
      period: "2021 — 2024 · Remote (Atlanta)",
      title: "3sixty",
      role: "Software Developer",
      outcome: {
        label: "Outcome",
        value: "$100K",
        unit: " /yr",
        caption: "annual licensing eliminated",
      },
      load: { label: "Page load", before: "5.0s", after: "2.8s", pct: 56 },
      bullets: [
        "Migrated a legacy NetSuite system to a custom React portal — <strong>$100K/yr</strong> in licensing eliminated.",
        "Refactored logistics dashboards: <strong>−45%</strong> bundle, loads <strong>5s → 2.8s</strong>.",
        "Standardized ESLint / Prettier / Storybook — PR review cycle <strong>−20%</strong>.",
      ],
      tags: ["React", "Redux", "Performance", "Storybook"],
      links: [
        { label: "3sixtydental.com ↗", href: "https://3sixtydental.com/" },
        { label: "360courier.net ↗", href: "https://360courier.net/" },
      ],
    },
    {
      period: "2019 — 2021 · Alexandria, Egypt",
      title: "SWISO Dev.",
      role: "Software Developer",
      shipped: {
        label: "Shipped",
        value: "4 products",
        caption: "government & EdTech · KSA + Egypt",
      },
      badges: ["Saudi Ministry of Health", "Ministry of Islamic Affairs"],
      bullets: [
        "<strong>Wodooh</strong> — dynamic form engine + statistical charts for Saudi government entities.",
        "Built the judging UI for the <strong>Intl. Quran Competition</strong> (King Abdul Aziz) — real-time scoring.",
        "<strong>Sejelli</strong> EdTech + <strong>Quran-Keys</strong> responsive web & mobile apps.",
      ],
      tags: ["React", "Node.js", "Flutter", "Chart.js"],
      links: [
        { label: "cq.moia.gov.sa ↗", href: "https://cq.moia.gov.sa/" },
        { label: "swisodev.com ↗", href: "https://www.swisodev.com/" },
      ],
    },
  ],
};

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux / RTK",
      "HTML & CSS",
      "SCSS",
      "Tailwind",
      "Styled Components",
      "Figma",
      "Git",
    ],
  },
  {
    title: "3D & Graphics",
    items: [
      "Three.js",
      "react-three-fiber",
      "react-three/drei",
      "WebGL",
      "GLSL basics",
    ],
  },
  {
    title: "Testing / TDD",
    items: [
      "Jest",
      "Vitest",
      "Enzyme",
      "React Testing Library",
      "Cypress",
      "Unit",
      "Integration",
      "E2E",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "Docker",
      "tsoa",
      "REST",
      "SOAP",
    ],
  },
  {
    title: "Cloud & Infra",
    items: ["AWS Amplify", "AWS Cognito", "Route 53", "LightSail", "Firebase"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Flutter"],
  },
];

export const ABOUT = {
  eyebrow: "Beyond the code",
  heading: "A mechanical engineer who fell for the web.",
  paragraph:
    "I earned a B.Sc. in Mechanical Engineering from Alexandria University in 2018 — then taught myself to code and never looked back. That engineering instinct for breaking big systems into clean, tolerant parts is exactly how I approach frontend architecture today.",
  chips: [
    "Self-taught developer",
    "B.Sc. Mechanical Engineering",
    "English · IELTS 8 · French · Arabic",
    "Off the clock: War Thunder & Cities: Skylines",
  ],
};

export const CONTACT_SECTION = {
  eyebrow: "Contact",
  heading: "Let's build something ambitious.",
  paragraph:
    "Open to senior frontend roles — remote or Alexandria-based. Fastest way to reach me is email.",
};
