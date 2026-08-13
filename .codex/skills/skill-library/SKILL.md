---
name: skill-library
description: Use when the user asks to use, test, or install the skills-library skill; asks what AI skills a repo, initiative, or team needs; wants guided skill recommendations; wants to browse/evaluate the library catalog; or wants privacy-safe feedback capture after using a skill. The skill should start by helping evaluate the target repo or initiative, not by asking open-endedly what to do.
---

# Skill Library

## Purpose

Help a user evaluate what skills a repo or initiative needs, then recommend skills with clear blockers. Prefer the local `skills-library` CLI when available; use the bundled catalog overview as a fallback when this skill was installed without the full repository.

## Default Start

When this skill is invoked, start the guided recommendation flow immediately.

Do not ask a broad "what do you want to do?" question. Do this instead:

1. Identify the target repo. If the user is already in a repo, use it as the target.
2. Ask for repo-inspection consent before reading files.
3. If consent is accepted, inspect only enough repo context to understand language, framework, risk, test surface, docs, and agent instruction files.
4. Ask focused follow-up questions only for missing or contradictory intent.
5. Recommend candidate skills only from stable evidence. If evidence is vague or contradictory, explain the confusion and ask for clarification instead of recommending.
6. Show license state, status, risk, compatibility, and whether each recommendation is standard-ready or exploratory.

## Setup Assumption

The full skills-library repo may be cloned somewhere the user can access, for example:

```bash
/path/to/skills-library
```

If the path is unknown, ask for it or search nearby workspace roots.

If the full repo is not available, continue with the manual guided flow. Use `references/catalog-overview.md` for the compact candidate catalog.

A Git remote by itself, such as `git@github.com:lindblomstefan/skills-library.git`, is not a skill invocation. Treat it only as a clone source if the user explicitly asks to clone or install the library. After cloning, call the CLI from the target repository.

## Recommend Skills

Run from the target project:

```bash
/path/to/skills-library/bin/skills-library.mjs recommend \
  --repo . \
  --task "describe the initiative or task" \
  --model codex \
  --runtime codex-cli \
  --mode exploratory \
  --format json
```

Use `--format text` for human review.

Recommendations do not download skills by default. Treat recommendation output as a reviewed shortlist with install metadata.

The library may offer an opt-in install/fetch step after recommendation. Before any network fetch, show a preview plan with selected skill ids, original source URLs, license state, destination, required permissions, required secrets, agent instruction file updates, and whether the install is standard or evaluation-only.

If the user accepts the install plan, fetch only the explicitly accepted skill from its original `source.url` or official distribution. Do not bulk-download every recommended repo, and do not download downstream repositories listed inside reference catalogs such as `awesome-*` unless the user selects a specific downstream candidate for onboarding.

Each accepted skill is responsible for agent instruction integration in the target repository:

- inspect for existing agent instruction files, including `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/*`, `.github/copilot-instructions.md`, and comparable runtime files
- preserve existing local instructions and ownership boundaries
- add or propose only the minimal instructions needed to make the accepted skill discoverable and usable by the target runtime
- include source, license, invocation, privacy/security cautions, and update/freshness responsibility
- if direct edits are unsafe, output a reviewable patch instead of mutating files

Before fetching or installing an accepted skill, check:

- license state is clear enough for the intended use
- source URL is the original upstream source
- required permissions and secrets are acceptable
- the target runtime is supported or the user accepts an evaluation-only install
- relevant agent instruction files can be updated or a reviewable patch can be produced
- no files from the external source are copied into this repository unless a PR explicitly reviews that adaptation

## Guided Help

Start with repo-inspection consent and structured questions:

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --format json
```

After the user accepts repo inspection:

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --repo-consent accepted \
  --task "describe the initiative or task" \
  --model <model-id> \
  --runtime <runtime-id> \
  --format json
```

Use onboarding for known candidate skills:

```bash
/path/to/skills-library/bin/skills-library.mjs onboard \
  --repo . \
  --repo-consent accepted \
  --candidate <url-or-path> \
  --format json
```

## Manual Fallback

If the CLI is unavailable, read `references/catalog-overview.md` and run the same flow manually:

- Ask for repo-inspection consent.
- Gather initiative goal, repo type, current pain, runtime/model, sensitivity, and time horizon.
- Identify contradictions or missing intent before recommending.
- Recommend a small set of skills or candidate areas with explicit blockers.
- Never imply that candidate skills are approved or installed.

## Capture Feedback

After a skill or recommendation is used:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback collect \
  --repo . \
  --skill-id <skill-id> \
  --signal <feedback-signal> \
  --severity <low|medium|high|blocking|unknown> \
  --task-type <task-type> \
  --model <model-id> \
  --runtime <runtime-id> \
  --notes "Redacted feedback"
```

Then preview:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback preview \
  --file .skills-library/feedback/<feedback-id>.json
```

Submit only with explicit approval:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback submit \
  --target issue \
  --target-repo owner/skills-library \
  --file .skills-library/feedback/<feedback-id>.json \
  --yes
```

## Rules

- Do not submit raw prompts, source code, secrets, personal data, or customer data.
- Do not push directly to the main skills-library branch.
- Use PRs for skill onboarding and catalog/source changes.
- Use public issue comments only for redacted skill-specific feedback.
- Preview feedback before submission.
- Do not download all recommended sources automatically; offer opt-in install and fetch only explicitly accepted skills from original upstream sources.
- Treat standard-mode recommendations as governed; exploratory mode may include candidates with blockers.
- If the runtime cannot execute the CLI, produce the same JSON contract manually and mark compatibility as untested.
