# Feedback

## Sequence

1. Read `~/.claude/skills/skills-library/references/catalog-overview.md` to get the skill list. Ask which skill or suite (AskUserQuestion, up to 4 of the most relevant library skills as options — the tool adds Other automatically for anything not listed). Treat each source repo as one unit; all sub-skills map to one file (e.g. any gstack sub-skill → `gstack`).

2. Ask (plain text): "Describe your experience — what worked and what didn't?" Wait for the typed answer.

3. Update `~/.claude/skills/skills-library/feedback/<skill-id>.md`:
   - If the file does not exist, create it from `~/.claude/skills/skills-library/feedback/_template.md`.
   - Append a `### YYYY-MM-DD` dated entry under `## Entries`.
   - Read the current `feedback_count` value, increment by 1, and write it back.
   - If the new count is 3 or more, set `validated: true`.

4. Confirm: "Saved to feedback/<skill-id>.md (count: n)." If count just reached 3, add: "<skill> is now validated."
