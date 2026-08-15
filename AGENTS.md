## VERSION bump rule

The `bump-version.yml` GitHub Action auto-bumps VERSION after any merge to main that touches `.claude/skills/skills-library/**`. Contributors submitting PRs do not need to bump manually.

**When pushing directly to main** (e.g. in a development session): after pushing, trigger the Action instead of editing VERSION manually:
```bash
gh workflow run bump-version.yml
```
Never edit VERSION by hand — always let the Action do it.

## engineering guardrails

Before adding substantial code, read `docs/engineering-guardrails.md`.

Rules:
- Keep files focused on one responsibility and split before adding a second reason to change.
- `npm test` runs `tools/check-guardrails.mjs`.
- Source files warn above 300 lines and fail above 450 lines.
- Documentation files warn above 350 lines and fail above 700 lines.
- Generated output paths such as `dist/` are exempt.
- Do not raise size limits just to land behavior; split the file first and document any justified limit change in `docs/change-log.md`.
