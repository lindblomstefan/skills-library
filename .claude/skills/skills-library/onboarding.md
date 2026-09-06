# Onboarding

Use `AskUserQuestion` only where specified. Decide everything else yourself. If the user declines, say "Onboarding cancelled." and stop.

## Sequence

1. **Source** — header `"Source"`, options: `URL or path | Build internal | Chat about this`. If URL: ask "What is the GitHub URL?" Record it exactly.

2. **License** — check it yourself. Look for a LICENSE file at the source:
   - Permissive (MIT, Apache 2.0, BSD, ISC) → proceed silently as Clear
   - Proprietary/restricted → stop; tell the user why
   - No license → ask (`"License"`, options `Proceed anyway | Cancel`)

3. **Mode** — silently: external URL + clear license → Reference only; internal → Adapt.

4. **Local files** — say "I'll create a local feedback file and prepare the catalog entry." Then:
   - Write `~/.claude/skills/skills-library/feedback/<skill-id>.md` from `_template.md` if it doesn't exist.
   - Ask (plain text): "What's your initial take?" If answered, write as entry #1 and say "One entry added. Two more will validate this skill."
   - Add one line to `~/.claude/skills/skills-library/references/catalog-overview.md` under library skills if not already listed: `**skill-id** — description [url:…] [license:…]`. License tag: `[license:clear — MIT, use freely]` for permissive; adjust wording for other types (see feedback.md step 4 for full list).

5. **YAML** — build full `catalog/library-skills/<skill-id>.yaml` matching `graphify.yaml` schema. `status: candidate`. Hold in memory.

6. **GitHub PR** — run each as bash:
   a. `gh auth status -h github.com 2>/dev/null` — if non-zero, print YAML as code block and say "Run `! gh auth login` to submit automatically." Stop.
   b. Capture: `GH_USER=$(GH_HOST=github.com gh api /user | jq -r .login)` · `DATE=$(date +%Y-%m-%d)` · `BRANCH=skill/<skill-id>-$(date +%Y%m%d%H%M%S)` · `REPO=lindblomstefan/skills-library` · `YAML_PATH=catalog/library-skills/<skill-id>.yaml` · `OVERVIEW_PATH=.claude/skills/skills-library/references/catalog-overview.md`
   c. Fork: `gh repo fork "$REPO" --clone=false --remote=false 2>/dev/null; true`
   d. Branch: get `DEFAULT_SHA` via `gh api "repos/${REPO}/git/refs/heads/main" --jq .object.sha`; create ref on fork at that SHA.
   e. PUT YAML: base64-encode content; PUT to `repos/${GH_USER}/skills-library/contents/${YAML_PATH}` on `$BRANCH` (new file — no sha field).
   f. PUT catalog-overview: fetch from upstream, get sha+content, decode, append new skill line, re-encode; PUT back to fork branch with sha.
   g. `PR_URL=$(gh pr create --repo "$REPO" --title "skill: add <skill-id> — $DATE (@$GH_USER)" --body "Adds **<skill-id>** as a candidate skill.\n\nSubmitted by @$GH_USER via the skills-library onboarding flow." --head "${GH_USER}:${BRANCH}" --base main)`
   h. Confirm: "Done — <skill-id> submitted: $PR_URL. It will merge automatically and be available to all users on their next update."
