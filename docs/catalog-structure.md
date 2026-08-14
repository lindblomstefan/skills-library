# Catalog Structure

The catalog has seed skill manifests across varied categories, usable immediately without copying external skill source.

## MVP Artifacts

- `catalog/schemas/skill.schema.yaml`
- `catalog/schemas/pack.schema.yaml`
- `catalog/schemas/router-entry.schema.yaml`
- `catalog/schemas/golden-task.schema.yaml`
- `catalog/schemas/evaluation-run.schema.yaml`
- `catalog/schemas/usage-event.schema.yaml`
- `catalog/schemas/feedback-event.schema.yaml`
- `catalog/templates/skill.yaml`
- `catalog/templates/pack.yaml`
- `catalog/templates/golden-task.yaml`
- `catalog/templates/evaluation-run.yaml`
- `catalog/taxonomies/*.yaml`
- `.github/ISSUE_TEMPLATE/new-skill-onboarding.yml`
- `router/examples/recommendation.example.json`

## Skill Visibility Split

The catalog has two skill inventories:

- `catalog/library-skills/`: skills that can be recommended to users and eventually made available.
- `catalog/internal-skills/`: operating skills used by the skills-library workflow itself.

Internal skills improve over time with the library, but they are not public library inventory. They should not appear in public router recommendations, public packs, or user-facing skill browsing.

Use `catalog_visibility: library` or `catalog_visibility: internal` in every manifest. Directory and field must match.

## Add Or Promote Skills

Candidate metadata can be added when the source, license state, routing scope, risk, and install guidance are explicit. Promotion to `approved` requires stronger evidence:

- What fields are required for routing?
- What fields are required for trust and freshness?
- How do model and runtime compatibility values work?
- What does the CLI/router need to produce recommendations?
- Which relationship types are stable enough to use?
- What evidence is required before a skill moves from `candidate` to `approved`?
- What usage and feedback events should be captured for future metrics?
- What golden tasks should be used to evaluate skills?
- What evaluation-run evidence is required before approval?
- What router output shape should consumers depend on?

## Governance And Metrics

See:

- `docs/governance-gates.md`
- `docs/privacy-metrics.md`

## Library Seed

Graphify is the first evaluated library-skill candidate under `catalog/library-skills/`.

It is still evaluating and blocked from standard recommendations until license and governance review complete.

The broader seed includes metadata-only external pointers for gstack skills and varied popular GitHub projects. These are candidates, not copied skills. Recommendation acceptance must fetch only explicitly accepted skills from original upstream sources.
