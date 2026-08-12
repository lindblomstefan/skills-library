# Catalog

The catalog is the machine-readable source of truth for skills, packs, taxonomies, and routing metadata.

The catalog should remain skill-agnostic. A cataloged item can describe an external skill, internal skill, adapted skill, reference method, short-lived initiative skill, or tool-backed workflow.

## Directories

```text
catalog/
  skills/       # Approved or actively evaluated skill manifests
  packs/        # Curated skill sets for specific users, runtimes, or work types
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

