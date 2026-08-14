## VERSION bump rule

**Always bump `.claude/skills/skills-library/VERSION` before pushing any change that touches the skill** — SKILL.md, feedback files, references/, or agents/. Bump in the same commit or as the final commit before push.

If VERSION is not bumped, installed users never receive the update. The auto-update check compares versions and silently passes if they match.

## engineering guardrails

Before adding substantial code, read `docs/engineering-guardrails.md`.

Rules:
- Keep files focused on one responsibility and split before adding a second reason to change.
- `npm test` runs `tools/check-guardrails.mjs`.
- Source files warn above 300 lines and fail above 450 lines.
- Documentation files warn above 350 lines and fail above 700 lines.
- Generated output paths such as `dist/` are exempt.
- Do not raise size limits just to land behavior; split the file first and document any justified limit change in `docs/change-log.md`.
