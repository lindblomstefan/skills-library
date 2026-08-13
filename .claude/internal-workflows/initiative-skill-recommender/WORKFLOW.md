---
name: initiative-skill-recommender
description: Interview a repo, user, and runtime context to recommend a set of skills or packs for an initiative. Use when an AI agent needs to inspect a local repo with consent, ask realistic follow-up questions with choices, identify missing or contradictory intent, build an initiative profile, and recommend skills only from stable evidence.
---

# Initiative Skill Recommender

## Purpose

Turn repo context and user intent into a skill-set recommendation without guessing from vague, contradictory, or sensitive evidence.

## Workflow

1. Ask permission before reading the repo.
2. If permission is denied or the repo does not exist, start with structured questions only.
3. If permission is accepted, inspect only safe summary context: repo structure, README/package metadata, Graphify availability, scripts, and high-level stack signals.
4. Summarize what was inferred, what is missing, and what cannot be used as evidence.
5. Ask the fewest realistic follow-up questions needed to recommend skills.
6. Include choices and allow "chat about this" for every decision that could be sensitive or unclear.
7. Do not recommend from contradictory, vague, or missing evidence. Ask stabilization questions first.
8. Run the skills-library recommendation CLI when the profile is stable enough.

## CLI Helper

Use this repository's CLI when available:

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --repo-consent accepted \
  --task "describe the initiative" \
  --model <model-id> \
  --runtime <runtime-id> \
  --format json
```

If the user has not approved repo inspection, omit `--repo-consent accepted` and present the generated consent question first.

## Question Contract

Questions should use this shape:

```yaml
id:
question:
why_it_matters:
choices:
  - value:
    label:
    description:
allow_free_text: true
evidence_needed: []
blocks_recommendation: true
```

The user must be able to pick a choice or chat about the topic in free text.

## Evidence Gate

Before recommending:

- Mark repo-derived facts separately from user-provided answers.
- Mark unsupported assumptions as `missing`.
- Mark conflicting answers as `contradictory`.
- Do not convert contradictions into recommendations.
- Keep standard recommendations blocked until sensitivity, goal, runtime, and expected artifacts are clear.

## Output

Return:

- repo inspection consent and scope
- repo context summary, if inspected
- initiative profile
- remaining questions
- recommended skills or packs
- not-recommended candidates with reasons
- evidence and blockers

## Model-Agnostic Use

These instructions are model-agnostic. If the runtime cannot execute the CLI, produce the same question contract and recommendation rationale manually, and clearly mark compatibility as untested for that runtime.
