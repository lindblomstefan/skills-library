# Catalog Structure

The first milestone is structure, not content.

The library should define how skills are represented before any specific skill becomes part of the catalog. This prevents early tools from shaping the whole model accidentally.

## MVP Artifacts

- `catalog/schemas/skill.schema.yaml`
- `catalog/schemas/pack.schema.yaml`
- `catalog/schemas/router-entry.schema.yaml`
- `catalog/schemas/golden-task.schema.yaml`
- `catalog/schemas/usage-event.schema.yaml`
- `catalog/schemas/feedback-event.schema.yaml`
- `catalog/templates/skill.yaml`
- `catalog/templates/pack.yaml`
- `catalog/templates/golden-task.yaml`
- `catalog/taxonomies/*.yaml`
- `.github/ISSUE_TEMPLATE/new-skill-onboarding.yml`
- `router/examples/recommendation.example.json`

## Add Skills Later

Only add a real skill manifest after these questions are answered:

- What fields are required for routing?
- What fields are required for trust and freshness?
- How do model and runtime compatibility values work?
- What does the CLI/router need to produce recommendations?
- Which relationship types are stable enough to use?
- What evidence is required before a skill moves from `candidate` to `approved`?
- What usage and feedback events should be captured for future metrics?
- What golden tasks should be used to evaluate skills?
- What router output shape should consumers depend on?

## Graphify

Graphify is installed in this repository as infrastructure, but should not be added as a cataloged skill until the structure is reviewed.

Use it as a test candidate once the catalog schema is accepted.
