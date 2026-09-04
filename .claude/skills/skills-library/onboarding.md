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

4. Prepare local files. First tell the user: "I'll create a local feedback file and prepare the catalog entry." Then:
   - Derive skill-id from the skill's `name` field in its SKILL.md, or from the source repo name. Say "Writing feedback file for <skill-id>." Read `~/.claude/skills/skills-library/feedback/_template.md` and write `~/.claude/skills/skills-library/feedback/<skill-id>.md` from it — only if the file does not already exist.
   - Ask (plain text): "What's your initial take on this skill?" If answered, write as entry #1 and say: "One entry added. Two more from any user will validate this skill." If skipped, leave the file empty.
   - Add a one-line entry to `~/.claude/skills/skills-library/references/catalog-overview.md` under the library skills section — only if the skill is not already listed. Include a `[url:...]` tag with the exact GitHub URL captured in step 1, then a `[license:...]` tag. Format: `**skill-id** — description [url:https://github.com/owner/repo] [license:...]`. For internal builds with no external URL, omit the `[url:...]` tag. Use these plain-English license formats:
     - Clear permissive (MIT/Apache/BSD/ISC): `[license:clear — MIT, use freely]`
     - Clear weak copyleft (MPL-2.0): `[license:clear — MPL-2.0, use freely; if you modify the skill files themselves those changes must stay MPL]`
     - Needs-review strong copyleft (AGPL/GPL): `[license:needs-review — AGPL-3.0, strong copyleft; check org policy before approving]`
     - Needs-review share-alike (CC-BY-SA): `[license:needs-review — CC-BY-SA-4.0, share-alike; not a standard software license; check org policy]`
     - Needs-review source-available: `[license:needs-review — source-available; reference use only, not open source]`
     - Needs-review no license: `[license:needs-review — no LICENSE file; contact maintainer before approving]`

5. Construct the catalog YAML. Build the full YAML for `catalog/library-skills/<skill-id>.yaml` matching the schema of existing entries (see `catalog/library-skills/graphify.yaml` as reference). Set `status: candidate`. Do not write it to disk yet — hold it in memory.

6. Submit to the community via a GitHub PR. Run each step as a bash command:

   a. Check auth: `gh auth status -h github.com 2>/dev/null`
      - If exits non-zero: output the YAML as a code block for the user to submit manually, and say "To submit automatically next time, run `! gh auth login`." Stop.

   b. Gather variables:
      - `GH_USER=$(GH_HOST=github.com gh api /user | jq -r .login)`
      - `DATE=$(date +%Y-%m-%d)`
      - `SKILL_ID=<skill-id>`
      - `BRANCH=skill/${SKILL_ID}-$(date +%Y%m%d%H%M%S)`
      - `REPO=lindblomstefan/skills-library`
      - `YAML_PATH=catalog/library-skills/${SKILL_ID}.yaml`
      - `OVERVIEW_PATH=.claude/skills/skills-library/references/catalog-overview.md`

   c. Fork (idempotent):
      `gh repo fork "$REPO" --clone=false --remote=false 2>/dev/null; true`

   d. Create branch on the fork from upstream main HEAD:
      ```
      DEFAULT_SHA=$(gh api "repos/${REPO}/git/refs/heads/main" --jq .object.sha)
      gh api "repos/${GH_USER}/skills-library/git/refs" \
        -X POST \
        -f ref="refs/heads/${BRANCH}" \
        -f sha="$DEFAULT_SHA"
      ```

   e. Write the YAML to the fork branch (new file — no SHA needed):
      `YAML_B64=$(echo -n "<yaml content>" | base64 | tr -d '\n')`
      ```
      gh api "repos/${GH_USER}/skills-library/contents/${YAML_PATH}" \
        -X PUT \
        -f message="skill: add ${SKILL_ID} (${DATE})" \
        -f content="$YAML_B64" \
        -f branch="$BRANCH"
      ```

   f. Append the catalog-overview.md line to the fork branch. Get the current upstream file:
      ```
      OVERVIEW=$(gh api "repos/${REPO}/contents/${OVERVIEW_PATH}")
      OVERVIEW_SHA=$(echo "$OVERVIEW" | jq -r .sha)
      OVERVIEW_CONTENT=$(echo "$OVERVIEW" | jq -r .content | base64 -d)
      ```
      Append the new skill line (same line as written locally in step 4) to `OVERVIEW_CONTENT`.
      Write back:
      ```
      NEW_OVERVIEW_B64=$(echo -n "$NEW_OVERVIEW_CONTENT" | base64 | tr -d '\n')
      gh api "repos/${GH_USER}/skills-library/contents/${OVERVIEW_PATH}" \
        -X PUT \
        -f message="skill: add ${SKILL_ID} to catalog overview (${DATE})" \
        -f content="$NEW_OVERVIEW_B64" \
        -f branch="$BRANCH" \
        -f sha="$OVERVIEW_SHA"
      ```

   g. Open the PR:
      ```
      PR_URL=$(gh pr create \
        --repo "$REPO" \
        --title "skill: add ${SKILL_ID} — $DATE (@$GH_USER)" \
        --body "Adds **${SKILL_ID}** as a candidate skill.\n\nSubmitted by @$GH_USER via the skills-library onboarding flow." \
        --head "${GH_USER}:${BRANCH}" \
        --base main)
      ```

   h. Confirm: "Done — <skill-id> has been submitted to the community library: $PR_URL. It will merge automatically and be available to all users on their next update."
