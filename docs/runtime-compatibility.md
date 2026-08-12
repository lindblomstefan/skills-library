# Runtime Compatibility

The library should track both model compatibility and runtime compatibility.

These are related but not identical:

- Model compatibility describes whether the skill behavior works well with a model family or agent reasoning style.
- Runtime compatibility describes whether the skill can be installed, discovered, invoked, or consumed in a specific environment.

## First Runtime Set

Start with:

- `codex-cli`
- `claude-code`
- `chatgpt`
- `cursor`
- `hermes-agent`

Other runtimes can remain in the taxonomy when useful for discovery, but the first evaluation effort should focus on intentionally used runtimes.

## Support Values

Use the compatibility support taxonomy:

- `native`: designed for that model or runtime
- `compatible`: works without meaningful changes
- `adapted`: works through a wrapper, conversion, or local guidance
- `partial`: useful but missing features, context, or direct integration
- `unknown`: not yet evaluated
- `unsupported`: should not be recommended for that target

## Hermes Agent

Hermes Agent is in scope as a runtime because it is intentionally used.

Treat it as:

- runtime id: `hermes-agent`
- model id when needed: `hermes`
- compatibility tag: `runtime:hermes-agent`

Do not assume a skill is Hermes-compatible just because it is model-agnostic. Evaluate install path, skill format, invocation behavior, permissions, and expected outputs.

## Compatibility Matrix

Every skill should use a compatibility matrix for evidence-backed routing:

```yaml
compatibility:
  matrix:
    - model_id: codex
      runtime_id: codex-cli
      support: unknown
      tested_at: null
      tested_by: unknown
      runtime_version: unknown
      adapter: unknown
      install_result: unknown
      invoke_result: unknown
      permission_notes: ""
      evidence: []
      known_gaps: []
```

Runtimes may also be listed as summary entries, but routing should prefer matrix rows when available.
