# Onboarding

Use `AskUserQuestion` for source and license only. Decide everything else yourself. If the user declines any step, say "Onboarding cancelled. Come back when you're ready." and stop.

## Sequence

1. Source — header `"Source"`, options: `URL or path | Build internal | Chat about this`

2. License — header `"License"`, options: `Clear | Needs review | Unknown`. Ask before evaluating anything.

3. Decide mode silently:
   - External URL + clear license → Reference only
   - Build internal → Adapt
   - Unknown or restricted license → stop and tell the user why; do not proceed

4. Prepare the PR package in this exact order:
   - Create `~/.claude/skills/skills-library/feedback/<skill-id>.md` from `_template.md` silently.
   - Ask (plain text): "What's your initial take on this skill?" If answered, write as entry #1 and say: "One entry added. Two more from any user will validate this skill." If skipped, leave the file empty.
   - Write `catalog/library-skills/<skill-id>.yaml` with source, license, domains, and routing metadata.
   - Add a one-line entry to `references/catalog-overview.md`.

No evaluation run. Do not push directly to main.
