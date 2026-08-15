# Skill Library Catalog Overview

Use this only when the full `skills-library` repo is unavailable locally.

## Interview Sequence

1. Run `git rev-parse --git-dir` — if IS_REPO, offer to inspect it.
2. Ask how the user wants to share context: describe freely, problem only, or chat.
3. Ask narrowing questions one at a time: work area, sensitivity, stack, constraints.
4. Recommend up to 5 skills only after a repo read or concrete answers exist.

## Library Skills

These skills have catalog entries and feedback files. Recommend from this list only.

- **gstack** — structured workflow suite: spec, design review, planning, QA, ship, deploy, security, benchmarking (`garrytan/gstack`)
- **graphify** — repo knowledge graph for structure-aware agents (`graphify`)
- **frontend-design** — Anthropic skill for Tailwind/shadcn UI generation (`anthropics/skills`)
- **document-skills** — Anthropic suite for Word, Excel, PowerPoint, and PDF (`anthropics/skills`)
- **skill-creator** — Anthropic skill that scaffolds new skills from plain-English descriptions (`anthropics/skills`)
- **apple-design** — Apple's fluid interface design principles for the web: springs, gesture physics, interruptibility, translucent materials, typography (`emilkowalski/skills`)

## Discovery Sources

These are pointers for finding more skills to onboard — do not recommend them as library skills.

- MCP and tool discovery: `awesome-mcp-servers`, `modelcontextprotocol-servers`, `playwright-mcp`
- Agent architecture: `twelve-factor-agents`, `ai-agents-for-beginners`, `awesome-ai-agents`
- Coding agents: `continue`, `aider`, `openhands`, `swe-agent`, `cline`, `roo-code`
- Frontend generation: `bolt-diy`
- Backend/API generation: `openapi-generator`
- Rule/prompt catalogs: `awesome-cursorrules`, `awesome-copilot`, `prompts-chat`

## Recommendation Rules

- Recommend only from the Library Skills section above.
- Treat all library skills as evaluating unless their feedback file says `validated: true`.
- Show license state, validation status, and any known blockers for each recommendation.
- Unknown, needs-review, restricted, or paid license states require human review before approval.
