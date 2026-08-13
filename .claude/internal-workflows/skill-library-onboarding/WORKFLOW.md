---
name: skill-library-onboarding
description: Onboard or evaluate a known skill candidate for the skills-library repo. Use when an AI agent needs to inspect a candidate skill, check license before evaluation, gather catalog metadata, expose missing fields, prepare evaluation evidence, and create a reviewable PR package instead of pushing directly to main.
---

# Skill Library Onboarding

## Purpose

Make skill additions repeatable, reviewable, and safe. Onboarding changes that add or modify library skills must go through a pull request.

## Workflow

1. Ask permission before reading the target repo or candidate source.
2. Check the candidate's license state first. Record license name, SPDX id when known, redistribution limits, and whether modification or asset copying is allowed.
3. If license is `unknown`, `needs-review`, restricted, or absent, block approval and continue only with evaluation notes.
4. Gather source, scope, routing, compatibility, distribution, trust, risk, lifecycle, relationships, and metrics-readiness fields.
5. Ask focused follow-up questions for missing fields. Include choices and allow "chat about this".
6. Separate facts, assumptions, unknowns, and human-review blockers.
7. Prepare a branch/PR package for catalog or skill changes. Never direct-push onboarding changes to `main`.

## CLI Helper

Use this repository's CLI when available:

```bash
/path/to/skills-library/bin/skills-library.mjs onboard \
  --repo . \
  --repo-consent accepted \
  --candidate <url-or-path> \
  --model <model-id> \
  --runtime <runtime-id> \
  --format json
```

If repo or candidate inspection is not approved, start with the consent and source questions.

## Required Gates

- License check happens before evaluation, copying, pack inclusion, or approval.
- Unknown license blocks approval.
- Security, privacy, compliance, owner, final decision, and pack inclusion need human review.
- Public issues may contain only redacted discussion. Actual library changes need PR review.

## PR Package

A complete onboarding PR should include the relevant subset of:

- candidate manifest or updated `catalog/skills/<id>.yaml`
- evidence matrix for model/runtime compatibility
- evaluation run or notes
- routing guidance and anti-examples
- risk, trust, license, and freshness fields
- open questions and blockers
- skill files under `.claude/skills/<id>/`, if the skill is internal or adapted

## Model-Agnostic Use

These instructions are model-agnostic. If the runtime cannot create branches or PRs, produce a local PR package and explicit commands for the user. Do not specialize this skill unless a runtime-specific integration becomes unavoidable.
