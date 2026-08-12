# New Skill Onboarding

New skill onboarding ensures that every candidate skill captures enough information to be evaluated, routed, installed, reviewed, and eventually replaced.

This workflow applies whether the information is filled in by a person, Codex, another LLM, or an automated importer.

This workflow should become an internal skill, tentatively `skill-library-onboarding`, so any agent session can follow the same process when helping add, evaluate, or catalog skills.

## Core Rule

No required field should be left blank.

Use `unknown`, `not-applicable`, or `needs-review` when the answer is not known yet. This makes gaps explicit and searchable.

## Workflow

1. Intake
   - Capture source, proposer, summary, suspected value, and basic scope.

2. Triage
   - Decide whether the candidate is worth evaluating now.

3. Candidate Manifest
   - Create a draft manifest from `catalog/templates/skill.yaml`.
   - Store it outside `catalog/skills/` until the structure is approved, or mark it clearly as candidate when the catalog is active.

4. Evaluation
   - Use `evaluations/templates/evaluation.md`.
   - Test realistic tasks, compatibility, install behavior, and risks.

5. Decision
   - Choose `adopt`, `adapt`, `build`, `defer`, `reject`, or `replace`.

6. Catalog Entry
   - Add or update the skill manifest only after required fields are complete enough for routing.

7. Pack and Router Review
   - Decide whether the skill belongs in any pack.
   - Add positive and negative routing guidance.

8. Freshness Review
   - Set owner, review cadence, next review date, and replacement watch.

## Required Data Groups

### Identity

- skill id
- name
- source type
- status
- owner
- proposer
- date proposed
- short summary

### Source

- source URL or location
- package, repo, plugin, document, or marketplace entry
- maintainer
- license state
- version, commit, or release
- documentation link

### Scope and Routing

- domains
- task types
- use-when guidance
- do-not-use-when guidance
- example prompts
- anti-examples
- keywords or aliases

### Compatibility

- supported models
- supported runtimes
- compatibility support level
- native, compatible, adapted, partial, unknown, or unsupported
- model/runtime notes

### Distribution

- install method
- invoke method
- generated files
- dependencies
- required permissions
- required secrets
- network access

### Trust and Risk

- trust level
- license state
- maintenance state
- security risk
- privacy risk
- compliance risk
- data-handling notes
- provenance notes

### Evaluation

- golden tasks tested
- observed strengths
- observed failures
- reviewer
- evidence links
- recommendation

### Lifecycle

- stability
- review cadence
- last reviewed date
- next review date
- replacement watch
- deprecation criteria

### Relationships

- pairs with
- replaces
- replaced by
- depends on
- conflicts with
- overlaps with
- specializes
- generalizes

### Metrics Readiness

- usage signal available
- review signal available
- install signal available
- recommendation signal available
- known metrics gaps

## Human Review Gates

AI can draft most fields, but these fields need human review before approval:

- license state
- security risk
- privacy risk
- compliance risk
- owner
- final decision
- pack inclusion
- company-specific adaptation

## Definition of Ready for Evaluation

A candidate is ready for evaluation when:

- required fields are present, even if some are `unknown`
- source is reachable or otherwise available
- use cases are concrete enough to test
- target model/runtime is identified
- risk-sensitive gaps are visible

## Definition of Ready for Catalog

A skill is ready for catalog entry when:

- required fields are complete enough for routing
- compatibility is known for at least one target runtime
- use-when and do-not-use-when guidance exists
- trust and risk fields have been reviewed
- owner and review cadence are set
- decision outcome is documented
