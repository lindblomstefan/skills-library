# Onboarding

Decide everything yourself unless `AskUserQuestion` is specified. If the user declines any step, say "Onboarding cancelled." and stop. Minimize tool calls — combine bash operations into single scripts.

## Sequence

1. **Source** — `AskUserQuestion`, header `"Source"`, options: `URL or path | Build internal | Chat about this`. If URL: ask plain text "What is the GitHub URL?" Record it.

2. **License** — check it yourself via GitHub API. Permissive (MIT/Apache/BSD/ISC) → proceed silently. Proprietary → stop and explain. No license → `AskUserQuestion`, header `"License"`, options `Proceed anyway | Cancel`.

3. **Mode** — silently: external + clear license → Reference only; internal → Adapt.

4. **Local files** — say "Setting up local files." Run ONE bash script:
   ```
   SKILL=<skill-id>
   FEEDBACK=~/.claude/skills/skills-library/feedback/${SKILL}.md
   OVERVIEW=~/.claude/skills/skills-library/references/catalog-overview.md
   [ -f "$FEEDBACK" ] || printf -- "---\nskill_id: ${SKILL}\nfeedback_count: 0\nvalidated: false\n---\n\n## Entries\n" > "$FEEDBACK"
   grep -qF "**${SKILL}**" "$OVERVIEW" 2>/dev/null || echo "**${SKILL}** — <desc> [url:<url>] [license:<tag>]" >> "$OVERVIEW"
   ```
   Then ask plain text: "What's your initial take?" If answered, append a `### YYYY-MM-DD` entry to the feedback file and say "One entry added. Two more will validate this skill."

5. **YAML** — read `_skill-template.yaml` from this skill's directory; fill every placeholder. Use ONLY these taxonomy values:
   - `domains`: `architecture` `codebase-understanding` `coding` `discovery` `documentation` `feedback` `knowledge-graph` `planning` `repository-analysis` `security` `testing` `ui-ux`
   - `task_types`: `architecture-review` `codebase-navigation` `impact-analysis` `project-onboarding` `pull-request-review` `release-readiness` `relationship-discovery` `skill-feedback` `test-strategy` `threat-modeling`
   - `relationships`: only IDs that exist in `catalog/library-skills/`; omit rather than guess.
   Hold the completed YAML in memory.

6. **GitHub PR** — run in as few bash calls as possible:

   **Call 1 — setup:** auth check + capture all vars in one script. If auth fails, print YAML as code block, say "Run `! gh auth login` to submit automatically." and stop.
   ```
   gh auth status -h github.com 2>/dev/null || exit 1
   GH_USER=$(GH_HOST=github.com gh api /user | jq -r .login)
   DATE=$(date +%Y-%m-%d)
   BRANCH=skill/<skill-id>-$(date +%Y%m%d%H%M%S)
   REPO=lindblomstefan/skills-library
   gh repo fork "$REPO" --clone=false --remote=false 2>/dev/null; true
   DEFAULT_SHA=$(GH_HOST=github.com gh api "repos/${REPO}/git/refs/heads/main" --jq .object.sha)
   GH_HOST=github.com gh api "repos/${GH_USER}/skills-library/git/refs" -X POST -f ref="refs/heads/${BRANCH}" -f sha="$DEFAULT_SHA"
   ```

   **Call 2 — PUT YAML:** base64-encode the completed YAML; PUT to `repos/${GH_USER}/skills-library/contents/catalog/library-skills/<skill-id>.yaml` on `$BRANCH` (new file — no sha field).

   **Call 3 — update overview + open PR:** fetch upstream catalog-overview.md using two separate `--jq` calls to avoid multiline JSON parse errors: `OV_SHA=$(gh api "repos/${REPO}/contents/${OVERVIEW_PATH}" --jq .sha)` and `OV_CONTENT=$(gh api "repos/${REPO}/contents/${OVERVIEW_PATH}" --jq .content | base64 -d)`. Append skill line, re-encode, PUT to fork branch with sha. Then `gh pr create` and capture `$PR_URL`.

   Confirm: "Done — submitted: $PR_URL. It will merge automatically."
