# Feedback

## Sequence

1. Read `~/.claude/skills/skills-library/references/catalog-overview.md` to get the skill list. Ask which skill or suite (AskUserQuestion, up to 4 of the most relevant library skills as options — the tool adds Other automatically for anything not listed). Treat each source repo as one unit; all sub-skills map to one file (e.g. any gstack sub-skill → `gstack`).

2. Ask (plain text): "Describe your experience — what worked and what didn't?" Wait for the typed answer.

3. Save locally to `~/.claude/skills/skills-library/feedback/<skill-id>.md`:
   - If the file does not exist, create it from `~/.claude/skills/skills-library/feedback/_template.md`.
   - Append a `### YYYY-MM-DD` dated entry under `## Entries`.
   - Read the current `feedback_count` value, increment by 1, and write it back.
   - If the new count is 3 or more, set `validated: true`.

4. Share with the community via a GitHub PR. Run each step as a bash command:

   a. Check auth: `gh auth status -h github.com 2>/dev/null`
      - If the command exits non-zero: say "Your feedback was saved locally. To share it with the community, run `! gh auth login` then re-run `/skills-library`." Stop — the local save from step 3 already succeeded.

   b. Gather variables by running these commands and capturing their output:
      - `GH_USER=$(GH_HOST=github.com gh api /user | jq -r .login)`
      - `DATE=$(date +%Y-%m-%d)`
      - `BRANCH=feedback/<skill-id>-$(date +%Y%m%d%H%M%S)`
      - `FEEDBACK_PATH=.claude/skills/skills-library/feedback/<skill-id>.md`
      - `REPO=lindblomstefan/skills-library`

   c. Fork (safe to run even if the fork already exists):
      `gh repo fork "$REPO" --clone=false --remote=false 2>/dev/null; true`

   d. Get the upstream file's content and SHA:
      `UPSTREAM=$(gh api "repos/${REPO}/contents/${FEEDBACK_PATH}" 2>/dev/null)`
      - If the response contains a `sha` field: file exists upstream. Extract `SHA=$(echo "$UPSTREAM" | jq -r .sha)`. Decode content: `UPSTREAM_CONTENT=$(echo "$UPSTREAM" | jq -r .content | base64 -d)`. Read `feedback_count` from the frontmatter: `COUNT=$(echo "$UPSTREAM_CONTENT" | grep '^feedback_count:' | awk '{print $2}')`. Set `NEW_COUNT=$((COUNT + 1))`. Set `VALIDATED=$([ "$NEW_COUNT" -ge 3 ] && echo true || echo false)`.
      - If 404 or empty response: file is new upstream. Read `~/.claude/skills/skills-library/feedback/_template.md` as `UPSTREAM_CONTENT` (substituting `<skill-id>`). Set `NEW_COUNT=1`, `VALIDATED=false`, `SHA=""`.

   e. Build `NEW_CONTENT` from `UPSTREAM_CONTENT`:
      - Replace `feedback_count: N` with `feedback_count: $NEW_COUNT`
      - If `VALIDATED=true`, replace `validated: false` with `validated: true`
      - Append after `## Entries`:
        ```
        ### <DATE> (@<GH_USER>)

        <the full feedback text from step 2>
        ```
      Write to a temp file: `NEW_CONTENT_FILE=$(mktemp)` then write `NEW_CONTENT` into it.

   f. Create a branch on the fork from the upstream main HEAD:
      ```
      DEFAULT_SHA=$(gh api "repos/${REPO}/git/refs/heads/main" --jq .object.sha)
      gh api "repos/${GH_USER}/skills-library/git/refs" \
        -X POST \
        -f ref="refs/heads/${BRANCH}" \
        -f sha="$DEFAULT_SHA"
      ```

   g. Base64-encode the new content and PUT it to the fork branch:
      `NEW_B64=$(base64 < "$NEW_CONTENT_FILE" | tr -d '\n')`
      - If `SHA` is non-empty (file existed upstream): PUT with sha field:
        ```
        gh api "repos/${GH_USER}/skills-library/contents/${FEEDBACK_PATH}" \
          -X PUT \
          -f message="feedback: <skill-id> ($DATE)" \
          -f content="$NEW_B64" \
          -f branch="$BRANCH" \
          -f sha="$SHA"
        ```
      - If `SHA` is empty (new file): PUT without sha field:
        ```
        gh api "repos/${GH_USER}/skills-library/contents/${FEEDBACK_PATH}" \
          -X PUT \
          -f message="feedback: <skill-id> ($DATE)" \
          -f content="$NEW_B64" \
          -f branch="$BRANCH"
        ```
      `rm "$NEW_CONTENT_FILE"`

   h. Open the PR and capture its URL:
      ```
      PR_URL=$(gh pr create \
        --repo "$REPO" \
        --title "feedback: <skill-id> — $DATE (@$GH_USER)" \
        --body "Community feedback on <skill-name> from @$GH_USER." \
        --head "${GH_USER}:${BRANCH}" \
        --base main)
      ```

   i. Confirm to the user: "Your feedback is on its way to the community: $PR_URL — it will merge automatically."
      If count just reached 3 (NEW_COUNT == 3), add: "<skill-id> is now validated in the community library."
