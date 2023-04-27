export const GITHUB_LINK = process.env.NEXT_PUBLIC_GITHUB_LINK;
export const LINKEDIN_LINK = process.env.NEXT_PUBLIC_LINKEDIN_LINK;

export const SKILL_LEVELS_ENUM = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Expert: "Expert",
};

export const SKILL_LEVELS = {
  [SKILL_LEVELS_ENUM.Beginner]: { label: "Beginner", pecentage: 25 },
  [SKILL_LEVELS_ENUM.Intermediate]: { label: "Intermediate", pecentage: 50 },
  [SKILL_LEVELS_ENUM.Advanced]: { label: "Advanced", pecentage: 75 },
  [SKILL_LEVELS_ENUM.Expert]: { label: "Expert", pecentage: 100 },
};

export const PRIMARY_SKILLS = [
  { name: "React", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "Next.js", level: SKILL_LEVELS_ENUM.Intermediate },
  { name: "JavaScript", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "Typescript", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "HTML & CSS", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "Node.js", level: SKILL_LEVELS_ENUM.Advanced },
];

export const SECONDARY_SKILLS = [
  { name: "Git", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "E2E testing (cypress)", level: SKILL_LEVELS_ENUM.Intermediate },
  { name: "Integration testing", level: SKILL_LEVELS_ENUM.Advanced },
  {
    name: "Unit testing (jest - enzyme)",
    level: SKILL_LEVELS_ENUM.Expert,
  },
  {
    name: "react-testing-library",
    level: SKILL_LEVELS_ENUM.Expert,
  },
  { name: "Redux (RTK - saga - thunk)", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "API (Rest)", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "API (Soap)", level: SKILL_LEVELS_ENUM.Beginner },
  { name: "Amazon AWS (Amplify)", level: SKILL_LEVELS_ENUM.Intermediate },
  { name: "Amazon AWS (Cognito)", level: SKILL_LEVELS_ENUM.Intermediate },
  { name: "Amazon AWS (Route 53)", level: SKILL_LEVELS_ENUM.Intermediate },
  { name: "Amazon AWS (LightSail)", level: SKILL_LEVELS_ENUM.Beginner },
  { name: "scss", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "tailwind", level: SKILL_LEVELS_ENUM.Advanced },
  { name: "styled components", level: SKILL_LEVELS_ENUM.Intermediate },
];
