# First POC Plan

This document records the first proof-of-concept decisions so later work can understand what was intentional, what was deferred, and what should be revisited.

## POC Goal

Prove this end-to-end flow:

```text
onboard one skill
  -> validate catalog data
  -> compile catalog and graph data
  -> load the catalog graph
  -> interview an initiative
  -> recommend skills or packs through CLI JSON/text
```

The POC should demonstrate that the skills library can move from a concrete skill candidate to a graph-backed recommendation that a person can understand.

## Decisions

### User Journey

The first POC starts with skill onboarding, not with search.

1. Onboard one real candidate skill.
2. Validate the resulting catalog data.
3. Compile catalog data into router and graph outputs.
4. Run an initiative interview.
5. Recommend a skill set or pack.

### First Skill To Onboard

Use Graphify as the first onboarding candidate because it is already part of this repository's working context and has an active evaluation issue.

Graphify should be onboarded as a candidate or evaluating skill until the governance gates allow approval.

### Technology

- POC runner: dependency-free Node.js.
- Future hardening language: TypeScript.
- Runtime: Node.js.
- Human-authored data: YAML.
- Schema contracts: JSON Schema after the POC validation path is hardened.
- POC validation: custom checks for required fields, duplicate ids, taxonomy references, relationship targets, and governance warnings.
- Future validation: AJV plus custom policy checks.
- CLI shape for later hardening: `skills validate`, `skills onboard`, `skills build`, `skills recommend`, `skills graph`.
- POC commands: `npm run poc:validate`, `npm run poc:build`, `npm run poc:recommend`, `npm test`.
- Graph database path: Kuzu load script and graph-native exports are generated, but running the CLI POC does not require Kuzu.

### Graph Architecture

The POC uses two graph layers:

1. Graphify repo graph
   - Source: `graphify-out/graph.json`.
   - Purpose: repository, code, and documentation navigation.
   - Owner: Graphify.

2. Catalog domain graph
   - Source: catalog YAML, evaluation runs, taxonomies, router metadata, and generated events.
   - Purpose: skills, packs, compatibility, evidence, governance, recommendation, and replacement queries.
   - Owner: this repository's catalog compiler.

The catalog graph must be graph-native from the start. It should use explicit nodes, edges, ids, labels, provenance, and catalog versions rather than treating the graph as a flat JSON export.

### Generated Data Policy

YAML is the authoring format. JSON is generated for consumers.

Expected generated artifacts:

- `dist/catalog.json`
- `dist/router-index.json`
- `dist/graph/nodes.json`
- `dist/graph/edges.json`
- Kuzu load files or database build artifacts

The POC should decide which generated files are committed before CI is added. Until then, prefer committing examples and schemas, not volatile build outputs.

### Router Behavior

The first router is deterministic and explainable.

Minimum scoring factors:

- task and domain match
- model/runtime compatibility
- lifecycle status
- governance eligibility
- trust and risk
- freshness
- evaluation evidence

The router must produce:

- recommended skills or packs
- not-recommended candidates
- missing skill gaps
- evidence references
- audit metadata

Standard mode must not recommend unapproved or unknown-risk skills as ready for use. Exploratory mode may surface them with explicit warnings.

### Initiative Interview

The initiative interview produces a structured initiative profile.

Minimum fields:

- goal
- desired outcome
- current repo state
- missing information
- domain
- task types
- expected artifacts
- model
- runtime
- sensitivity
- risk level
- urgency
- constraints

The interview should ask the fewest useful questions, then infer from repository context where possible. If `graphify-out/graph.json` exists, use Graphify before raw browsing.

### Guided Skill Help Flow

Skill help should be available before the user knows which exact command to run.

The first action is always a repo-inspection consent question. If the user denies access or no repo exists, the flow continues with structured questions. If the user accepts, the skill inspects only safe summary context and asks follow-up questions for missing, realistic decisions.

Guided questions use choices plus free text so a CLI, agent chat, or future dashboard can render the same contract.

Skill onboarding uses this flow but requires license-first checks and PR-based submission for library changes.

## POC Build Order

1. Add enforceable schemas and validation.
2. Create the first candidate onboarding flow.
3. Onboard Graphify as the first candidate skill.
4. Add seed catalog data and at least one pack.
5. Build the catalog compiler.
6. Emit catalog JSON and graph node/edge exports.
7. Load the catalog graph into Kuzu.
8. Build deterministic recommendation logic.
9. Build the initiative interview profile.
10. Connect initiative profile to router input.
11. Add one golden task for initiative-to-skill-set recommendation.
12. Add guided session commands for recommendation and skill onboarding.
13. Add CI once validation and build commands are stable.

## Readiness Before Building

The POC is ready to build when these are accepted:

- Graphify is the repo graph, not the catalog domain graph.
- Kuzu is the POC graph database path through generated load artifacts.
- Dependency-free Node.js is acceptable for the first local runner, with TypeScript deferred to hardening.
- YAML is authored and JSON is generated.
- Graphify is the first skill onboarded.
- The first router is deterministic and evidence-backed.
- Unapproved skills are handled through explicit recommendation modes.

## Surfaced Risks

- Existing schema files are descriptive, not enforceable.
- Graphify warnings for raw JSON are harmless for repo navigation, but catalog JSON should be represented through the catalog graph compiler.
- Governance rules need custom policy checks beyond JSON Schema.
- Privacy boundaries must be enforced before usage or feedback events are collected.
- The POC needs a clear generated-file policy before CI starts checking build artifacts.

## Deferred

- Final graph database vendor decision for production.
- Dashboard or product UI.
- Embeddings or semantic search.
- Automated LLM judging.
- Large-scale external skill ingestion.
- Multi-user review workflows.
