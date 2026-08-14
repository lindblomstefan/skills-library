# skills-library

Version is early so please be patient and help improving.

A Claude Code skill that runs a guided interview and recommends the right AI skills for your repo or team.

The skill runs entirely inside Claude — no CLI, no server, no external dependencies. The interview, recommendations, onboarding, and feedback flows are all driven by `SKILL.md` and Claude Code's native tooling.

## Install

Paste this into any Claude Code session:

```text
Install the skills-library skill from https://github.com/lindblomstefan/skills-library and set it up so I can type /skills-library to start it.
```

Claude will clone the repo, copy `.claude/skills/skills-library/` into `~/.claude/skills/`, and add the trigger lines to `~/.claude/CLAUDE.md`. Nothing else runs.

## Use

Type `/skills-library` in any Claude Code session to start the guided interview. Claude will:

1. Check if you're in a git repo and offer to inspect it
2. Ask how you want to share context (describe freely, problem only, or chat)
3. Ask narrowing questions — work area, stack, constraints, sensitivity
4. Recommend up to 5 skills with license state, status, and blockers

Claude will also suggest `/skills-library` automatically when you ask what AI skills, tools, or AI-powered workflows to use for a project or team.

After using a recommended skill, say "I have feedback on [skill name]." Claude appends a dated entry to a local feedback file. Once a skill reaches 3 entries it is marked validated — confirmed working in practice, not universally recommended.

## Catalog

Two skills have feedback files seeded and are ready to accumulate validation:

- **gstack** — structured workflow suite for specification, design review, implementation, QA, and ship
- **graphify** — repository knowledge graph that lets agents query structure before browsing raw files

Other candidates are under evaluation. See `catalog/library-skills/` for the full list.

## Contributing

The library grows through use. No GitHub account required for the first two paths:

- **Validate a skill** — use a skill, then say "I have feedback on [skill name]" in Claude. Three feedback entries from real sessions marks a skill as validated.
- **Add a skill** — type `/skills-library` and say "I have a skill to add." Claude runs the onboarding flow and prepares a PR package for you to open.
- **Improve the library** — fork, edit, open a PR. Run `npm test` before pushing.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the validation model and what makes a good skill addition.

## This repository

The installable artifact is the skill folder:

```text
.claude/skills/skills-library/
├── SKILL.md          # Interview, recommendation, onboarding, and feedback instructions
├── VERSION           # Used for update detection
├── feedback/         # Per-skill feedback files; read before recommending
│   ├── _template.md  # Template for new skills
│   ├── gstack.md
│   └── graphify.md
├── agents/           # Claude agent descriptor
└── references/       # Catalog overview for offline use
```

The rest of the repo is catalog governance tooling — YAML manifests, evaluation runs, and validation scripts. It is not part of the installed skill.

```text
catalog/      # Library skill manifests and taxonomies
evaluations/  # Evaluation runs and evidence
tools/        # Catalog validation and guardrail checks
docs/         # Engineering decisions and guardrails
```
