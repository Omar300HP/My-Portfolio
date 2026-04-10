# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 13 portfolio website (Pages Router, JavaScript). No database or external services required.

### Quick Reference

| Action | Command |
|--------|---------|
| Install deps | `yarn install` |
| Dev server | `yarn dev` (port 3000) |
| Prod server | `yarn start` (port 3001) |
| Lint | `yarn lint` |
| Build | `yarn build` |

### Notes

- The project uses **Yarn 1.x** (classic) as the package manager — matching `yarn.lock`.
- No TypeScript is used; the codebase is JavaScript/JSX only.
- Environment variables (`NEXT_PUBLIC_GITHUB_LINK`, `NEXT_PUBLIC_LINKEDIN_LINK`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_MAIL`) are optional — the app renders without them.
- There are no automated test suites; `yarn lint` is the primary code-quality check.
- A harmless `punycode` deprecation warning appears on Node 22+; it can be ignored.
- The `browserslist` outdated warning during build is cosmetic and does not affect functionality.
