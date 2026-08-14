# Catalog

The catalog is the machine-readable source of truth for skills, packs, taxonomies, and routing metadata.

The catalog separates publishable library inventory from internal operating skills.

- `library` skills are the skills made available for recommendation and eventual distribution.
- `internal` skills are used by this repository and the `skills-library` entrypoint to onboard, interview, route, and capture feedback. They are not part of the public recommendation inventory.

`source_type` still records where a skill originates, such as external or company-authored. `catalog_visibility` records whether it belongs to the library inventory or internal operating layer.

## Directories

```text
catalog/
  library-skills/   # Publishable/recommendable skill manifests
  internal-skills/  # Internal operating skills used by this repository
  packs/            # Public packs made only from library skills
  internal-packs/   # Internal operating packs that may include internal skills
  schemas/      # First-version manifest shapes
  taxonomies/   # Shared controlled values
  templates/    # Copyable starter manifests
```

## Rule

Add structure first, then add skills.

Before adding the first real skill manifest:

- agree on required fields
- agree on compatibility values
- agree on source/status lifecycle
- agree on relationship vocabulary
- agree on what the router needs

Do not place new manifests in `catalog/skills/`; that legacy path is intentionally empty.
