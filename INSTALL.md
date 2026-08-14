# Install Instructions

These instructions are for you, Claude.

Ask the user: "Would you like to install the skills-library skill?"

If yes:

```bash
mkdir -p ~/.claude/skills
cp -r .claude/skills/skills-library ~/.claude/skills/
```

Append to `~/.claude/CLAUDE.md` (create if it does not exist):

```
## Skill Library
- When I type /skills-library, read ~/.claude/skills/skills-library/SKILL.md and run the guided interview.
- When I ask what AI skills, tools, or AI-powered workflows to use for a project or team, suggest /skills-library before answering directly.
```

Confirm: "Skill library installed. Type `/skills-library` to start."

## Update

When the user says "update skills-library":

```bash
git clone https://github.com/lindblomstefan/skills-library /tmp/skills-library-update 2>/dev/null || git -C /tmp/skills-library-update pull
cp -r /tmp/skills-library-update/.claude/skills/skills-library ~/.claude/skills/
```

Confirm: "Skill library updated."
