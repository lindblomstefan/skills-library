# skills-library

A Claude Code skill that runs a guided interview and recommends the right AI skills for your repo or team.

If it's useful, a star helps others find it.

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

After using a recommended skill, say "I have feedback on [skill name]." Claude appends a dated entry to a local feedback file at `~/.claude/skills/skills-library/feedback/<skill-id>.md`. Once a skill reaches 3 entries it is marked validated — confirmed working in practice, not universally recommended.

To read the feedback for any skill, ask Claude: "Show me the feedback for graphify" — or open the file directly.

## Catalog

Over 100 skills tracked across all stages. The skill recommends from the full catalog — status is always shown so you know the confidence level.

See [CATALOG.md](CATALOG.md) for the full list. Skills move from candidate → evaluating → approved through real usage and community feedback.

## Contributing

**This library is young.** The catalog has 113 skills but almost none have real-world feedback yet. That is the gap. Adding more skills is not the priority right now — validating the ones already here is.

The most valuable thing you can do is use a skill and leave feedback. No GitHub account needed:

- **Give feedback on a skill** — use a skill, then say "I have feedback on [skill name]" in any Claude Code session. Claude appends a dated entry to a local file. Once a skill reaches 3 real-session entries it is marked validated. This is how the library earns trust.
- **Add a skill** — type `/skills-library` and say "I have a skill to add." Only when there is something genuinely missing.
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
