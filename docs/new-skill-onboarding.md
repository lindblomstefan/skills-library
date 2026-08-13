# New Skill Onboarding

New skill onboarding ensures that every candidate skill captures enough information to be evaluated, routed, installed, reviewed, and eventually replaced.

This workflow applies whether the information is filled in by a person, Claude, another LLM, or an automated importer.

This workflow should become an internal skill, tentatively `skill-library-onboarding`, so any agent session can follow the same process when helping add, evaluate, or catalog skills.

## Core Rule

No required field should be left blank.

Use `unknown`, `not-applicable`, or `needs-review` when the answer is not known yet. This makes gaps explicit and searchable.

## Workflow

1. Intake
   - Capture source, proposer, summary, suspected value, and basic scope.

2. License Check
   - Check and record the skill license type before evaluation, pack inclusion, approval, or copying any assets/instructions.
   - Capture license name or review state, SPDX id when known, redistribution constraints, and whether modification is allowed.
   - Use `unknown` or `needs-review` only as temporary states; they block approval.

3. Triage
   - Decide whether the candidate is worth evaluating now.

4. Candidate Manifest
   - Create a draft manifest from `catalog/templates/skill.yaml`.
   - Put publishable/recommendable skills under `catalog/library-skills/`.
   - Put operating workflow skills used only by this repository under `catalog/internal-skills/`.
   - Set `catalog_visibility` to match the directory.

5. Evaluation
   - Use `evaluations/templates/evaluation.md`.
   - Test realistic tasks, compatibility, install behavior, and risks.

6. Decision
   - Choose `adopt`, `adapt`, `build`, `defer`, `reject`, or `replace`.

7. Catalog Entry
   - Add or update the skill manifest only after required fields are complete enough for routing.
   - Submit catalog or source changes through a pull request; onboarding must not direct-push to `main`.
   - Keep external skills as metadata pointers unless the PR explicitly reviews copied or adapted assets.

8. Pack and Router Review
   - Decide whether the skill belongs in any pack.
   - Add positive and negative routing guidance.

9. Freshness Review
   - Set owner, review cadence, next review date, and replacement watch.

## Required Data Groups

### Identity

- skill id
- name
- catalog visibility: `library` or `internal`
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
- license type or review state
- license SPDX id when known
- redistribution constraints
- modification permission
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
- model/runtime matrix evidence
- install and invoke result per runtime

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
- evaluation runs
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

## Review Transport

Use public issues only for redacted discussion and skill-specific feedback comments.

Use pull requests for any onboarding change that adds or modifies:

- `.claude/skills/`
- `catalog/library-skills/`
- `catalog/internal-skills/`
- `catalog/packs/`
- router logic or schemas

## Acceptance And Fetching

A recommendation is not an install action by default.

The library can offer an opt-in install/fetch step after recommendation. Before any fetch, show a preview plan with selected skill ids, source URLs, license state, destination, required permissions, required secrets, agent instruction file updates, and whether each install is standard or evaluation-only.

After a user accepts that plan, fetch only the accepted skill from its original upstream source or official distribution. Do not bulk-download all recommended repositories. Do not treat a catalog/reference skill, such as an `awesome-*` list, as approval to fetch every downstream repository it links to.

Any downloader or installer must preserve these gates:

- block unknown, needs-review, restricted, paid, or absent licenses unless a human explicitly approves evaluation-only handling
- show license and source before download
- install into the target repo or user runtime, not into the library catalog
- inspect and update relevant target repo agent instruction files, or output a reviewable patch
- keep this repository's catalog as metadata unless a PR reviews a copied or adapted source artifact
- record what was fetched, from where, and why
- record which user approval authorized the fetch

Agent instruction updates should cover at least:

- skill source and license
- invoke command or trigger guidance
- runtime compatibility notes
- required permissions, secrets, and network access
- security, privacy, and compliance cautions
- freshness or update responsibility
- evaluation evidence that becomes part of the repository

The PR should show the license check, evidence matrix, routing guidance, open questions, and blockers so the decision can be reviewed without reconstructing the onboarding session.

## Definition of Ready for Evaluation

A candidate is ready for evaluation when:

- required fields are present, even if some are `unknown`
- source is reachable or otherwise available
- license type or review state is recorded
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
