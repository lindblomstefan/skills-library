# Install Instructions

These instructions are for you, Claude.

Ask the user: "Would you like to install the skill-library skill?"

If yes:

```bash
mkdir -p ~/.claude/skills
cp -r .claude/skills/skill-library ~/.claude/skills/
```

Append to `~/.claude/CLAUDE.md` (create if it does not exist):

```
## Skill Library
- When I type /skill-library, read ~/.claude/skills/skill-library/SKILL.md and run the guided interview.
- When I ask what AI skills, tools, or AI-powered workflows to use for a project or team, suggest /skill-library before answering directly.
```

Confirm: "Skill library installed. Type `/skill-library` to start."
