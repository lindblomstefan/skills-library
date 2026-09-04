# Community PR Flow — Design

**Date:** 2026-09-04  
**Status:** Approved for implementation

## Problem

Feedback and new skill submissions are local-only. Every user's `~/.claude/skills/skills-library/feedback/` is an island. The validation model (3 entries = validated) cannot work when data never aggregates.

## Solution

Use GitHub as the database. Every feedback entry and skill submission becomes a pull request to `lindblomstefan/skills-library`. A GitHub Action auto-merges community PRs instantly after a path guard confirms they only touch allowed files. No server, no tokens, no infrastructure beyond what GitHub already provides.

## Components

### 1. Auth & Identity

Every write operation opens with `gh auth status`. Failure → user is told to run `! gh auth login`; local save already completed so nothing is lost. On success, username is retrieved with `gh api user --jq .login` and attached to every PR.

### 2. Feedback PR Flow

**Trigger:** User completes the feedback interview.  
**Local save:** Unchanged — local file is still written first.  
**PR creation:**
1. Fork (idempotent): `gh repo fork lindblomstefan/skills-library --clone=false --remote=false`
2. Get upstream file content and SHA from `repos/lindblomstefan/skills-library/contents/<feedback-path>`
3. Append new dated entry; update `feedback_count` and `validated` in frontmatter
4. Create branch on fork from upstream main HEAD SHA
5. PUT updated file to fork branch (with SHA if file existed, without if new)
6. Open PR: `feedback: <skill-id> — <date> (@<username>)`

**Allowed path:** `.claude/skills/skills-library/feedback/`

### 3. Skill Addition PR Flow

**Trigger:** User completes the onboarding interview.  
**Local save:** Feedback file and catalog-overview.md line written locally as before.  
**PR creation:**
1. Same fork/auth as above
2. Create branch: `skill/<skill-id>-<timestamp>`
3. PUT new `catalog/library-skills/<skill-id>.yaml` (new file, no SHA)
4. GET + append + PUT `.claude/skills/skills-library/references/catalog-overview.md`
5. Open PR: `skill: add <skill-id> (@<username>)`

**Allowed paths:** `catalog/library-skills/`, `.claude/skills/skills-library/references/catalog-overview.md`

### 4. GitHub Action — Auto-merge

**Event:** `pull_request_target` opened or synchronized (runs in base repo context; PR code is never checked out).  
**Path guard:** Get changed file list via `gh api repos/.../pulls/.../files`. If any file is outside the three allowed paths → comment explaining the block and exit 1.  
**Merge:** `gh pr merge --squash` with `GITHUB_TOKEN` (write-scoped via `contents: write` + `pull-requests: write`).

## Invariants

- Local save always completes before PR creation begins. Auth failure does not lose data.
- PR creation is additive only. No PR ever deletes or restructures existing files.
- Path guard is the only safety mechanism — keep it strict.
- No branch protections required on main. The path guard is the control.

## Files Changed

| File | Change |
|------|--------|
| `.github/workflows/auto-merge.yml` | New — auto-merge Action |
| `.claude/skills/skills-library/feedback.md` | Add PR creation block after local save |
| `.claude/skills/skills-library/onboarding.md` | Replace "do not push to main" with PR creation block |
| `.claude/skills/skills-library/VERSION` | Bump to 2026-09-04.1 |
