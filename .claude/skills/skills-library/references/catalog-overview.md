# Skill Library Catalog Overview

Use this only when the full `skills-library` repo is unavailable locally.

## Interview Sequence

1. Run `git rev-parse --git-dir` — if IS_REPO, offer to inspect it.
2. Ask how the user wants to share context: describe freely, problem only, or chat.
3. Ask narrowing questions one at a time: work area, sensitivity, stack, constraints.
4. Recommend up to 5 skills only after a repo read or concrete answers exist.

## Evaluating

Have catalog entries and feedback files. Recommend these — show status when you do.

- **gstack** — structured workflow suite: spec, design review, planning, QA, ship, deploy, security, benchmarking (`garrytan/gstack`) [license:needs-review]
- **graphify** — repo knowledge graph for structure-aware agents (`graphify`) [license:needs-review]
- **frontend-design** — Anthropic skill for Tailwind/shadcn UI generation (`anthropics/skills`) [license:clear — Apache 2.0]
- **document-skills** — Anthropic suite for Word, Excel, PowerPoint, and PDF (`anthropics/skills`) [license:needs-review — source-available]
- **skill-creator** — Anthropic skill that scaffolds new skills from plain-English descriptions (`anthropics/skills`) [license:clear — Apache 2.0]
- **webapp-testing** — Anthropic skill for testing local web apps with Playwright: server management, DOM inspection, screenshots, browser logging (`anthropics/skills`) [license:clear — Apache 2.0]
- **mcp-builder** — Anthropic skill for creating MCP servers that integrate external APIs and services into Claude (`anthropics/skills`) [license:clear — Apache 2.0]
- **sentry** — Official Sentry suite: 26 skills covering SDK setup, error fixing, alerts, code review, AI monitoring, and language-specific SDKs (`getsentry/skills`) [license:clear — Apache 2.0]
- **google-workspace** — Official Google Workspace CLI suite: 17 skills for Gmail, Drive, Sheets, Calendar, Docs, Slides, Chat, and cross-service workflows (`googleworkspace/cli`) [license:clear — Apache 2.0]
- **trail-of-bits-security** — 21 security skills from Trail of Bits: Burp Suite, CodeQL, Semgrep, smart contract auditing, property-based testing, variant analysis, DWARF debugging (`trailofbits/skills`) [license:needs-review — CC-BY-SA-4.0]
- **firecrawl** — Web scraping and search via Firecrawl API: single-page extraction, multi-step browser flows, query-first discovery, onboarding (`firecrawl/firecrawl`) [license:needs-review — AGPL-3.0]
- **figma-skills** — Official Figma suite: 7 skills for design-to-code, design system generation, component connection, and Figma canvas writes (`figma/mcp-server-guide`) [license:needs-review — no LICENSE file]
- **web-artifacts-builder** — Anthropic skill for building complex HTML artifacts with React and Tailwind on claude.ai (`anthropics/skills`) [license:clear — Apache 2.0]
- **internal-comms** — Anthropic skill for writing status reports, newsletters, and FAQs (`anthropics/skills`) [license:clear — Apache 2.0]
- **algorithmic-art** — Anthropic skill for creating generative art using p5.js with seeded randomness (`anthropics/skills`) [license:clear — Apache 2.0]
- **composio** — Connect Claude agents to 1000+ external apps (GitHub, Slack, Gmail, Linear, etc.) with managed authentication (`composio-community/skills`) [license:clear — MIT]
- **replicate** — Discover, compare, and run AI models via Replicate API: image generation, video, audio, and more (`replicate/skills`) [license:clear — Apache 2.0]
- **addy-osmani-web-quality** — Web performance and quality skills by Addy Osmani: Core Web Vitals, render-blocking audits, bundle analysis (`addyosmani/web-quality-skills`) [license:clear — MIT]
- **testmu** — LambdaTest suite of 50+ test automation skills: Playwright, Cypress, Jest, Pytest, Selenium, Appium, BDD frameworks, CI/CD integration (`LambdaTest/agent-skills`) [license:clear — MIT]
- **typefully** — Create, schedule, and publish content across X, LinkedIn, and Threads; thread creation and engagement workflows (`typefully/agent-skills`) [license:clear — MIT]
- **cloudflare** — Official Cloudflare suite: 8 skills for Workers, KV, Durable Objects, R2, edge functions, web performance audits (`cloudflare/skills`) [license:clear — Apache 2.0]
- **hashicorp-terraform** — Official HashiCorp suite: 11 Terraform skills covering style, testing, modules, stacks, providers, and bulk cloud resource import (`hashicorp/agent-skills`) [license:needs-review — MPL-2.0]
- **apple-design** — Apple's fluid interface design principles for the web: springs, gesture physics, interruptibility (`emilkowalski/skills`) [license:clear — MIT]
- **squad** — structured skills for multi-agent teams: collaboration, conduct, architectural review, CI validation gates (`bradygaster/squad`) [license:clear — MIT]
- **remove-ai-marks** — strip AI provenance marks: invisible Unicode, statistical text rewrite, C2PA/EXIF/XMP metadata from images and documents; requires local Docker service (`guillaumemeyer/watermarks-remover`) [license:clear — MIT]
- **scrapling** — adaptive web scraping with anti-bot bypass (Cloudflare), stealth browsing, spider framework, JS rendering; official skill by the library author (`d4vinci/Scrapling`) [license:clear — BSD 3-Clause]
- **headroom** — context compression layer: 60-95% fewer tokens for JSON, 15-20% for coding agents; wraps Claude Code, Codex, Cursor, Aider, Cline and more; library, proxy, MCP server (`headroomlabs-ai/headroom`) [license:clear — Apache 2.0]

