# Onboarding

Use `AskUserQuestion` only where specified. Decide everything else yourself. If the user declines any step, say "Onboarding cancelled. Come back when you're ready." and stop.

## Sequence

1. Source — header `"Source"`, options: `URL or path | Build internal | Chat about this`

2. License — check it yourself. Fetch the source URL and look for a LICENSE file or license badge:
   - Permissive (MIT, Apache 2.0, BSD, ISC, etc.) → proceed silently as Clear
   - Proprietary, restricted, or "All Rights Reserved" → stop; tell the user why
   - No license found → tell the user what you found; ask (header `"License"`, options `Proceed anyway | Cancel`)

3. Decide mode silently:
   - External URL + clear license → Reference only
   - Build internal → Adapt

4. Prepare the PR package in this exact order:
   - Derive skill-id from the skill's `name` field in its SKILL.md, or from the source repo name. Read `~/.claude/skills/skills-library/feedback/_template.md` and write `~/.claude/skills/skills-library/feedback/<skill-id>.md` from it — only if the file does not already exist.
   - Ask (plain text): "What's your initial take on this skill?" If answered, write as entry #1 and say: "One entry added. Two more from any user will validate this skill." If skipped, leave the file empty.
   - Write `catalog/library-skills/<skill-id>.yaml` with source, license, domains, and routing metadata.
   - Add a one-line entry to `references/catalog-overview.md` under the library skills section — only if the skill is not already listed.

No evaluation run. Do not push directly to main.
