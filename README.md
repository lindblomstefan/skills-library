# Skills Library

This repository is a skill-agnostic company catalog for discovering, evaluating, adopting, and creating reusable AI skills.

The library should support multiple sources:

- External skills from trusted public or partner sources
- Internal company-authored skills
- Adapted skills based on external patterns
- Experimental skills that still need evaluation

The goal is not to store every skill here. The goal is to make skill work visible, reviewable, reusable, and governed.

## Operating Model

Use GitHub issues as the intake and planning system.

- Use **Skill discovery** issues to capture promising external skills, references, methods, or patterns.
- Use **Skill evaluation** issues to assess fit, trust, maintainability, and usage value.
- Use **Skill build** issues when the company needs to create or adapt a skill.
- Use **Library improvement** issues for catalog structure, governance, automation, and documentation.

Store reusable documentation in `docs/`. Store skill metadata in `catalog/`. Add actual skill files only when there is a clear reason to own, adapt, or distribute them from this repo.

## Skill Lifecycle

1. Discover a skill, method, pattern, or need.
2. Evaluate whether it should be used as-is, adapted, replaced, or ignored.
3. Document decision and usage guidance.
4. Build or import only when ownership adds value.
5. Review periodically for staleness, security, and continued usefulness.

## Catalog Dimensions

Classify skills by what work they improve, not by implementation format.

- Planning and product discovery
- Architecture and technical design
- Coding and refactoring
- Testing and quality
- UI, UX, and accessibility
- Security, privacy, and compliance
- DevOps and delivery
- Documentation and communication
- Data, analytics, and AI engineering
- Incident response and learning

## Repository Contents

```text
.
├── .github/ISSUE_TEMPLATE/   # Intake templates
├── catalog/                  # Skill manifests, packs, and taxonomies
├── evaluations/              # Evaluation notes and evidence
├── docs/                     # Library model and issue backlog
├── AGENTS.md                 # Agent guidance, including Graphify usage
└── README.md                 # Entry point
```

## Current Focus

The MVP focus is the structure that lets the library work:

- catalog schema
- compatibility metadata
- source and lifecycle taxonomies
- pack definitions
- evaluation evidence
- router-ready metadata
- new skill onboarding
- usage and feedback data for future metrics
- governance gates and privacy boundaries
- evaluation runs linked to golden tasks

Do not add skills to the catalog until the first manifest structure has been reviewed.
