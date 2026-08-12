# Future Website

The website is deferred until the catalog, router, compatibility model, and evaluation workflow are clear enough to support it.

When built, the website should be a human-facing product layer over the same data used by the CLI and LLM router. It must not become a separate source of truth.

## Product Purpose

Help people and agents navigate a large, changing skills ecosystem.

The website should answer:

- What skills exist?
- Which skills are trusted?
- Which skills are most useful right now?
- Which skills work with my model, agent, runtime, or environment?
- Which skill or pack should I use for this situation?
- Which skills are stale, replaced, experimental, or risky?

## Live Dashboard

The website should include a live dashboard based on catalog, router, evaluation, and usage data.

Candidate metrics:

- Most used skills
- Most recommended skills
- Most installed packs
- Best reviewed skills
- Fastest growing skills
- Recently added skills
- Recently deprecated skills
- Skills needing review
- Skills with model/runtime compatibility gaps
- Skills with unresolved risk or license questions
- Common failed recommendations
- Missing skill requests

## Reviews and Feedback

The website should support feedback signals that improve routing and governance.

Examples:

- Worked well
- Wrong recommendation
- Skill stale
- Skill missing
- Model/runtime mismatch
- Bad output
- Security, privacy, or license concern
- Better replacement exists

Reviews should be tied to:

- skill id
- model
- runtime
- task type
- project context, if safe to store
- date
- optional free-text notes

## Filters

The website should support filtering by:

- domain
- task type
- model
- runtime
- source type
- status
- stability
- owner
- review state
- trust level
- risk level
- license state
- compatibility support
- pack membership
- relationship type

## Conversational Skill Navigator

The website should include a conversational assistant that helps users decide what skill to use.

The assistant should use the same registry and router data as the CLI.

Example interactions:

- "I need to review a frontend PR in Codex. What should I use?"
- "Which skills work with Claude Code but not Codex?"
- "What replaces this deprecated skill?"
- "We are starting an API project with sensitive customer data. What pack should we use?"
- "Why was this skill rejected?"

The assistant should be able to:

- recommend skills and packs
- explain why a skill is recommended
- explain why a skill is not recommended
- show compatibility constraints
- surface stale or risky skills
- create discovery or evaluation issues when a gap is found
- guide users to install or invoke skills through CLI-compatible commands

## Data Sources

The website should read from:

- `catalog/skills/*.yaml`
- `catalog/packs/*.yaml`
- `catalog/taxonomies/*.yaml`
- `evaluations/**`
- router output
- usage events, once available
- review and feedback events, once available

## Not In MVP

Do not build the website until:

- the first catalog schema is reviewed
- model/runtime compatibility has been tested on real examples
- at least a few external candidates have been evaluated
- router output shape is stable enough to consume
- usage and feedback data requirements are clearer

