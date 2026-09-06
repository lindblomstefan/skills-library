# Feedback

Minimize tool calls — combine bash operations into single scripts.

## Sequence

1. Read `~/.claude/skills/skills-library/references/catalog-overview.md`. Ask which skill (`AskUserQuestion`, up to 4 relevant options).

2. Ask plain text: "Describe your experience — what worked and what didn't?"

3. **Save locally** — run ONE bash script:
   ```
   SKILL=<skill-id>
   F=~/.claude/skills/skills-library/feedback/${SKILL}.md
   if [ ! -f "$F" ]; then
     printf -- "---\nskill_id: ${SKILL}\nfeedback_count: 0\nvalidated: false\n---\n\n## Entries\n" > "$F"
   fi
   COUNT=$(grep '^feedback_count:' "$F" | awk '{print $2}')
   NEW_COUNT=$((COUNT + 1))
   sed -i.bak "s/^feedback_count: .*/feedback_count: ${NEW_COUNT}/" "$F" && rm "${F}.bak"
   [ "$NEW_COUNT" -ge 3 ] && sed -i.bak "s/^validated: .*/validated: true/" "$F" && rm "${F}.bak"
   printf "\n### $(date +%Y-%m-%d)\n\n%s\n" "<feedback text>" >> "$F"
   ```

4. **Share via GitHub PR** — run in as few bash calls as possible:

   **Call 1 — auth + vars:** `gh auth status -h github.com 2>/dev/null` — if non-zero, say "Saved locally. Run `! gh auth login` to share." Stop. Then capture: `GH_USER`, `DATE`, `BRANCH=feedback/<skill-id>-$(date +%Y%m%d%H%M%S)`, `REPO=lindblomstefan/skills-library`, `FEEDBACK_PATH=.claude/skills/skills-library/feedback/<skill-id>.md`. Fork: `gh repo fork "$REPO" --clone=false --remote=false 2>/dev/null; true`.

   **Call 2 — build new content + branch + PUT:**
   - Fetch upstream file: `UPSTREAM=$(GH_HOST=github.com gh api "repos/${REPO}/contents/${FEEDBACK_PATH}" 2>/dev/null)`. If sha present: extract SHA, decode content, read count, increment, set validated if ≥ 3. If 404: use the inline template above as base with NEW_COUNT=1, SHA="".
   - Write new content to a temp file.
   - Get main HEAD SHA → create branch on fork.
   - base64-encode temp file → PUT to fork branch (include sha field only if SHA non-empty).

   **Call 3 — PR:**
   `gh pr create --repo "$REPO" --title "feedback: <skill-id> — $DATE (@$GH_USER)" --body "Community feedback from @$GH_USER." --head "${GH_USER}:${BRANCH}" --base main`

   Confirm: "Your feedback is on its way: $PR_URL — it will merge automatically." If NEW_COUNT == 3, add "<skill-id> is now validated."
