# Router

The router is the recommendation layer for the skills library.

It should consume catalog manifests, packs, taxonomies, evaluations, usage events, and feedback events. It should produce ranked skill recommendations for a given task, model, runtime, and context.

No router implementation exists yet. This directory captures the intended contract first.

## Planned Commands

```bash
skills assist --repo . --format text
skills recommend --repo . --repo-consent accepted --task "review this API design" --model claude --runtime claude-code --format json
skills explain graphify
skills search "frontend accessibility review"
```

## Contract

See:

- `docs/router-output.md`
- `catalog/schemas/router-entry.schema.yaml`
- `router/examples/recommendation.example.json`
