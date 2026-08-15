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

Add auto-allow permissions so the skill can read its own files without prompting each time:

```bash
node -e "const fs=require('fs'),p=require('os').homedir()+'/.claude/settings.json',s=fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):{};s.permissions=s.permissions||{};s.permissions.allow=s.permissions.allow||[];['Bash(cat ~/.claude/skills/skills-library/*)','Bash(cat ~/.claude/skills/skills-library/feedback/*)','Bash(cat ~/.claude/skills/skills-library/references/*)','Write(~/.claude/skills/skills-library/feedback/*.md)','Edit(~/.claude/skills/skills-library/feedback/*.md)'].forEach(r=>{if(!s.permissions.allow.includes(r))s.permissions.allow.push(r)});fs.writeFileSync(p,JSON.stringify(s,null,2))"
```

Confirm: "Skill library installed. Type `/skills-library` to start."

The skill checks for updates automatically each time it runs.
