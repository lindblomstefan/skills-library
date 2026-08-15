## VERSION bump rule

The `bump-version.yml` GitHub Action auto-bumps VERSION after any merge to main that touches `.claude/skills/skills-library/**`. Contributors submitting PRs do not need to bump manually.

**When pushing directly to main** (e.g. in a development session): bump VERSION manually before pushing so the Action does not need to do it as a follow-up commit. The Action will still run and increment again if you forget — installed users will get the update either way.

## engineering guardrails

Before adding substantial code, read `docs/engineering-guardrails.md`.

Rules:
- Keep files focused on one responsibility and split before adding a second reason to change.
- `npm test` runs `tools/check-guardrails.mjs`.
- Source files warn above 300 lines and fail above 450 lines.
- Documentation files warn above 350 lines and fail above 700 lines.
- Generated output paths such as `dist/` are exempt.
- Do not raise size limits just to land behavior; split the file first and document any justified limit change in `docs/change-log.md`.
