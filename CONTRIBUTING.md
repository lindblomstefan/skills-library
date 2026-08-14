# Contributing

The skills-library is built around a simple idea: skills are validated by real use, not by maintainer approval. Anyone can contribute — no deep GitHub knowledge required for most paths.

## Three ways to contribute

### 1. Validate a skill — lowest effort

Use a skill from the catalog, then say "I have feedback on [skill name]" in any Claude session where the skill is installed. Claude writes the entry locally and tracks it toward validation.

Three feedback entries from real use marks a skill as validated. That's it.

No GitHub account needed. No PR. Just use the skill and report back.

### 2. Add a skill — guided flow

Found a skill worth cataloguing? Type `/skills-library` in Claude and say "I have a skill to add." Claude walks you through source, license, mode, and PR scope, captures your first feedback entry, then prepares a PR package for you to open.

You open the PR — Claude does the rest of the preparation.

### 3. Improve the library — direct PR

For changes to `SKILL.md`, catalog structure, taxonomies, tooling, or documentation: fork, edit, and open a PR. Read `docs/engineering-guardrails.md` before editing tooling files. Run `npm test` before pushing.

## What makes a good skill addition

- Public GitHub repo with a readable source
- Clear license (MIT, Apache 2.0, or similar open license)
- Solves a specific, repeatable problem
- Works with Claude Code or another runtime already in the catalog
- You have actually used it — your first feedback entry goes in on day one

## Validation model

Skills are not approved by maintainers — they earn validation through use.

- A skill needs **3 feedback entries** from real sessions before it is marked validated
- The person who adds a skill writes entry #1 during onboarding
- Entries 2 and 3 must come from other users or other sessions
- Skills nobody uses never validate — that is the right outcome
- Validated means "confirmed working in practice," not "universally recommended"

## What not to add

- Skills that require paid subscriptions with no free tier
- Skills with unknown or restricted licenses
- Scripts or automation that run arbitrary code without user consent
- Anything that duplicates an already-validated skill without clear improvement

## Company use — private skills

If your team wants to use this library but keep internal skills private, fork the repo into your company's GitHub org as a private repository.

**Setup:**

1. Fork to `https://github.com/company/skills-library` (private)
2. In `.claude/skills/skills-library/SKILL.md`, update the auto-update URL — replace `lindblomstefan/skills-library` with `company/skills-library` in the version check bash block
3. Add internal skills to `catalog/library-skills/` and their feedback files to `feedback/`
4. Install from the private fork:

```text
Install the skills-library skill from https://github.com/company/skills-library and set it up so I can type /skills-library to start it.
```

**Staying in sync with upstream:**

```bash
git remote add upstream https://github.com/lindblomstefan/skills-library
git fetch upstream
git merge upstream/main
```

Merges are clean in practice — internal skills live in separate files, so conflicts only appear if the public `SKILL.md` changed lines near the auto-update URL. Resolve those by keeping your company's fork URL.

Internal feedback files follow the same validation model. Skills your team adds validate independently from the public library.

## Questions and proposals

Use the [Skill discovery issue template](https://github.com/lindblomstefan/skills-library/issues/new?template=skill-discovery.yml) to propose a skill before going through the full onboarding flow. Good for "I think we should add X, thoughts?" conversations.
