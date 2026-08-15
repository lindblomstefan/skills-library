# Skill Library Catalog Overview

Use this only when the full `skills-library` repo is unavailable locally.

## Interview Sequence

1. Run `git rev-parse --git-dir` — if a repo, offer to inspect it.
2. Ask how the user wants to share context: describe freely, problem only, or chat.
3. Ask narrowing questions one at a time: work area, sensitivity, stack, constraints.
4. Recommend up to 5 skills only after a repo read or concrete answers exist.

## Current Catalog

- **gstack** — structured workflow suite: spec, design review, planning, QA, ship, deploy, security, benchmarking (`garrytan/gstack`)
- **graphify** — repo knowledge graph for structure-aware agents
- **frontend-design** — official Anthropic skill for Tailwind/shadcn UI generation (`anthropics/skills`)
- **document-skills** — official Anthropic suite for Word, Excel, PowerPoint, and PDF (`anthropics/skills`)
- **skill-creator** — official Anthropic skill that scaffolds new skills from plain-English descriptions (`anthropics/skills`)
- **apple-design** — Apple's fluid interface design principles for the web: springs, gesture physics, interruptibility, translucent materials, typography (`emilkowalski/skills`)
- MCP and tool discovery: `awesome-mcp-servers`, `modelcontextprotocol-servers`, `playwright-mcp`
- Agent architecture: `twelve-factor-agents`, `ai-agents-for-beginners`, `awesome-ai-agents`
- Coding agents: `continue`, `aider`, `openhands`, `swe-agent`, `cline`, `roo-code`
- Frontend generation: `bolt-diy`
- Backend/API generation: `openapi-generator`
- Rule/prompt catalogs: `awesome-cursorrules`, `awesome-copilot`, `prompts-chat`

## Recommendation Rules

- Treat all entries as candidate or evaluating unless a feedback file says `validated: true`.
- Standard-ready requires approved/in-use status and a clear license state.
- Exploratory may include candidates, but show blockers.
- Unknown, needs-review, restricted, or paid license states require human review before approval.
