---
name: skill-library
description: Use when the user asks to use, test, or install the skills-library skill; asks what AI skills a repo, initiative, or team needs; wants guided skill recommendations; wants to browse/evaluate the library catalog; or wants privacy-safe feedback capture after using a skill. The skill starts with a sequenced interview, not an open-ended task question.
---

# Skill Library

Follow this sequence exactly. Do not skip ahead.

## 1. Pick The Flow

- **Recommendation**: default when the user wants skills for a repo, initiative, team, or task.
- **Onboarding**: when the user provides a specific skill candidate to add or evaluate.
- **Feedback**: when the user reports how a skill behaved after use.

If unsure, use **Recommendation**.

## 2. Recommendation Sequence

Use `AskUserQuestion` for every interview question — never type questions as plain prose.

1. Open with a single free-text question (no choices required):
   - question: `Tell me about the idea: what are you trying to build or improve, what goal should it achieve, and what should the intended end product look like?`
   - header: `"Context"`
   - options: `Describe freely | Problem only | Chat about this`
   - Allow the user to type their own answer (treat any answer as valid input).

2. Ask repo-inspection consent as the next `AskUserQuestion`:
   - question: `May I inspect this repo to ground the follow-up questions and recommendations?`
   - header: `"Repo access"`
   - options: `Inspect repo | Questions only | Chat about this`

3. If consent is accepted, inspect only safe local context: top-level files, dependency manifests, scripts, language shape, tests, docs, and agent instruction files.
4. If consent is denied or no repo exists, continue by questions only.

5. Ask remaining narrowing questions one `AskUserQuestion` call at a time (batch only truly independent ones). Cover: work area, sensitivity, runtime/model, constraints, time horizon, and any missing goal details. Example option sets:
   - Work area: `Architecture | Security | Frontend | Backend | Data / ML | DevOps`
   - Sensitivity: `Internal | Confidential | Public`
   - Runtime: `Agent skill host | Codex CLI | Other`

6. If answers or repo evidence are vague, contradictory, or unstable, ask a focused follow-up `AskUserQuestion` before continuing.
7. Recommend only after either a repo read happened or concrete interview answers exist.
8. Return a shortlist of at most 5 skills. For each, show license state, status, blockers, compatibility, and whether it is standard-ready or exploratory.

Use the CLI when available:

```bash
/path/to/skills-library/bin/skills-library.mjs assist --repo . --format text
```

Run `recommend` only after step 7 is satisfied. If it returns `Skill-library interview required`, ask those questions instead of recommending.

## 3. Onboarding Sequence

Use `AskUserQuestion` for every step. Ask one question at a time unless questions are truly independent.

1. Candidate source — header `"Source"`, options: `URL or path | Build internal | Chat about this`
2. License state — header `"License"`, options: `Clear | Needs review | Unknown` — ask this before evaluating anything.
3. Onboarding mode — header `"Mode"`, options: `Reference only | Adapt | Copy assets` — copying requires explicit license/provenance review.
4. PR scope — header `"PR scope"`, options: `Manifest only | Manifest + eval | Full skill`
5. Prepare a PR-oriented package. Do not push onboarding changes directly to main.

## 4. Feedback Sequence

Use `AskUserQuestion` for every step.

1. Repo access — header `"Repo access"`, options: `Allow repo read | Skip repo read`
2. Capture the user's redacted feedback as free text.
3. Preview the submission to the user before doing anything.
4. Submit only with explicit approval — header `"Submit"`, options: `Approve | Edit first | Cancel`. Use public issue comments only for redacted, skill-specific feedback.

## Hard Rules

- Never recommend without a repo read or concrete answered questions.
- Never recommend from vague, contradictory, or unstable evidence.
- Never download or install recommended skills automatically.
- Never copy external skill assets into this repo without explicit license/provenance review.
- A Git remote is only an install source, not the user's task.
- Use `references/catalog-overview.md` only when the full CLI repo is unavailable.
