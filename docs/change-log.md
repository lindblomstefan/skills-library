# Change Log

This log records implementation decisions made during the initial build.

## 2026-08-13

### Graph Database Path

The POC keeps the catalog graph model explicit through generated nodes, edges, and a Kuzu load script.

Reason:

- The catalog graph should be graph-native from the first POC.
- The CLI POC should not require every user to install a graph database before inspecting generated outputs.

Impact:

- `dist/graph/*.json` is generated and ignored.
- `dist/kuzu/load.cypher` is generated and ignored.
- The committed source of truth remains catalog YAML plus the POC generator.
- Loading into a live Kuzu database is the next integration step after the dependency-free POC is stable.

### POC Runner

The first runner is `tools/poc.mjs`, a dependency-free Node script.

Reason:

- Node is already present locally.
- Avoiding package installation makes validation and generated output creation immediate.
- The script can later be replaced or wrapped by a TypeScript implementation without changing catalog data.

Impact:

- `npm run poc:validate` validates seed catalog relationships and taxonomy references.
- `npm run poc:build` emits generated catalog, router, graph, Kuzu, and recommendation data.
- `npm test` currently runs validation, build, guardrails, and skill checks.

### POC Validation Layer

The POC uses custom validation checks in `tools/poc.mjs` instead of AJV-backed JSON Schema validation.

Reason:

- The first local POC must run immediately from a clone without package installation.
- Existing schema files are descriptive and need a separate hardening pass.
- The POC still needs enforceable checks for required fields, taxonomy references, duplicate ids, relationship targets, and governance warnings.

Impact:

- `npm run poc:validate` is the current enforceable POC gate.
- JSON Schema plus AJV remains the intended production validation path from issue #25.
- The POC data model should not depend on the custom validator shape.

### Router Modes

Standard mode blocks all current public library skills because none are approved or in use.

Reason:

- The POC should demonstrate governance behavior instead of pretending candidate skills are production-ready.

Impact:

- Exploratory public recommendation mode recommends Graphify with warnings.
- Internal operating skills remain available to the skill-library workflow but are not public recommendations.
- Standard mode recommends no skills and explains blockers.

### Mandatory License Check In Onboarding

The onboarding flow now treats license type as a required gate.

Reason:

- A skill cannot be safely evaluated for approval, included in a pack, or copied/adapted without knowing its license type and redistribution constraints.

Impact:

- `tools/poc.mjs` validates that every skill has `source.license`, `source.license_spdx`, and `trust.license_state`.
- `docs/new-skill-onboarding.md` now makes license checking step 2 in the workflow.

### CLI-First Pivot

The POC contract is CLI-first.

Reason:

- Other repositories and agents need a stable callable interface.
- CLI JSON output is easy to script, test, and consume.
- Any future dashboard should be built from scratch over the CLI/generated outputs rather than inheriting this POC surface.

Impact:

- Added `bin/skills-library.mjs` as the stable executable entry point.
- Added a `bin` entry in `package.json`.
- `npm run poc:*` scripts now call the binary.
- `recommend` accepts `--repo`, `--task`, `--model`, `--runtime`, `--mode`, `--format`, `--domain`, and `--task-types`.
- `--format json` is the default automation contract; `--format text` is for human review.
- Added `docs/cli-usage.md`.

### Responsibility Split and Guardrails

The POC runner was split into focused modules under `tools/lib/`, and source-size guardrails were added to CI-facing tests.

Reason:

- `tools/poc.mjs` had become a catch-all for YAML parsing, catalog loading, validation, graph export, recommendation, and CLI orchestration.
- Future POC work will grow quickly; limits need to fail before files become hard to review.
- Generated artifacts should not count against maintainability limits.

Impact:

- `tools/poc.mjs` is now a compatibility wrapper.
- `bin/skills-library.mjs` imports the CLI directly from `tools/lib/cli.mjs`.
- Added `docs/engineering-guardrails.md`.
- Added `tools/check-guardrails.mjs` and wired it into `npm test`.
- Source files warn above 300 lines and fail above 450 lines.
- Documentation files warn above 350 lines and fail above 700 lines.
- `dist/`, `graphify-out/`, and package lock files are exempt as generated or external artifacts.

### Local Feedback Capture

The CLI now supports privacy-safe feedback capture from another repo before anything is submitted back to the main skills library.

Reason:

- Skill feedback is only useful when it includes enough repo context to diagnose whether the problem was the skill, router, catalog metadata, runtime, or missing context.
- Raw prompts, code, secrets, personal data, and customer data must not be submitted as telemetry.
- Direct commits to the main repo are too risky for feedback.

Impact:

