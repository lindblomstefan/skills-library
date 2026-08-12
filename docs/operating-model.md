# Operating Model

This library is skill-agnostic. A catalog entry can point to a public skill, an internal skill, a prompt pattern, a method, a template, a tool-backed workflow, or a future skill idea.

## Principles

- Prefer reuse before building.
- Keep skills small and task-oriented.
- Treat company-specific knowledge as a reason to create or adapt a skill.
- Separate discovery from evaluation and implementation.
- Do not import external assets, code, or instructions without checking license, trust, and maintenance risk.
- Keep skill instructions concise. Put large standards, examples, schemas, and policies in references.

## Source Types

Use these source types consistently in issues and catalog work:

- `external`: useful skill or method maintained outside the company
- `internal`: skill authored and maintained by the company
- `adapted`: external idea adapted to company standards
- `reference`: documentation, guide, template, or standard that could inform a skill
- `candidate`: unvalidated idea or request

## Decision Outcomes

Every evaluation should end with one of these outcomes:

- `adopt`: use the external skill or method as-is
- `adapt`: create a company version based on the idea
- `build`: create a new internal skill
- `defer`: useful, but not now
- `reject`: not useful, not trusted, duplicated, or too costly
- `replace`: supersede an existing skill with a better option

## Evaluation Criteria

Assess candidate skills against:

- Relevance to recurring company work
- Clarity of trigger conditions
- Evidence of practical usefulness
- Security and privacy risk
- License and redistribution constraints
- Maintenance status and ownership
- Fit with engineering standards
- Amount of company context required
- Ease of testing with realistic tasks

## Ownership

Each adopted or internal skill should have:

- Owner
- Source
- Intended users
- Status
- Review cadence
- Usage examples
- Known limitations

## Canonical Statuses

- `candidate`
- `evaluating`
- `approved`
- `in-use`
- `needs-review`
- `deprecated`
- `rejected`

Use these status values consistently in schemas, templates, issues, and router output. Do not introduce synonyms such as `proposed` or `needs-update` without updating the taxonomy first.
