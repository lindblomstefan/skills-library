# Recommendation

Use `AskUserQuestion` for all structured choices. After any choice that signals the user wants to type, immediately follow with a plain open-ended question — do not assume the choice label is the answer. Wait for the typed answer before continuing.

## Sequence

1. Run first, before any questions:
   ```bash
   git rev-parse --git-dir > /dev/null 2>&1 && echo "IS_REPO" || echo "NO_REPO"
   ```
   - `IS_REPO`: ask `May I inspect this repo to ground the follow-up questions and recommendations?` (header `"Repo"`, options `Inspect repo | Skip`). If yes, inspect: top-level files, manifests, scripts, language shape, tests, docs, agent files. A new or empty repo is still valid — inspect what exists.
   - `NO_REPO`: continue immediately without comment.

2. Ask `How would you like to tell me about what you need?` (header `"Context"`, options `Describe freely | Problem only | Chat about this`). Then ask a plain follow-up — no options:
   - Describe freely → `Go ahead — what are you trying to build or improve, and what should the end result look like?`
   - Problem only → `What is the problem you are trying to solve?`
   - Chat about this → `What is on your mind?`

3. Ask remaining narrowing questions one at a time. Cover what is still unknown. Always include `Not decided yet` where the answer may not exist. Use `multiSelect: true` where multiple answers are valid:
   - Work area (multiSelect): `Architecture | Security | Frontend | Backend | Data / ML | DevOps`
   - Sensitivity: `Internal | Confidential | Public`
   - Stack (multiSelect): `Node / TypeScript | Python | Other / Mixed | Not decided yet`
   - Constraints (multiSelect): `Security / compliance | No new external services | Ship fast / MVP first`

4. If answers are vague, contradictory, or unstable — ask one focused follow-up before continuing.

5. Recommend only after a repo read or concrete typed answers exist. Read `~/.claude/skills/skills-library/references/catalog-overview.md` — both Evaluating and Candidates sections are fair game. For each match, also read `~/.claude/skills/skills-library/feedback/<skill-id>.md` if it exists. Return at most 5 skills. For each show: status (evaluating / candidate), validation count from feedback file, license state, and any blockers. Never add skills not in catalog-overview.md — no built-in skills, no locally installed skills, no exceptions.
