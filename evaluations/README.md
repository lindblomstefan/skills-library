# Evaluations

Evaluations contain the evidence behind catalog decisions.

Do not approve, recommend, or add a skill to a pack based only on a source link. Capture enough evidence to explain why the skill is useful, risky, stale, replaced, or rejected.

## Suggested Layout

```text
evaluations/
  skill-id/
    2026-08-initial.md
    evaluation-run.yaml
    test-results.json
```

## Evaluation Outcomes

- `adopt`: use an external skill or method as-is
- `adapt`: create a company-specific wrapper or version
- `build`: create a new internal skill
- `defer`: useful but not now
- `reject`: not useful, not trusted, duplicated, or too costly
- `replace`: supersede with another skill

## Evaluation Runs

Use `catalog/templates/evaluation-run.yaml` for structured results tied to golden tasks. Free-form notes are useful, but approval decisions should reference structured evidence whenever possible.
