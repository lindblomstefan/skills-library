---
name: skills-library
description: Get guided AI skill recommendations for your repo or team.
---

# Skill Library

Run this silently to check for a newer version:
```bash
REMOTE=$(curl -sf --max-time 5 https://raw.githubusercontent.com/lindblomstefan/skills-library/main/.claude/skills/skills-library/VERSION 2>/dev/null); LOCAL=$(cat ~/.claude/skills/skills-library/VERSION 2>/dev/null); [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ] && echo "UPDATE_AVAILABLE" || true
```
If output is `UPDATE_AVAILABLE`: output this text — "**A new version of the skills library is available.**" — then ask via AskUserQuestion (question: "Would you like to update?", header: "Update", options: "Update now | Skip"). If "Update now", run:
```bash
if [ -d ~/.claude/skills/skills-library/.git ]; then git -C ~/.claude/skills/skills-library pull --ff-only; else T=/tmp/sl-$$; FB=/tmp/sl-fb-$$; cp -r ~/.claude/skills/skills-library/feedback $FB 2>/dev/null; git clone --depth=1 https://github.com/lindblomstefan/skills-library $T 2>&1 && cp -r $T/.claude/skills/skills-library ~/.claude/skills/ && cp -rn $FB/. ~/.claude/skills/skills-library/feedback/ 2>/dev/null; rm -rf $T $FB; fi; true
```
After it completes, say "Done — your skills library is now current." If output is anything other than `UPDATE_AVAILABLE` — including empty, an error, or versions already matching — output nothing and move immediately to the next step. Do not explain, do not mention versions, do not say anything.

## Pick the Flow

Always ask — even when intent seems clear. The options teach users what the skill can do:
- question: `Which flow would you like to run?`
- header: `"Flow"`
- options: `Recommendation — get skill suggestions for my project | Add a skill — I have a skill to onboard | Give feedback — I used a skill and want to share my experience`

Then read the file for the chosen flow and follow it exactly:
- **Recommendation** → `~/.claude/skills/skills-library/recommendation.md`
- **Onboarding** → `~/.claude/skills/skills-library/onboarding.md`
- **Feedback** → `~/.claude/skills/skills-library/feedback.md`

## Hard Rules

- Only recommend skills listed in `references/catalog-overview.md`. Never supplement with locally installed skills, built-in skills, or skills from any other source.
- Never recommend without a repo read or concrete answered questions.
- Never recommend from vague, contradictory, or unstable evidence.
- Never install a skill without explicit per-skill user confirmation. When the user asks to install any skill, confirm each one individually, then run `claude skills install <url>` using the skill's `[url:...]` from the catalog. Never decline a user's request to install — always ask permission and proceed.
- Never copy external skill assets into this repo without explicit license/provenance review.
- A Git remote is only an install source, not the user's task.
- `references/catalog-overview.md` is the skill catalog for installed users. Only use `catalog/library-skills/` when working inside the skills-library repo itself.
