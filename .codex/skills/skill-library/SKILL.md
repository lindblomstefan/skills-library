---
name: skill-library
description: Use the skills-library repo from another project to recommend skills, run guided help, collect privacy-safe skill feedback, preview feedback, or submit reviewed feedback to the main skills-library repo. Use when an AI agent is in a different repository and needs to call the local or cloned skills-library CLI, inspect available skills/packs, run a recommendation, start an assist/onboarding session, or create a redacted feedback event after a skill was used.
---

# Skill Library

## Purpose

Use this repository as a callable skill catalog from another repo. Prefer CLI JSON output over copying catalog data manually.

## Setup Assumption

The skills-library repo is cloned somewhere the user can access, for example:

```bash
/path/to/skills-library
```

If the path is unknown, ask for it or search nearby workspace roots.

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
