# Golden Tasks

Golden tasks are reusable evaluation scenarios for testing whether a skill is useful, compatible, and safe enough to recommend.

They should be realistic, small enough to repeat, and specific enough to reveal failure modes.

## Purpose

Golden tasks help answer:

- Does the skill improve a real workflow?
- Does it work in the target model/runtime?
- Does it produce useful routing signals?
- Does it fail safely?
- Does it overlap with or replace another skill?

## Initial Golden Task Candidates

- Review a risky pull request
- Plan a new API project
- Assess release readiness
- Evaluate frontend accessibility
- Onboard to an unfamiliar repository
- Threat-model a sensitive feature
- Compare two overlapping skills
- Select a skill pack for a specific runtime

## Evaluation Rules

- Test positive behavior and failure modes.
- Capture model and runtime used.
- Capture whether the skill was native, compatible, adapted, partial, unknown, or unsupported.
- Store evidence in `evaluations/`.
- Use the same task against multiple skills when comparing replacements or overlap.

## Storage

Use:

```text
catalog/golden-tasks/
catalog/templates/golden-task.yaml
catalog/schemas/golden-task.schema.yaml
catalog/templates/evaluation-run.yaml
catalog/schemas/evaluation-run.schema.yaml
```

## Evaluation Runs

Golden task definitions should not store results directly. Store each run separately so the same task can be tested across skills, models, runtimes, and versions.

Each evaluation run should capture:

- skill id
- golden task id
- model and runtime
- versions when known
- evaluator
- transcript or artifact links
- utility, routing, safety, maintenance, and compatibility scores
- pass, partial, fail, blocked, or inconclusive outcome
- approval or compatibility impact
