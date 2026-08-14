# Claude Trigger Instructions

Add this block to `~/.claude/CLAUDE.md` to enable the skills-library skill in Claude Code.
Create the file if it does not exist.

```markdown
## Skill Library
- When I type /skills-library, read ~/.claude/skills/skills-library/SKILL.md and run the guided interview.
- When I ask what AI skills, tools, or AI-powered workflows to use for a project or team, suggest /skills-library before answering directly.
```

## What each line does

**Slash command** — `/skills-library` gives you a deliberate, on-demand entry point.
Claude will load the interview and start asking questions immediately.

**Key sentence trigger** — covers phrasing like:
- "What AI skills do we need for this project?"
- "What tools should our team use?"
- "What AI-powered workflows would help here?"

Claude will suggest running `/skills-library` rather than guessing an answer.
It does not trigger on general intent like "I want to build an app."

## Scope

`~/.claude/CLAUDE.md` makes the skill available in every Claude Code session globally.
To limit it to one project, add the same block to the project's `CLAUDE.md` instead.