- Added `feedback collect`, `feedback preview`, and `feedback submit`.
- `feedback collect` writes redacted JSON under `.skills-library/feedback/` in the target repo by default.
- `feedback submit` currently supports GitHub issue creation with explicit `--yes`.
- Direct push is blocked by design.
- Added `.codex/internal-workflows/skill-feedback-capture`.
- Added `.codex/skills/skill-library` so another repo can invoke this repo as the Skill Library skill.
- Added catalog entries for `skill-feedback-capture` and `skill-library`.

### Guided Skill Help Flow

- Added a dependency-free guided session module for recommendation and onboarding flows.
- Added `assist` and `onboard` CLI commands that emit structured questions with choices and free-text allowance.
- Made repo inspection consent explicit: without consent, the session asks questions only.
- Added actual callable skills for `initiative-skill-recommender` and `skill-library-onboarding`.
- Documented that skill onboarding and catalog/source changes require PRs, while public issues are only for redacted feedback discussion.
- Added a `guided-session` schema to capture the interaction contract for CLI, agent, or future dashboard rendering.

### Internal Vs Library Skill Split

- Split catalog manifests into `catalog/library-skills/` and `catalog/internal-skills/`.
- Moved Graphify to `catalog/library-skills/` as the first library candidate.
- Moved `skill-library`, `skill-library-onboarding`, `initiative-skill-recommender`, and `skill-feedback-capture` to `catalog/internal-skills/`.
- Moved the POC repo intelligence pack to `catalog/internal-packs/` because it includes internal operating skills.
- Added `catalog_visibility` to skill manifests and validation.
- Changed public recommendation and browsing surfaces to use only library skills.

### Visual Surface Removal

- Removed the POC visual files and local server.
- Removed visual-surface data generation from `build`.
- Removed the visual-surface smoke test and package scripts.
- Kept the POC CLI-first so any future dashboard can be designed from scratch.

### Recommendation Acceptance Boundary

- Clarified that `recommend` does not download external repositories by default.
- Documented that the library may offer opt-in install/fetch automation after showing an install preview plan.
- Documented that future acceptance/install behavior must fetch only explicitly accepted skills from original upstream sources.
- Reference catalogs such as `awesome-*` are discovery sources; accepting them does not authorize downloading every downstream repository they list.
- External skill files remain outside this repository unless a PR explicitly reviews a copied or adapted artifact.
- Tightened router license blockers so any non-clear/non-internal license state blocks standard readiness.
- Added the requirement that accepted skills inspect and update target repo agent instruction files, or emit reviewable patches when direct edits are unsafe.

### Varied Library Candidate Seed

- Added 20 non-gstack library candidates from popular GitHub repositories across prompt catalogs, MCP, agent architecture, coding agents, browser automation, frontend prototyping, and API generation.
- Kept each as metadata-only external pointers with `copied_assets: []`.
- Recorded observed stars, source URL, license state, routing scope, risk, install/invoke shape, and freshness metadata.
- Left all new entries as `candidate`; they are exploratory only until evaluated.

### Single Installable Skill Surface

- Kept `.codex/skills/skill-library/` as the only installable Codex skill in the repo.
- Moved helper/domain workflow instructions to `.codex/internal-workflows/` and renamed their `SKILL.md` files to `WORKFLOW.md`.
- Updated `skill-library` so invocation starts guided repo/initiative interviewing instead of asking a broad open-ended question.
- Added a compact catalog overview inside the installable skill for use when the full CLI repo is unavailable.

### Internal Tool Artifact Cleanup

- Removed generated `graphify-out/` artifacts from version control.
- Changed `.gitignore` to ignore all of `graphify-out/`.
- Removed Graphify-specific local agent instructions from `AGENTS.md` so internal navigation tooling is not exposed as repo guidance.

### Human-Guided Recommendation Output

- Changed the default `recommend` output to text instead of JSON.
- Limited text recommendations to a short ranked shortlist with blockers, gaps, and one suggested next step.
- Kept `--format json` available for full router output and automation.

### Interview Gate For Recommendations

- Added a recommendation gate so `recommend` returns interview questions instead of a shortlist when neither repo inspection nor concrete interview answers exist, or when evidence is vague, contradictory, or unstable.
- Added `--repo-consent accepted`, `--interview-answers`, and `--evidence-state` controls so routing must be grounded in a repo read or answered questions.
- Added CLI flow checks to keep `assist` first and prevent regression back to no-question recommendations.
- Changed the guided interview so the first question is open context about the idea, goal, and intended end product; repo-inspection consent now follows before any file reads.
- Reduced the installable `skill-library` instructions to a short fixed sequence so models do not have to choose between competing guidance.
- Added regression checks for bloated or contradictory active skill instructions.