## Candidates

Not yet evaluated — recommend when relevant, always show status as "candidate — not yet validated". License state for all candidates is `needs-review` unless specified — requires human review before approving.

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
- **ecc** — agent harness covering skills, instincts, memory, and security for Claude Code, Codex, and more
- **andrej-karpathy-skills** — single CLAUDE.md derived from Karpathy's observations on LLM coding pitfalls
- **ui-ux-pro-max-skill** — design intelligence for professional UI/UX across multiple platforms
- **ponytail** — deletion-first, simplicity-first behavioral skill (laziest senior dev thinking)
- **caveman** — ~65% token reduction via compressed caveman-style agent output
- **claude-mem** — persistent cross-session memory: captures, compresses, and re-injects agent history
- **taste-skill** — gives the AI good taste; stops generic, formulaic, AI-slop output
- **awesome-claude-skills** — curated Claude Skills resource list (ComposioHQ)
- **get-shit-done** — meta-prompting and spec-driven development system for Claude Code
- **last30days-skill** — research skill querying Reddit, X, YouTube, HN, Polymarket for recent signal
- **obsidian-skills** — agent skills for Obsidian: Markdown, Bases, JSON Canvas (by kepano, Obsidian creator)
- **marketingskills** — CRO, copywriting, SEO, analytics, and growth engineering skills
- **academic-research-skills** — structured academic research workflow: research → write → review → revise → finalize
- **wshobson-agents** — multi-harness agent plugin marketplace (Claude Code, Codex, Cursor, Copilot, Gemini CLI)
- **scientific-agent-skills** — 161 validated skills for biology, chemistry, medicine, and drug discovery
- **anthropic-cybersecurity-skills** — 817 skills mapped to MITRE ATT&CK, NIST CSF 2.0, and 4 other frameworks
- **serena** — MCP toolkit for semantic code retrieval and editing; fewer tokens, fewer tool calls
- **planning-with-files** — persistent file-based planning: crash-proof, session-recovery, context-rot resistant
- **reverse-skill** — authorized reverse engineering and penetration testing skill router
- **hallmark** — anti-AI-slop design skill for Claude Code, Cursor, and Codex (Nutlope)
- **claude-skills** — 345 skills across engineering, marketing, product, and productivity (alirezarezvani)
- **awesome-claude-code-subagents** — 100+ specialized Claude Code subagents (VoltAgent)
- **book-to-skill** — converts any technical book PDF into a Claude Code skill
- **diagram-design** — 27 editorial diagram types: clean HTML/SVG, no Mermaid
- **awesome-claude-code** — hand-picked Claude Code resources: skills, subagents, status lines, tooling

