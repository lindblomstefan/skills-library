# Skills Library

This repository is a **working CLI proof of concept** for a skill-agnostic company catalog. It can discover, evaluate, route, and collect feedback about reusable AI skills, but it is not a finished product yet.

Current status:

- The CLI POC works locally and can be called from another repository.
- The repo exposes one installable Claude skill: `skills-library`.
- Public library entries are candidates or evaluating entries, not approved production skills.
- External skills are stored as metadata pointers to upstream sources; external skill files are not copied into this repo.
- Standard recommendations intentionally block unapproved skills. Exploratory recommendations can surface candidates with blockers.
- Opt-in fetch/install after recommendation is designed and documented, but not implemented yet.

The library has two skill layers:

- **Library skills**: publishable/recommendable skills under `catalog/library-skills/`.
- **Internal skills**: operating skills under `catalog/internal-skills/` used by this repo and the `skills-library` workflow. They are not made available as library inventory.

The only installable skill folder is `.claude/skills/skills-library/`. Internal workflow instructions live under `.claude/internal-workflows/` so a GitHub skill installer should not offer them as separate public skills.

The library should support multiple sources:

- External skills from trusted public or partner sources
- Internal company-authored skills
- Adapted skills based on external patterns
- Experimental skills that still need evaluation

The goal is not to store every skill here. The goal is to make skill work visible, reviewable, reusable, and governed.

## What Works Now

- Catalog validation for library skills, internal skills, packs, golden tasks, evaluation runs, relationships, compatibility rows, and license-state values.
- CLI commands for `validate`, `build`, `recommend`, `assist`, `onboard`, and `feedback`.
- A generated router index, catalog JSON, graph JSON, and Kuzu load script under ignored `dist/` outputs.
- Internal operating skills for recommendation, onboarding, feedback capture, and calling this repo as a skill from another repo.
- A starter public library catalog with 40 metadata-only skill manifests.
- CI-facing guardrails for source and documentation file size.

## Not Implemented Yet

- No approved production skill set.
- No automatic fetch/install command after the user accepts a recommendation.
- No automatic target-repo agent instruction updater yet, though the install contract requires one.
- No dashboard or website; the visual POC was removed so a future dashboard can be designed from scratch.
- No live graph database dependency; generated Kuzu load artifacts are present for the next integration step.

## Operating Model

Use GitHub issues as the intake and planning system.

- Use **Skill discovery** issues to capture promising external skills, references, methods, or patterns.
- Use **Skill evaluation** issues to assess fit, trust, maintainability, and usage value.
- Use **Skill build** issues when the company needs to create or adapt a skill.
- Use **Library improvement** issues for catalog structure, governance, automation, and documentation.

Store reusable documentation in `docs/`. Store skill metadata in `catalog/`. Add actual skill files only when there is a clear reason to own, adapt, or distribute them from this repo.

## Skill Lifecycle

1. Discover a skill, method, pattern, or need.
2. Evaluate whether it should be used as-is, adapted, replaced, or ignored.
3. Document decision and usage guidance.
4. Build or import only when ownership adds value.
5. Review periodically for staleness, security, and continued usefulness.

## Catalog Dimensions

Classify skills by what work they improve, not by implementation format.

- Planning and product discovery
- Architecture and technical design
- Coding and refactoring
- Testing and quality
- UI, UX, and accessibility
- Security, privacy, and compliance
- DevOps and delivery
- Documentation and communication
- Data, analytics, and AI engineering
- Incident response and learning

## Repository Contents

```text
.
├── .github/ISSUE_TEMPLATE/   # Intake templates
├── catalog/                  # Library/internal manifests, packs, and taxonomies
├── evaluations/              # Evaluation notes and evidence
├── docs/                     # Library model and issue backlog
├── AGENTS.md                 # Agent guidance
└── README.md                 # Entry point
```

## Current Focus

The POC focus is the structure that lets the library work:

- catalog schema
- compatibility metadata
- source and lifecycle taxonomies
- pack definitions
- evaluation evidence
- router-ready metadata
- new skill onboarding
- usage and feedback data for future metrics
- governance gates and privacy boundaries
- evaluation runs linked to golden tasks

The first catalog seed is intentionally candidate-heavy. Keep adding external skills as metadata pointers, not copied source, until an onboarding PR explicitly reviews license, runtime compatibility, risk, and evaluation evidence.

## Local CLI POC

The first POC is a local onboarding-to-recommendation flow. The primary interface is CLI output that can be called from this repo or another repo.

## Installing And Invoking The Skill

Paste this into any Claude Code session:

```text
Install the skills-library skill from https://github.com/lindblomstefan/skills-library and set it up so I can type /skills-library to start it.
```

Claude will clone the repo, copy the skill into `~/.claude/skills/`, and add the trigger instructions to `~/.claude/CLAUDE.md`. After that, type `/skills-library` in any session to start the guided interview.

Claude will also suggest `/skills-library` when you ask what AI skills, tools, or AI-powered workflows to use for a project or team — without triggering on general "I want to build X" statements.

Run:

```bash
node bin/skills-library.mjs validate
node bin/skills-library.mjs build
node bin/skills-library.mjs assist --repo . --format text
node bin/skills-library.mjs onboard --repo . --candidate <url-or-path> --format text
node bin/skills-library.mjs recommend --repo . --repo-consent accepted --task "start a repo onboarding initiative" --model claude --runtime claude-code --format text
node bin/skills-library.mjs feedback collect --repo . --skill-id gstack --signal wrong-recommendation
```

From another repo:

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --format text

/path/to/skills-library/bin/skills-library.mjs recommend \
  --repo . \
  --repo-consent accepted \
  --task "what skill set should we use for this initiative?" \
  --model claude \
  --runtime claude-code \
  --mode exploratory \
  --format text
```

Use `assist` first for human guidance. `recommend` is gated and should only produce a shortlist after repo inspection with consent or concrete interview answers. Use `onboard` when adding or evaluating a known skill candidate. Onboarding changes to skills, catalog entries, schemas, router logic, or evaluation evidence must go through a PR.

See `docs/cli-usage.md` for the CLI contract.

Public recommendations use `catalog/library-skills/`. Internal workflow skills live in `catalog/internal-skills/` and are used by the library itself.

The POC currently:

- includes 40 library-skill manifests: Graphify, 19 gstack candidates, and 20 varied popular GitHub candidates
- keeps internal operating skills separate from library skills
- validates seed catalog data
- emits catalog, router, graph, recommendation, and Kuzu load artifacts under `dist/`
- exposes a callable `bin/skills-library.mjs` CLI
- starts guided recommendation and onboarding sessions with repo-inspection consent
- blocks recommendations unless the repo was inspected with consent or concrete interview answers are present
- captures privacy-safe local feedback for later issue submission
- does not download recommended repositories by default; future acceptance flow must offer an explicit preview and fetch only accepted skills from original upstream sources
- requires accepted skills to handle target repo agent instruction files, either by safe update or reviewable patch

See `docs/poc-plan.md` and `docs/poc-change-log.md` for decisions and implementation adjustments.
See `docs/engineering-guardrails.md` for file responsibility boundaries and enforced size limits.

Validation and smoke test:

```bash
npm test
```
