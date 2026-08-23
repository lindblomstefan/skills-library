# Onboarding

Use `AskUserQuestion` only where specified. Decide everything else yourself. If the user declines any step, say "Onboarding cancelled. Come back when you're ready." and stop.

## Sequence

1. Source — header `"Source"`, options: `URL or path | Build internal | Chat about this`. If `URL or path` is chosen, immediately ask (plain text): "What is the GitHub URL for this skill?" Record the exact URL — it is required for the catalog entry. If the user cannot provide it, ask them to find it before continuing.

2. License — check it yourself. Fetch the source URL and look for a LICENSE file or license badge:
   - Permissive (MIT, Apache 2.0, BSD, ISC, etc.) → proceed silently as Clear
   - Proprietary, restricted, or "All Rights Reserved" → stop; tell the user why
   - No license found → tell the user what you found; ask (header `"License"`, options `Proceed anyway | Cancel`)

3. Decide mode silently:
   - External URL + clear license → Reference only
   - Build internal → Adapt

4. Prepare the PR package. First tell the user: "I'll now create three things for the PR: a feedback file, a catalog YAML entry, and a line in the catalog overview." Then in this exact order:
   - Derive skill-id from the skill's `name` field in its SKILL.md, or from the source repo name. Say "Writing feedback file for <skill-id>." Read `~/.claude/skills/skills-library/feedback/_template.md` and write `~/.claude/skills/skills-library/feedback/<skill-id>.md` from it — only if the file does not already exist.
   - Ask (plain text): "What's your initial take on this skill?" If answered, write as entry #1 and say: "One entry added. Two more from any user will validate this skill." If skipped, leave the file empty.
   - Say "Here is the catalog YAML to add as `catalog/library-skills/<skill-id>.yaml` in your PR:" then output the YAML as a code block (source, license, domains, routing metadata). Do not write this file to disk.
   - Say "Adding to catalog overview." Add a one-line entry to `~/.claude/skills/skills-library/references/catalog-overview.md` under the library skills section — only if the skill is not already listed. Include a `[url:...]` tag with the exact GitHub URL captured in step 1, then a `[license:...]` tag. Format: `**skill-id** — description [url:https://github.com/owner/repo] [license:...]`. For internal builds with no external URL, omit the `[url:...]` tag. Use these plain-English license formats:
   - Clear permissive (MIT/Apache/BSD/ISC): `[license:clear — MIT, use freely]`
   - Clear weak copyleft (MPL-2.0): `[license:clear — MPL-2.0, use freely; if you modify the skill files themselves those changes must stay MPL]`
   - Needs-review strong copyleft (AGPL/GPL): `[license:needs-review — AGPL-3.0, strong copyleft; check org policy before approving]`
   - Needs-review share-alike (CC-BY-SA): `[license:needs-review — CC-BY-SA-4.0, share-alike; not a standard software license; check org policy]`
   - Needs-review source-available: `[license:needs-review — source-available; reference use only, not open source]`
   - Needs-review no license: `[license:needs-review — no LICENSE file; contact maintainer before approving]`

No evaluation run. Do not push directly to main.