- **9router** — free AI coding router: Claude Code/Codex/Cursor/Cline to 40+ free providers, auto-fallback, token compression
- **agentmemory** — persistent memory for AI coding agents; benchmarked retrieval across sessions
- **archon** — open-source harness builder for deterministic, repeatable AI coding workflows
- **autogpt** — seminal autonomous agent platform for building and using AI agents
- **career-ops** — AI job search skill: scans portals, evaluates A-F, tailors CVs, tracks applications
- **cc-switch** — cross-platform tool for switching between Claude Code, Codex, OpenCode, and others
- **cl4r1t4s** — AI systems transparency: leaked system prompts for Claude, ChatGPT, Gemini, Grok, Cursor (AGPL-3.0)
- **claude-code-best-practice** — from vibe coding to agentic engineering: best practices guide
- **claude-code-game-studios** — 49 agents and 72 workflow skills for game development in Claude Code
- **claude-code-router** — local control plane for routing across models and orchestrating agent tools
- **claude-code-templates** — CLI tool for configuring and monitoring Claude Code projects
- **claude-howto** — visual, example-driven Claude Code guide with copy-paste templates
- **claude-hud** — Claude Code plugin: context usage, active tools, running agents, todo progress
- **claude-plugins-official** — official Anthropic-managed Claude Code plugin directory
- **claude-task-master** — AI task management for Cursor, Lovable, Windsurf, Roo, and others
- **cli-proxy-api** — wraps Claude Code, Codex, and others as OpenAI/Gemini-compatible API services
- **code-review-graph** — local-first code intelligence graph for MCP and CLI with benchmarked context reduction
- **codegraph** — pre-indexed auto-syncing code knowledge graph; 100% local
- **codex-plugin-cc** — official OpenAI plugin: use Codex from Claude Code for review and delegation
- **codexbar** — macOS menu bar app for Claude Code and Codex token usage and cost stats
- **context-mode** — context optimization via MCP and hooks: 98% tool output reduction claimed
- **cow-agent** — multi-model multi-channel agent harness with skills, memory, and self-evolution
- **free-claude-code** — setup guide for using Claude Code on free provider tiers
- **hermes-agent** — adaptive AI agent by NousResearch that grows with usage
- **huashu-design** — HTML-native design skill: 20 design philosophies, prototypes, slides, MP4 export
- **knowledge-work-plugins** — official Anthropic plugins for documents, meetings, and research workflows
- **learn-claude-code** — visual Claude Code guide from basics to advanced agents with copy-paste templates
- **n8n-mcp** — MCP server for Claude Code, Claude Desktop, and Cursor to build n8n workflows
- **oh-my-claudecode** — teams-first multi-agent orchestration for Claude Code
- **omni-route** — free AI gateway: 340 providers, 90+ free, 1200+ models, quota-aware auto-fallback
- **open-design** — open-source design plugin for Claude Code/Codex/Cursor with HTML/PDF/PPTX/MP4 export
- **open-montage** — agentic video production: 12 pipelines, 100+ tools, 700+ agent skill files (AGPL-3.0)
- **promptfoo** — test prompts, agents, and RAGs; red teaming and model comparison (used by Anthropic)
- **repomix** — packs entire repositories into a single AI-friendly file for LLM context
- **ruflo** — agent meta-harness for multi-player swarms, autonomous workflows, and RAG integration
- **superclaude** — configuration framework enhancing Claude Code with commands and cognitive personas
- **system-prompts-and-models** — extracted system prompts from Claude Code, Cursor, Copilot, Windsurf, and 20+ tools (GPL-3.0)
- **system-prompts-leaks** — extracted system prompts from Claude Fable 5, GPT-5, Gemini, Grok, and more (CC0-1.0)
- **understand-anything** — turn any code into an interactive, explorable, queryable knowledge graph
- **vibe-kanban** — Kanban workflow management for Claude Code and Codex sessions (BloopAI/Apache-2.0)

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
