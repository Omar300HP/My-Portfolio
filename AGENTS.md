# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 13 portfolio website (Pages Router, JavaScript). No database or external services required.

### Quick Reference

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 3000) |
| Prod server | `pnpm start` (port 3001) |
| Lint | `pnpm lint` |
| Build | `pnpm build` |

### Notes

- The project uses **pnpm** as the package manager — matching `pnpm-lock.yaml` and the `packageManager` field in `package.json` (Corepack can pin the exact version).
- No TypeScript is used; the codebase is JavaScript/JSX only.
- Environment variables (`NEXT_PUBLIC_GITHUB_LINK`, `NEXT_PUBLIC_LINKEDIN_LINK`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_MAIL`) are optional — the app renders without them.
- There are no automated test suites; `pnpm lint` is the primary code-quality check.
- A harmless `punycode` deprecation warning appears on Node 22+; it can be ignored.
- The `browserslist` outdated warning during build is cosmetic and does not affect functionality.

## Agent skills

### Issue tracker

Issues and PRDs live in this repo's GitHub Issues, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles map to identically-named labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
