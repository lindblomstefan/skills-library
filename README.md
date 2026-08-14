# Skills Library

A Claude Code skill that runs a guided interview and recommends the right AI skills for your repo or team.

## Install

Paste this into any Claude Code session:

```text
Install the skills-library skill from https://github.com/lindblomstefan/skills-library and set it up so I can type /skills-library to start it.
```

Claude will clone the repo, copy the skill into `~/.claude/skills/`, and add the trigger lines to `~/.claude/CLAUDE.md`.

## Use

Type `/skills-library` in any Claude Code session to start the guided interview. Claude will:

1. Check if you're in a git repo and offer to inspect it
2. Ask how you want to share context (describe freely, problem only, or chat)
3. Ask narrowing questions — work area, stack, constraints, sensitivity
4. Recommend up to 5 skills with license state, status, and blockers

Claude will also suggest `/skills-library` automatically when you ask what AI skills, tools, or AI-powered workflows to use for a project or team.

## Feedback

After using a recommended skill, tell Claude "I have feedback on [skill name]." Claude runs a short capture flow, appends a dated entry to `~/.claude/skills/skills-library/feedback/<skill-id>.md`, and previews the change before saving.

Once a skill has accumulated 3 feedback entries, Claude sets `validated: true` in that file. Validated means the skill has been confirmed working in practice — not that it is the right fit for every case. Claude reads feedback files before recommending, so the library improves with use.

## Catalog

Two skills have feedback files seeded and are ready to accumulate validation:

- **gstack** — structured workflow skill for specification, design review, implementation, QA, and ship
- **graphify** — repository knowledge graph that lets agents query structure before browsing raw files

Other candidates are under evaluation. See `catalog/library-skills/` for the full list.

## Add a skill

Type `/skills-library` and say you have a skill to add. Claude runs the onboarding flow: source, license, mode, and PR scope. Onboarding changes go through a PR — nothing is pushed to main directly.

## Repository structure

```text
.
├── .claude/skills/skills-library/   # The installable Claude skill
│   ├── SKILL.md                     # Interview and recommendation instructions
│   ├── feedback/                    # Per-skill feedback read before recommendations
│   └── references/                  # Catalog overview for offline use
├── catalog/                         # Library skill manifests and taxonomies
├── evaluations/                     # Evaluation runs and evidence
└── docs/                            # Engineering guardrails and design decisions
```

See `docs/engineering-guardrails.md` for file boundaries and size limits.

## Validate and test

```bash
npm test
```
