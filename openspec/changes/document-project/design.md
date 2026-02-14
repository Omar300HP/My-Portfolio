# Design: document-project

## Context

The portfolio project currently has minimal documentation. This hinders onboarding for new developers and significantly reduces the effectiveness of AI agents, which rely on context to provide accurate assistance. We need to establish a documentation baseline that serves both human and AI consumers.

## Goals / Non-Goals

**Goals:**

- Create a high-level `ARCHITECTURE.md` explaining the system design.
- Create/update `README.md` with clear setup and usage instructions.
- Add `CONTRIBUTING.md` to standardize contributions.
- Create a `.context/` directory with token-efficient files (`project-overview.md`, `tech-stack.md`, `style-guide.md`) specifically for AI agents.

**Non-Goals:**

- Generating API documentation from code comments (e.g., JSDoc) at this stage.
- Documenting every single utility function or component properties in detail.

## Decisions

### Documentation Structure

We will separate human-facing documentation from agent-facing documentation to optimize for different consumption patterns.

- Human docs (`README.md`, `ARCHITECTURE.md`) will be narrative and exhaustive.
- Agent docs (`.context/*.md`) will be bulleted, structural, and optimized for low token usage.

### Logic & Implementation

- **Architecture**: Will describe the frontend framework, state management, and key directory structure.
- **Agent Context**: Will reside in `.context/` to generally be hidden from casual file browsing but easily accessible to agents via `list_dir`.
  - `project-overview.md`: High-level purpose and domain logic.
  - `tech-stack.md`: Specific versions and libraries used.
  - `style-guide.md`: Syntactic preferences (e.g., functional components, naming conventions).

## Risks / Trade-offs

- **Risk**: Documentation becoming outdated.
  - **Mitigation**: Add a "Update Documentation" checklist item to the `CONTRIBUTING.md` for PR reviews.
- **Trade-off**: Maintenance overhead of two documentation sets (human vs. agent).
  - **Mitigation**: Keep agent documentation focused on _invariant_ structures and _patterns_ rather than volatile details, reducing the frequency of needed updates.
