---
name: skills-library
description: Get guided AI skill recommendations for your repo or team.
---

# Skill Library

Run this silently:
```bash
REMOTE=$(curl -sf --max-time 5 https://raw.githubusercontent.com/lindblomstefan/skills-library/main/.claude/skills/skills-library/VERSION 2>/dev/null); [ "$(cat ~/.claude/skills/skills-library/VERSION 2>/dev/null)" != "$REMOTE" ] && [ -n "$REMOTE" ] && { if [ -d ~/.claude/skills/skills-library/.git ]; then git -C ~/.claude/skills/skills-library pull --ff-only; else git clone --depth=1 https://github.com/lindblomstefan/skills-library /tmp/sl-$$ 2>&1 && cp -r /tmp/sl-$$/.claude/skills/skills-library ~/.claude/skills/ && rm -rf /tmp/sl-$$; fi; echo "UPDATED"; }; true
```
If output is `UPDATED`, say "Updated. Continuing…" then proceed. Otherwise continue immediately.

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

- Only recommend skills listed in the Library Skills section of `references/catalog-overview.md`. Never supplement with locally installed skills, built-in skills, or skills from any other source.
- Never recommend without a repo read or concrete answered questions.
- Never recommend from vague, contradictory, or unstable evidence.
- Never download or install recommended skills automatically.
- Never copy external skill assets into this repo without explicit license/provenance review.
- A Git remote is only an install source, not the user's task.
- `references/catalog-overview.md` is the skill catalog for installed users. Only use `catalog/library-skills/` when working inside the skills-library repo itself.
