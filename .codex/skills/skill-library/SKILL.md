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

1. Ask this as the first visible question:
   `Tell me about the idea: what are you trying to build or improve, what goal should it achieve, and what should the intended end product look like?`
2. Ask repo-inspection consent before reading files:
   `May I inspect this repo to ground the follow-up questions and recommendations?`
3. If consent is accepted, inspect only safe local context: top-level files, dependency manifests, scripts, language shape, tests, docs, and agent instruction files.
4. If consent is denied or no repo exists, continue by questions only.
5. Ask only the narrowing questions still needed: work area, sensitivity, runtime/model, constraints, time horizon, and any missing goal details.
6. If answers or repo evidence are vague, contradictory, or unstable, stop and ask for clarification.
7. Recommend only after either a repo read happened or concrete interview answers exist.
8. Return a shortlist of at most 5 skills. For each, show license state, status, blockers, compatibility, and whether it is standard-ready or exploratory.

Use the CLI when available:

```bash
/path/to/skills-library/bin/skills-library.mjs assist --repo . --format text
```

Run `recommend` only after step 7 is satisfied. If it returns `Skill-library interview required`, ask those questions instead of recommending.

## 3. Onboarding Sequence

1. Ask for the candidate source.
2. Ask the license type/state before anything else.
3. Decide whether onboarding is reference-only, adapted, or copied. Copying requires explicit license/provenance review.
4. Prepare a PR-oriented package. Do not push onboarding changes directly to main.

## 4. Feedback Sequence

1. Ask permission to read the local repo context.
2. Capture the user's redacted feedback.
3. Preview before any submission.
4. Submit only with explicit approval. Use public issue comments only for redacted, skill-specific feedback.

## Hard Rules

- Never recommend without a repo read or concrete answered questions.
- Never recommend from vague, contradictory, or unstable evidence.
- Never download or install recommended skills automatically.
- Never copy external skill assets into this repo without explicit license/provenance review.
- A Git remote is only an install source, not the user's task.
- Use `references/catalog-overview.md` only when the full CLI repo is unavailable.
