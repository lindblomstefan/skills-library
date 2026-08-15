---
name: skills-library
description: Get guided AI skill recommendations for your repo or team.
---

# Skill Library

Run this silently:
```bash
REMOTE=$(curl -sf --max-time 5 https://raw.githubusercontent.com/lindblomstefan/skills-library/main/.claude/skills/skills-library/VERSION 2>/dev/null); [ "$(cat ~/.claude/skills/skills-library/VERSION 2>/dev/null)" != "$REMOTE" ] && [ -n "$REMOTE" ] && { if [ -d ~/.claude/skills/skills-library/.git ]; then git -C ~/.claude/skills/skills-library pull --ff-only; else git clone --depth=1 https://github.com/lindblomstefan/skills-library /tmp/sl-$$ 2>&1 && cp -r /tmp/sl-$$/.claude/skills/skills-library ~/.claude/skills/ && rm -rf /tmp/sl-$$; fi; echo "UPDATED"; }
```
If output is `UPDATED`, say "Updated. Continuing…" then proceed. Otherwise continue immediately.

Follow this sequence exactly. Do not skip ahead.

## 1. Pick The Flow

- **Recommendation**: default when the user wants skills for a repo, initiative, team, or task.
- **Onboarding**: when the user provides a specific skill candidate to add or evaluate.
- **Feedback**: when the user reports how a skill behaved after use.

If unsure, use **Recommendation**.

## 2. Recommendation Sequence

Use `AskUserQuestion` for structured choices. After any choice that signals the user wants to type, immediately follow up with a plain open-ended question to collect the actual text — do not assume the choice label is the answer.

1. Repo check — run this bash command first, before any questions:
   ```bash
   git rev-parse --git-dir > /dev/null 2>&1 && echo "IS_REPO" || echo "NO_REPO"
   ```
   - If `IS_REPO`: ask using `AskUserQuestion`: question `May I inspect this repo to ground the follow-up questions and recommendations?`, header `"Repo"`, options `Inspect repo | Skip`. If consent given, inspect only safe local context: top-level files, dependency manifests, scripts, language shape, tests, docs, and agent instruction files. A new or empty repo is still a valid repo — inspect what exists.
   - If `NO_REPO`: continue immediately to step 2 without comment.

2. Ask how the user wants to share context:
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

3. Ask remaining narrowing questions one `AskUserQuestion` at a time. Cover what is still unknown: work area, sensitivity, constraints, and time horizon. Always include `Not decided yet` as an option on any question where the answer may not exist yet (stack, timeline, runtime, etc.). Use `multiSelect: true` for any question where multiple answers are valid (work area, constraints). Example option sets:
   - Work area (multiSelect): `Architecture | Security | Frontend | Backend | Data / ML | DevOps`
   - Sensitivity: `Internal | Confidential | Public`
   - Stack (multiSelect): `Node / TypeScript | Python | Other / Mixed | Not decided yet`
   - Constraints (multiSelect): `Security / compliance | No new external services | Ship fast / MVP first`

4. If answers are vague, contradictory, or unstable, ask one focused follow-up before continuing.
5. Recommend only after either a repo read happened or concrete typed answers exist.
6. For each candidate, check `~/.claude/skills/skills-library/feedback/<skill-id>.md` and read it if it exists. Return a shortlist of at most 5 skills: license state, status, blockers, and standard-ready vs exploratory.

## 3. Onboarding Sequence

Use `AskUserQuestion` only for source and license. Decide mode and PR scope yourself — do not ask the user. If the user declines any step, say "Onboarding cancelled. Come back when you're ready." and stop.

1. Candidate source — header `"Source"`, options: `URL or path | Build internal | Chat about this`
2. License state — header `"License"`, options: `Clear | Needs review | Unknown` — ask this before evaluating anything.
3. Decide mode and PR scope silently: external URL + clear license → Reference only, Manifest + eval. Build internal → Adapt, Full skill. Unknown/restricted license → stop and flag.
4. Ask the user for their initial experience note on the skill and write it as entry #1 in `feedback/<skill-id>.md` (copied from `_template.md`). Tell them: "One entry added. Two more from any user will validate this skill." Then prepare the PR-oriented package. Do not push onboarding changes directly to main.

## 4. Feedback Sequence

Use `AskUserQuestion` for every step.

1. Ask which skill or tool suite the feedback is about — treat each source repo as one unit (all sub-skills of a suite map to the same file, e.g. any gstack sub-skill → `gstack`). Then capture redacted free-text feedback.
2. Use the Edit or Write tool to update `~/.claude/skills/skills-library/feedback/<skill-id>.md`: create it from `_template.md` if missing, append a `### <YYYY-MM-DD>` dated entry under `## Entries`, increment `feedback_count`, and set `validated: true` if the new count is 3 or more.
3. Confirm: "Saved to feedback/<skill-id>.md (count: <n>)." If the count just reached 3, add: "<skill> is now validated."

## Hard Rules

- Never recommend without a repo read or concrete answered questions.
- Never recommend from vague, contradictory, or unstable evidence.
- Never download or install recommended skills automatically.
- Never copy external skill assets into this repo without explicit license/provenance review.
- A Git remote is only an install source, not the user's task.
- Use `references/catalog-overview.md` only when the full CLI repo is unavailable.
