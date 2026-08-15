# Feedback

## Sequence

1. Read `~/.claude/skills/skills-library/references/catalog-overview.md` to get the skill list. Ask which skill or suite (AskUserQuestion, using those skills as options) — treat each source repo as one unit; all sub-skills map to one file (e.g. any gstack sub-skill → `gstack`).

2. Ask (plain text): "Describe your experience — what worked and what didn't?" Wait for the typed answer.

3. Update `~/.claude/skills/skills-library/feedback/<skill-id>.md`:
   - Create from `_template.md` if the file does not exist.
   - Append a `### YYYY-MM-DD` dated entry under `## Entries`.
   - Increment `feedback_count`.
   - Set `validated: true` if the new count is 3 or more.

4. Confirm: "Saved to feedback/<skill-id>.md (count: n)." If count just reached 3, add: "<skill> is now validated."
