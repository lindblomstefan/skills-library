# Skill Library Catalog Overview

Use this only when the full `skills-library` repo is unavailable locally.

## Interview Sequence

1. Run `git rev-parse --git-dir` — if IS_REPO, offer to inspect it.
2. Ask how the user wants to share context: describe freely, problem only, or chat.
3. Ask narrowing questions one at a time: work area, sensitivity, stack, constraints.
4. Recommend up to 5 skills only after a repo read or concrete answers exist.

## Evaluating

Have catalog entries and feedback files. Recommend these — show status when you do.

- **gstack** — structured workflow suite: spec, design review, planning, QA, ship, deploy, security, benchmarking (`garrytan/gstack`)
- **graphify** — repo knowledge graph for structure-aware agents (`graphify`)
- **frontend-design** — Anthropic skill for Tailwind/shadcn UI generation (`anthropics/skills`)
- **document-skills** — Anthropic suite for Word, Excel, PowerPoint, and PDF (`anthropics/skills`)
- **skill-creator** — Anthropic skill that scaffolds new skills from plain-English descriptions (`anthropics/skills`)
- **apple-design** — Apple's fluid interface design principles for the web: springs, gesture physics, interruptibility (`emilkowalski/skills`)
- **squad** — structured skills for multi-agent teams: collaboration, conduct, architectural review, CI validation gates (`bradygaster/squad`)
- **remove-ai-marks** — strip AI provenance marks: invisible Unicode, statistical text rewrite, C2PA/EXIF/XMP metadata from images and documents; requires local Docker service (`guillaumemeyer/watermarks-remover`)
- **scrapling** — adaptive web scraping with anti-bot bypass (Cloudflare), stealth browsing, spider framework, JS rendering; official skill by the library author (`d4vinci/Scrapling`)
- **headroom** — context compression layer: 60-95% fewer tokens for JSON, 15-20% for coding agents; wraps Claude Code, Codex, Cursor, Aider, Cline and more; library, proxy, MCP server (`headroomlabs-ai/headroom`)

## Candidates

Not yet evaluated — recommend when relevant, always show status as "candidate — not yet validated".

- **aider** — terminal pair-programming agent for code editing and repo-aware refactoring
- **cline** — autonomous coding agent as SDK, IDE extension, or CLI
- **continue** — open-source coding agent for IDE and CLI assisted development
- **openhands** — AI-driven dev environment for autonomous implementation
- **roo-code** — IDE agent-team for coding, review, and repository assistance
- **swe-agent** — issue-solving software engineering agent for automated bug fixing
- **bolt-diy** — full-stack web app generation for frontend and prototype workflows
- **playwright-mcp** — browser automation MCP server for testing web flows
- **awesome-mcp-servers** — curated MCP server index across developer tool categories
- **twelve-factor-agents** — agent architecture principles for reviewing LLM product and workflow design
- **gstack-spec** — turns vague intent into a precise executable spec
- **gstack-review** — pre-landing code review for bugs that pass CI but fail in production
- **gstack-ship** — release prep: syncs main, runs tests, reviews readiness, pushes
- **gstack-qa** — QA with real browser: find bugs, fix, re-verify
- **gstack-investigate** — systematic debugging: root cause before fixes
- **gstack-cso** — security review: OWASP Top 10 and STRIDE threat modeling
- **gstack-design-review** — live visual audit and fix-loop for user-facing surfaces
- **gstack-plan-eng-review** — engineering plan review: architecture, data flow, edge cases
- **gstack-benchmark** — performance regression: page load, Core Web Vitals, resource budgets
- **gstack-canary** — post-deploy monitoring: checks for errors, failures, and regressions
- **gstack-careful** — safety guardrail: warns before destructive commands
- **openapi-generator** — API client, server stub, and documentation generator
- **prompts-chat** — large community prompt catalog as reference for skill design
- **awesome-ai-agents** — agent landscape catalog for discovering and comparing agent tooling

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
