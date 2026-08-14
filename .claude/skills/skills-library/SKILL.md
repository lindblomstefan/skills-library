---
name: skills-library
description: Get guided AI skill recommendations for your repo or team.
---

# Skill Library

Run this silently with no output to the user when versions match:
```bash
[ "$(cat ~/.claude/skills/skills-library/VERSION 2>/dev/null)" = "$(curl -sf https://raw.githubusercontent.com/lindblomstefan/skills-library/main/.claude/skills/skills-library/VERSION 2>/dev/null)" ] || echo "UPDATE_NEEDED"
```
Only if output is `UPDATE_NEEDED`, ask using `AskUserQuestion`: question "There is an update available. Install it now?", header "Update", options `Yes | No`. If yes:
```bash
if [ -d ~/.claude/skills/skills-library/.git ]; then git -C ~/.claude/skills/skills-library pull --ff-only; else git clone https://github.com/lindblomstefan/skills-library /tmp/sl-$$ && cp -r /tmp/sl-$$/.claude/skills/skills-library ~/.claude/skills/ && rm -rf /tmp/sl-$$; fi
```
Then continue. If no or no output, continue immediately.

Follow this sequence exactly. Do not skip ahead.

## 1. Pick The Flow

- **Recommendation**: default when the user wants skills for a repo, initiative, team, or task.
- **Onboarding**: when the user provides a specific skill candidate to add or evaluate.
- **Feedback**: when the user reports how a skill behaved after use.

If unsure, use **Recommendation**.

## 2. Recommendation Sequence

Use `AskUserQuestion` for structured choices. After any choice that signals the user wants to type, immediately follow up with a plain open-ended question to collect the actual text — do not assume the choice label is the answer.

1. Ask how the user wants to share context:
   - question: `How would you like to tell me about what you need?`
   - header: `"Context"`
   - options:
     - `Describe freely` — user will write their own description
     - `Problem only` — user wants to share a pain point, solution not needed yet
     - `Chat about this` — user wants to talk it through first
   - After the user picks, write a plain conversational follow-up — NOT an AskUserQuestion. The user must type a free-text answer:
     - "Describe freely" → write: `Go ahead — what are you trying to build or improve, and what should the end result look like?`
     - "Problem only" → write: `What is the problem you are trying to solve?`
     - "Chat about this" → write: `What is on your mind?`
   - Wait for the user's typed answer before continuing. Do not present any options.

2. Repo inspection — only ask if the current session is inside a repo that has existing content. If the repo is empty, missing, or not detectable, skip this step entirely and continue with questions only.
   - question: `May I inspect this repo to ground the follow-up questions and recommendations?`
   - header: `"Repo access"`
   - options: `Inspect repo | Questions only`
   - If consent is accepted, inspect only safe local context: top-level files, dependency manifests, scripts, language shape, tests, docs, and agent instruction files.

3. Ask remaining narrowing questions one `AskUserQuestion` at a time. Cover what is still unknown: work area, sensitivity, constraints, and time horizon. Always include `Not decided yet` as an option on any question where the answer may not exist yet (stack, timeline, runtime, etc.). Example option sets:
   - Work area: `Architecture | Security | Frontend | Backend | Data / ML | DevOps`
   - Sensitivity: `Internal | Confidential | Public`
   - Stack: `Node / TypeScript | Python | Other / Mixed | Not decided yet`

4. If answers are vague, contradictory, or unstable, ask one focused follow-up before continuing.
5. Recommend only after either a repo read happened or concrete typed answers exist.
6. Return a shortlist of at most 5 skills. For each, show license state, status, blockers, and whether it is standard-ready or exploratory.

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
