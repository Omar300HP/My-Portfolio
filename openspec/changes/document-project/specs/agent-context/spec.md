# Specs: agent-context

## ADDED Requirements

### Requirement: Agent Context Files

The project must include specialized context files optimized for AI agents to quickly understand the project structure, tech stack, and conventions without parsing the entire codebase.

#### Scenario: Verify Context Directory

- **WHEN** I check the project root
- **THEN** I should see a `.context` or `docs/context` directory
- **THEN** I should see `project-overview.md`
- **THEN** I should see `tech-stack.md`
- **THEN** I should see `style-guide.md`

### Requirement: Optimized Content

The context files must be concise and token-efficient, avoiding unnecessary prose while retaining critical technical details.

#### Scenario: Verify Content Efficiency

- **WHEN** I read `project-overview.md`
- **THEN** It should use bullet points and clear headings
- **THEN** It should link to detailed documentation where necessary
