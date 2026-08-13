---
name: skill-feedback-capture
description: Capture privacy-safe feedback after a skill or skill recommendation is used. Use when an AI agent needs to inspect the local repo context with consent, ask for or process the user's feedback, create a redacted feedback event, preview it, and optionally submit it to the main skills-library repo as a skill-specific GitHub issue comment or reviewable PR artifact. Also use when feedback concerns wrong recommendations, stale skills, missing skills, runtime mismatch, bad output, security/privacy/license concerns, or better replacement candidates.
---

# Skill Feedback Capture

## Purpose

Capture useful feedback without leaking raw prompts, source code, secrets, personal data, customer data, or proprietary project details.

## Workflow

1. Ask permission to inspect the local repo before reading it.
2. Gather repo context as a summary only: stack, branch/commit, CI/test signals, Graphify status, and language/file counts.
3. Ask for the user's feedback comment and classify the signal.
4. Separate what the user said from diagnosis and suggested action.
5. Redact notes before writing anything.
6. Run the local feedback command to write a JSON event in the user's repo.
7. Preview the file with the user before submission.
8. Submit only with explicit approval, preferably as a comment on the skill-specific GitHub feedback issue. Never push directly to `main`.

## CLI Commands

Collect feedback locally:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback collect \
  --repo . \
  --skill-id gstack \
  --signal bad-output \
  --severity medium \
  --task-type architecture-review \
  --model <model-id> \
  --runtime <runtime-id> \
  --notes "Redacted user feedback"
```

Preview:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback preview \
  --file .skills-library/feedback/<feedback-id>.json
```

Submit as a skill-specific issue comment after preview:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback submit \
  --target issue \
  --target-repo owner/skills-library \
  --file .skills-library/feedback/<feedback-id>.json \
  --yes
```

## Required Fields

- skill id
- feedback signal
- severity
- task type
- model and runtime
- redacted user note
- repo context summary
- expected outcome, when known
- actual outcome, when known
- suggested action

## Signal Guidance

Use one of:

- `worked-well`
- `wrong-recommendation`
- `skill-stale`
- `skill-missing`
- `model-runtime-mismatch`
- `bad-output`
- `security-concern`
- `privacy-concern`
- `license-concern`
- `better-replacement-exists`

## Suggested Actions

Use specific actions:

- `update-use-when`
- `update-do-not-use-when`
- `update-compatibility`
- `mark-stale`
- `open-evaluation`
- `add-missing-skill`
- `change-router-scoring`
- `review-security`
- `review-privacy`
- `review-license`
- `review-feedback`

## Privacy Rules

- Do not store raw prompts.
- Do not store source code.
- Do not store secrets or credentials.
- Do not store personal data or customer data.
- Redact repo names if sensitivity requires it.
- Keep comments short and redacted.
- If privacy flags indicate prompt, code, or secret content, do not submit.

## Submission Rules

- Write feedback locally first.
- Preview before submission.
- Prefer GitHub issue comments on `Feedback: <skill-id>` for redacted feedback signals.
- Use PR submission only for reviewed artifacts or repository changes.
- Never commit and push directly to `main`.
- Never submit without explicit approval.

## Model-Agnostic Use

These instructions are model-agnostic. If the runtime cannot call the CLI or GitHub, produce the same redacted event locally and give the user the exact review/submission steps.
