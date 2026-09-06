# Skill Library Catalog Overview

Use this only when the full `skills-library` repo is unavailable locally.

## Interview Sequence

1. Run `git rev-parse --git-dir` — if IS_REPO, offer to inspect it.
2. Ask how the user wants to share context: describe freely, problem only, or chat.
3. Ask narrowing questions one at a time: work area, sensitivity, stack, constraints.
4. Recommend up to 5 skills only after a repo read or concrete answers exist.

## Evaluating

Have catalog entries and feedback files. Recommend these — show status when you do.

- **gstack** — structured workflow suite: spec, design review, planning, QA, ship, deploy, security, benchmarking [url:https://github.com/garrytan/gstack] [license:clear — MIT, use freely]
- **graphify** — repo knowledge graph for structure-aware agents [url:https://github.com/Graphify-Labs/graphify] [license:clear — Apache 2.0, use freely]
- **frontend-design** — Anthropic skill for Tailwind/shadcn UI generation [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **document-skills** — Anthropic suite for Word, Excel, PowerPoint, and PDF [url:https://github.com/anthropics/skills] [license:needs-review — source-available; reference use only, not open source]
- **skill-creator** — Anthropic skill that scaffolds new skills from plain-English descriptions [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **webapp-testing** — Anthropic skill for testing local web apps with Playwright: server management, DOM inspection, screenshots, browser logging [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **mcp-builder** — Anthropic skill for creating MCP servers that integrate external APIs and services into Claude [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **sentry** — Official Sentry suite: 26 skills covering SDK setup, error fixing, alerts, code review, AI monitoring, and language-specific SDKs [url:https://github.com/getsentry/skills] [license:clear — Apache 2.0, use freely]
- **google-workspace** — Official Google Workspace CLI suite: 17 skills for Gmail, Drive, Sheets, Calendar, Docs, Slides, Chat, and cross-service workflows [url:https://github.com/googleworkspace/cli] [license:clear — Apache 2.0, use freely]
- **trail-of-bits-security** — 21 security skills from Trail of Bits: Burp Suite, CodeQL, Semgrep, smart contract auditing, property-based testing, variant analysis, DWARF debugging [url:https://github.com/trailofbits/skills] [license:needs-review — CC-BY-SA-4.0; share-alike, not a standard software license; check org policy]
- **firecrawl** — Web scraping and search via Firecrawl API: single-page extraction, multi-step browser flows, query-first discovery, onboarding [url:https://github.com/firecrawl/cli] [license:needs-review — AGPL-3.0; strong copyleft, check org policy before approving]
- **figma-skills** — Official Figma suite: 7 skills for design-to-code, design system generation, component connection, and Figma canvas writes [url:https://github.com/figma/mcp-server-guide] [license:needs-review — no LICENSE file; contact maintainer before approving]
- **web-artifacts-builder** — Anthropic skill for building complex HTML artifacts with React and Tailwind on claude.ai [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **internal-comms** — Anthropic skill for writing status reports, newsletters, and FAQs [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **algorithmic-art** — Anthropic skill for creating generative art using p5.js with seeded randomness [url:https://github.com/anthropics/skills] [license:clear — Apache 2.0, use freely]
- **composio** — Connect Claude agents to 1000+ external apps (GitHub, Slack, Gmail, Linear, etc.) with managed authentication [url:https://github.com/composio-community/skills] [license:clear — MIT, use freely]
- **replicate** — Discover, compare, and run AI models via Replicate API: image generation, video, audio, and more [url:https://github.com/replicate/skills] [license:clear — Apache 2.0, use freely]
- **addy-osmani-web-quality** — Web performance and quality skills by Addy Osmani: Core Web Vitals, render-blocking audits, bundle analysis [url:https://github.com/addyosmani/web-quality-skills] [license:clear — MIT, use freely]
- **testmu** — LambdaTest suite of 50+ test automation skills: Playwright, Cypress, Jest, Pytest, Selenium, Appium, BDD frameworks, CI/CD integration [url:https://github.com/LambdaTest/agent-skills] [license:clear — MIT, use freely]
- **typefully** — Create, schedule, and publish content across X, LinkedIn, and Threads; thread creation and engagement workflows [url:https://github.com/typefully/agent-skills] [license:clear — MIT, use freely]
- **cloudflare** — Official Cloudflare suite: 8 skills for Workers, KV, Durable Objects, R2, edge functions, web performance audits [url:https://github.com/cloudflare/skills] [license:clear — Apache 2.0, use freely]
- **hashicorp-terraform** — Official HashiCorp suite: 11 Terraform skills covering style, testing, modules, stacks, providers, and bulk cloud resource import [url:https://github.com/hashicorp/agent-skills] [license:clear — MPL-2.0, use freely; if you modify the skill files themselves those changes must stay MPL]
- **apple-design** — Apple's fluid interface design principles for the web: springs, gesture physics, interruptibility [url:https://github.com/emilkowalski/skills] [license:clear — MIT, use freely]
- **squad** — structured skills for multi-agent teams: collaboration, conduct, architectural review, CI validation gates [url:https://github.com/bradygaster/squad] [license:clear — MIT, use freely]
- **remove-ai-marks** — strip AI provenance marks: invisible Unicode, statistical text rewrite, C2PA/EXIF/XMP metadata from images and documents; requires local Docker service [url:https://github.com/guillaumemeyer/watermarks-remover] [license:clear — MIT, use freely]
- **scrapling** — adaptive web scraping with anti-bot bypass (Cloudflare), stealth browsing, spider framework, JS rendering; official skill by the library author [url:https://github.com/D4Vinci/Scrapling] [license:clear — BSD 3-Clause, use freely]
- **headroom** — context compression layer: 60-95% fewer tokens for JSON, 15-20% for coding agents; wraps Claude Code, Codex, Cursor, Aider, Cline and more; library, proxy, MCP server [url:https://github.com/headroomlabs-ai/headroom] [license:clear — Apache 2.0, use freely]
- **orca** — Agent Development Environment (ADE) for parallel agent fleets; run Claude Code, Codex, Cursor Agent and others simultaneously across git worktrees with your own subscription, desktop + mobile + remote runtime [url:https://github.com/stablyai/orca] [license:clear — MIT, use freely]
- **context7** — MCP server that pulls live, version-specific library documentation into Claude's context; eliminates hallucinated or outdated API references [url:https://github.com/upstash/context7] [license:clear — MIT, use freely]
- **exa-mcp** — neural search MCP server for web search and crawl; optimized for technical and AI-agent queries, returns high-signal results over SEO noise [url:https://github.com/exa-labs/exa-mcp-server] [license:clear — MIT, use freely]

- **ui-ux-pro-max** — design intelligence skill with 192 reasoning rules and 79 searchable UI styles; generates complete design systems (palette, typography, layout) from a brief across React, Tailwind, mobile and more [url:https://github.com/nextlevelbuilder/ui-ux-pro-max-skill] [license:clear — MIT, use freely]

## Candidates

Not yet evaluated — recommend when relevant, always show status as "candidate — not yet validated". License state for all candidates is `needs-review` unless specified — requires human review before approving.

- **aider** — terminal pair-programming agent for code editing and repo-aware refactoring [url:https://github.com/Aider-AI/aider]
- **cline** — autonomous coding agent as SDK, IDE extension, or CLI [url:https://github.com/cline/cline]
- **continue** — open-source coding agent for IDE and CLI assisted development [url:https://github.com/continuedev/continue]
- **openhands** — AI-driven dev environment for autonomous implementation [url:https://github.com/OpenHands/OpenHands]
- **roo-code** — IDE agent-team for coding, review, and repository assistance [url:https://github.com/RooCodeInc/Roo-Code]
- **swe-agent** — issue-solving software engineering agent for automated bug fixing [url:https://github.com/SWE-agent/SWE-agent]
- **bolt-diy** — full-stack web app generation for frontend and prototype workflows [url:https://github.com/stackblitz-labs/bolt.diy]
- **playwright-mcp** — browser automation MCP server for testing web flows [url:https://github.com/microsoft/playwright-mcp]
- **awesome-mcp-servers** — curated MCP server index across developer tool categories [url:https://github.com/punkpeye/awesome-mcp-servers]
- **twelve-factor-agents** — agent architecture principles for reviewing LLM product and workflow design [url:https://github.com/humanlayer/12-factor-agents]
- **gstack-spec** — turns vague intent into a precise executable spec [url:https://github.com/garrytan/gstack]
- **gstack-review** — pre-landing code review for bugs that pass CI but fail in production [url:https://github.com/garrytan/gstack]
- **gstack-ship** — release prep: syncs main, runs tests, reviews readiness, pushes [url:https://github.com/garrytan/gstack]
- **gstack-qa** — QA with real browser: find bugs, fix, re-verify [url:https://github.com/garrytan/gstack]
- **gstack-investigate** — systematic debugging: root cause before fixes [url:https://github.com/garrytan/gstack]
- **gstack-cso** — security review: OWASP Top 10 and STRIDE threat modeling [url:https://github.com/garrytan/gstack]
- **gstack-design-review** — live visual audit and fix-loop for user-facing surfaces [url:https://github.com/garrytan/gstack]
- **gstack-plan-eng-review** — engineering plan review: architecture, data flow, edge cases [url:https://github.com/garrytan/gstack]
- **gstack-benchmark** — performance regression: page load, Core Web Vitals, resource budgets [url:https://github.com/garrytan/gstack]
- **gstack-canary** — post-deploy monitoring: checks for errors, failures, and regressions [url:https://github.com/garrytan/gstack]
- **gstack-careful** — safety guardrail: warns before destructive commands [url:https://github.com/garrytan/gstack]
- **openapi-generator** — API client, server stub, and documentation generator [url:https://github.com/OpenAPITools/openapi-generator]
- **prompts-chat** — large community prompt catalog as reference for skill design [url:https://github.com/f/prompts.chat]
- **awesome-ai-agents** — agent landscape catalog for discovering and comparing agent tooling [url:https://github.com/e2b-dev/awesome-ai-agents]
- **ecc** — agent harness covering skills, instincts, memory, and security for Claude Code, Codex, and more [url:https://github.com/affaan-m/ECC]
- **andrej-karpathy-skills** — single CLAUDE.md derived from Karpathy's observations on LLM coding pitfalls [url:https://github.com/multica-ai/andrej-karpathy-skills]
- **ui-ux-pro-max-skill** — design intelligence for professional UI/UX across multiple platforms [url:https://github.com/nextlevelbuilder/ui-ux-pro-max-skill]
- **ponytail** — deletion-first, simplicity-first behavioral skill (laziest senior dev thinking) [url:https://github.com/DietrichGebert/ponytail]
- **caveman** — ~65% token reduction via compressed caveman-style agent output [url:https://github.com/JuliusBrussee/caveman]
- **claude-mem** — persistent cross-session memory: captures, compresses, and re-injects agent history [url:https://github.com/thedotmack/claude-mem]
- **taste-skill** — gives the AI good taste; stops generic, formulaic, AI-slop output [url:https://github.com/Leonxlnx/taste-skill]
- **awesome-claude-skills** — curated Claude Skills resource list (ComposioHQ) [url:https://github.com/ComposioHQ/awesome-claude-skills]
- **get-shit-done** — meta-prompting and spec-driven development system for Claude Code [url:https://github.com/gsd-build/get-shit-done]
- **last30days-skill** — research skill querying Reddit, X, YouTube, HN, Polymarket for recent signal [url:https://github.com/mvanhorn/last30days-skill]
- **obsidian-skills** — agent skills for Obsidian: Markdown, Bases, JSON Canvas (by kepano, Obsidian creator) [url:https://github.com/kepano/obsidian-skills]
- **marketingskills** — CRO, copywriting, SEO, analytics, and growth engineering skills [url:https://github.com/coreyhaines31/marketingskills]
- **academic-research-skills** — structured academic research workflow: research → write → review → revise → finalize [url:https://github.com/Imbad0202/academic-research-skills]
- **wshobson-agents** — multi-harness agent plugin marketplace (Claude Code, Codex, Cursor, Copilot, Gemini CLI) [url:https://github.com/wshobson/agents]
- **scientific-agent-skills** — 161 validated skills for biology, chemistry, medicine, and drug discovery [url:https://github.com/K-Dense-AI/scientific-agent-skills]
- **anthropic-cybersecurity-skills** — 817 skills mapped to MITRE ATT&CK, NIST CSF 2.0, and 4 other frameworks [url:https://github.com/mukul975/Anthropic-Cybersecurity-Skills]
- **serena** — MCP toolkit for semantic code retrieval and editing; fewer tokens, fewer tool calls [url:https://github.com/oraios/serena]
- **planning-with-files** — persistent file-based planning: crash-proof, session-recovery, context-rot resistant [url:https://github.com/OthmanAdi/planning-with-files]
- **reverse-skill** — authorized reverse engineering and penetration testing skill router [url:https://github.com/zhaoxuya520/reverse-skill]
- **hallmark** — anti-AI-slop design skill for Claude Code, Cursor, and Codex (Nutlope) [url:https://github.com/Nutlope/hallmark]
- **claude-skills** — 345 skills across engineering, marketing, product, and productivity (alirezarezvani) [url:https://github.com/alirezarezvani/claude-skills]
- **awesome-claude-code-subagents** — 100+ specialized Claude Code subagents (VoltAgent) [url:https://github.com/VoltAgent/awesome-claude-code-subagents]
- **book-to-skill** — converts any technical book PDF into a Claude Code skill [url:https://github.com/virgiliojr94/book-to-skill]
- **diagram-design** — 27 editorial diagram types: clean HTML/SVG, no Mermaid [url:https://github.com/cathrynlavery/diagram-design]
- **awesome-claude-code** — hand-picked Claude Code resources: skills, subagents, status lines, tooling [url:https://github.com/hesreallyhim/awesome-claude-code]

- **9router** — free AI coding router: Claude Code/Codex/Cursor/Cline to 40+ free providers, auto-fallback, token compression [url:https://github.com/decolua/9router]
- **agentmemory** — persistent memory for AI coding agents; benchmarked retrieval across sessions [url:https://github.com/rohitg00/agentmemory]
- **archon** — open-source harness builder for deterministic, repeatable AI coding workflows [url:https://github.com/coleam00/Archon]
- **autogpt** — seminal autonomous agent platform for building and using AI agents [url:https://github.com/Significant-Gravitas/AutoGPT]
- **career-ops** — AI job search skill: scans portals, evaluates A-F, tailors CVs, tracks applications [url:https://github.com/santifer/career-ops]
- **cc-switch** — cross-platform tool for switching between Claude Code, Codex, OpenCode, and others [url:https://github.com/farion1231/cc-switch]
- **cl4r1t4s** — AI systems transparency: leaked system prompts for Claude, ChatGPT, Gemini, Grok, Cursor (AGPL-3.0) [url:https://github.com/elder-plinius/CL4R1T4S]
- **claude-code-best-practice** — from vibe coding to agentic engineering: best practices guide [url:https://github.com/shanraisshan/claude-code-best-practice]
- **claude-code-game-studios** — 49 agents and 72 workflow skills for game development in Claude Code [url:https://github.com/Donchitos/Claude-Code-Game-Studios]
- **claude-code-router** — local control plane for routing across models and orchestrating agent tools [url:https://github.com/musistudio/claude-code-router]
- **claude-code-templates** — CLI tool for configuring and monitoring Claude Code projects [url:https://github.com/davila7/claude-code-templates]
- **claude-howto** — visual, example-driven Claude Code guide with copy-paste templates [url:https://github.com/luongnv89/claude-howto]
- **claude-hud** — Claude Code plugin: context usage, active tools, running agents, todo progress [url:https://github.com/jarrodwatts/claude-hud]
- **claude-plugins-official** — official Anthropic-managed Claude Code plugin directory [url:https://github.com/anthropics/claude-plugins-official]
- **claude-task-master** — AI task management for Cursor, Lovable, Windsurf, Roo, and others [url:https://github.com/eyaltoledano/claude-task-master]
- **cli-proxy-api** — wraps Claude Code, Codex, and others as OpenAI/Gemini-compatible API services [url:https://github.com/router-for-me/CLIProxyAPI]
- **code-review-graph** — local-first code intelligence graph for MCP and CLI with benchmarked context reduction [url:https://github.com/tirth8205/code-review-graph]
- **codegraph** — pre-indexed auto-syncing code knowledge graph; 100% local [url:https://github.com/colbymchenry/codegraph]
- **codex-plugin-cc** — official OpenAI plugin: use Codex from Claude Code for review and delegation [url:https://github.com/openai/codex-plugin-cc]
- **codexbar** — macOS menu bar app for Claude Code and Codex token usage and cost stats [url:https://github.com/steipete/CodexBar]
- **context-mode** — context optimization via MCP and hooks: 98% tool output reduction claimed [url:https://github.com/mksglu/context-mode]
- **cow-agent** — multi-model multi-channel agent harness with skills, memory, and self-evolution [url:https://github.com/zhayujie/CowAgent]
- **free-claude-code** — setup guide for using Claude Code on free provider tiers [url:https://github.com/Alishahryar1/free-claude-code]
- **hermes-agent** — adaptive AI agent by NousResearch that grows with usage [url:https://github.com/NousResearch/hermes-agent]
- **huashu-design** — HTML-native design skill: 20 design philosophies, prototypes, slides, MP4 export [url:needed]
- **knowledge-work-plugins** — official Anthropic plugins for documents, meetings, and research workflows [url:needed]
- **learn-claude-code** — visual Claude Code guide from basics to advanced agents with copy-paste templates [url:needed]
- **n8n-mcp** — MCP server for Claude Code, Claude Desktop, and Cursor to build n8n workflows [url:needed]
- **oh-my-claudecode** — teams-first multi-agent orchestration for Claude Code [url:needed]
- **omni-route** — free AI gateway: 340 providers, 90+ free, 1200+ models, quota-aware auto-fallback [url:needed]
- **open-design** — open-source design plugin for Claude Code/Codex/Cursor with HTML/PDF/PPTX/MP4 export [url:needed]
- **open-montage** — agentic video production: 12 pipelines, 100+ tools, 700+ agent skill files (AGPL-3.0) [url:needed]
- **promptfoo** — test prompts, agents, and RAGs; red teaming and model comparison (used by Anthropic) [url:https://github.com/promptfoo/promptfoo]
- **repomix** — packs entire repositories into a single AI-friendly file for LLM context [url:https://github.com/yamadashy/repomix]
- **ruflo** — agent meta-harness for multi-player swarms, autonomous workflows, and RAG integration [url:needed]
- **superclaude** — configuration framework enhancing Claude Code with commands and cognitive personas [url:https://github.com/SuperClaude-Org/SuperClaude_Framework]
- **system-prompts-and-models** — extracted system prompts from Claude Code, Cursor, Copilot, Windsurf, and 20+ tools (GPL-3.0) [url:needed]
- **system-prompts-leaks** — extracted system prompts from Claude Fable 5, GPT-5, Gemini, Grok, and more (CC0-1.0) [url:needed]
- **understand-anything** — turn any code into an interactive, explorable, queryable knowledge graph [url:needed]
- **vibe-kanban** — Kanban workflow management for Claude Code and Codex sessions (BloopAI/Apache-2.0) [url:https://github.com/BloopAI/vibe-kanban]

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