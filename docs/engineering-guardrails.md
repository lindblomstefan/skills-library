# Engineering Guardrails

The POC should stay easy to inspect as it grows. When a file starts carrying more than one reason to change, split it before adding more behavior.

## Responsibility Boundaries

- `bin/` is only for command entrypoints.
- `tools/lib/cli.mjs` owns command orchestration, argument parsing, and writing outputs.
- `tools/lib/catalog.mjs` owns catalog loading and router-index shaping.
- `tools/lib/validation.mjs` owns catalog validation and approval blockers.
- `tools/lib/graph.mjs` owns generated graph and Kuzu load artifacts.
- `tools/lib/recommendation.mjs` owns recommendation profile, scoring, eligibility, and text output.
- `docs/` records decisions, contracts, and operating guidance. Long decision history should be split by topic when it stops being scannable.

## Size Limits

`npm test` runs `tools/check-guardrails.mjs`.

- Source files (`.mjs`, `.js`, `.css`, `.html`) warn above 300 lines and fail above 450 lines.
- Documentation files (`.md`) warn above 350 lines and fail above 700 lines.
- Generated output is exempt: `dist/`, `graphify-out/`, and package lock files.

Do not raise limits to make a change pass. First split by responsibility. If a file genuinely needs more room, document why in `docs/poc-change-log.md` before changing the guardrail.

## Split Triggers

Split a file when any of these become true:

- It has multiple unrelated reasons to change.
- A new feature would add a second orchestration layer to a module.
- Tests need to exercise one behavior but must load many unrelated helpers.
- A generated artifact or backend command starts shaping domain logic directly.
- A file crosses the warning threshold and the next change is not purely removal.

The default answer should be a new focused module with a small public surface, not a larger shared utility file.
