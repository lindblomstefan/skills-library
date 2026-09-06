# Feedback

## Sequence

1. Read `~/.claude/skills/skills-library/references/catalog-overview.md`. Ask which skill (AskUserQuestion, up to 4 relevant library skills as options). Treat each source repo as one unit.

2. Ask (plain text): "Describe your experience — what worked and what didn't?"

3. Save locally to `~/.claude/skills/skills-library/feedback/<skill-id>.md`:
   - If missing, create from `_template.md`.
   - Append a `### YYYY-MM-DD` dated entry under `## Entries`.
   - Increment `feedback_count`; if ≥ 3 set `validated: true`.

4. Share with the community via GitHub PR:
   a. `gh auth status -h github.com 2>/dev/null` — if non-zero, say "Saved locally. Run `! gh auth login` to share." Stop.
   b. Capture: `GH_USER=$(GH_HOST=github.com gh api /user | jq -r .login)` · `DATE=$(date +%Y-%m-%d)` · `BRANCH=feedback/<skill-id>-$(date +%Y%m%d%H%M%S)` · `FEEDBACK_PATH=.claude/skills/skills-library/feedback/<skill-id>.md` · `REPO=lindblomstefan/skills-library`
   c. Fork: `gh repo fork "$REPO" --clone=false --remote=false 2>/dev/null; true`
   d. Fetch upstream: `UPSTREAM=$(gh api "repos/${REPO}/contents/${FEEDBACK_PATH}" 2>/dev/null)`. If sha present: extract SHA and decode content, read `feedback_count`, compute `NEW_COUNT=$((COUNT+1))`, `VALIDATED=$([ $NEW_COUNT -ge 3 ] && echo true || echo false)`. If 404: use `_template.md` as base, `NEW_COUNT=1`, `VALIDATED=false`, `SHA=""`.
   e. Build `NEW_CONTENT`: replace `feedback_count` value, set `validated` if needed, append `### $DATE (@$GH_USER)\n\n<feedback text>` under `## Entries`. Write to temp file.
   f. Branch: `DEFAULT_SHA=$(gh api "repos/${REPO}/git/refs/heads/main" --jq .object.sha)`; create ref on fork.
   g. PUT file: `NEW_B64=$(base64 < "$NEW_CONTENT_FILE" | tr -d '\n')`. If SHA non-empty, include `-f sha="$SHA"`; otherwise omit.
   h. `PR_URL=$(gh pr create --repo "$REPO" --title "feedback: <skill-id> — $DATE (@$GH_USER)" --body "Community feedback on <skill-name> from @$GH_USER." --head "${GH_USER}:${BRANCH}" --base main)`
   i. Confirm: "Your feedback is on its way: $PR_URL — it will merge automatically." If `NEW_COUNT==3`, add "<skill-id> is now validated."
