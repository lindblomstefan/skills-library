# CLI Usage

The POC direction is CLI-first. The stable interface should be commands and JSON output that humans, scripts, agents, and other repositories can call.

## From This Repo

Run commands through Node:

```bash
node bin/skills-library.mjs validate
node bin/skills-library.mjs build
node bin/skills-library.mjs recommend --task "start a repo onboarding initiative" --model codex --runtime codex-cli
node bin/skills-library.mjs assist --repo . --format text
node bin/skills-library.mjs onboard --repo . --candidate <url-or-path> --format text
```

Or use npm scripts:

```bash
npm run poc:validate
npm run poc:build
npm run poc:recommend
```

## From Another Repo

Call this repository's binary and point `--repo` at the target repository:

```bash
/path/to/skills-library/bin/skills-library.mjs recommend \
  --repo . \
  --task "what skill set should we use for this initiative?" \
  --model codex \
  --runtime codex-cli \
  --mode exploratory \
  --format json
```

The target repo is inspected for `graphify-out/graph.json`. If present, the recommendation profile records that Graphify context is available. If missing, the output records the gap instead of failing.

## Install From GitHub, Then Invoke

This repo intentionally exposes one installable Codex skill:

```text
.codex/skills/skill-library/
```

Internal workflow instructions are stored under `.codex/internal-workflows/` and should not be offered as separate installable skills.

If a user gives an agent this URL:

```text
git@github.com:lindblomstefan/skills-library.git
```

the agent should treat it as the source for installing `skill-library`, not as the task itself.

Expected post-install behavior:

1. Invoke the installed `skill-library` skill.
2. Start guided assist/interview for the current target repo or initiative.
3. Ask for repo-inspection consent before reading files.
4. Recommend skills only after intent and evidence are stable enough.

Good first prompt:

```text
Install and use the skill-library skill from git@github.com:lindblomstefan/skills-library.git.
After installing it, invoke skill-library and start helping me evaluate what skills this repo needs.
Ask for repo-inspection consent before reading files.
```

Expected first useful command when the full repo is locally available:

```bash
/path/to/skills-library/bin/skills-library.mjs assist --repo . --format text
```

## Output Formats

JSON is the default and is the recommended interface for agents and automation:

```bash
node bin/skills-library.mjs recommend --format json
```

Text output is for quick human review:

```bash
node bin/skills-library.mjs recommend --format text
```

## Current Commands

- `validate`: checks required seed catalog fields, taxonomy references, duplicate ids, relationship targets, and license gate fields.
- `build`: emits generated catalog, router, graph, recommendation, and Kuzu data.
- `recommend`: returns an evidence-backed recommendation for the requested task/model/runtime/repo.
- `assist`: starts a guided recommendation session with repo-inspection consent, choices, and follow-up questions.
- `onboard`: starts a guided skill onboarding session with license-first checks and PR-oriented outputs.
- `feedback collect`: writes a redacted feedback event into the target repo under `.skills-library/feedback/`.
- `feedback preview`: prints a privacy-focused summary of a feedback event before submission.
- `feedback submit`: submits a previewed feedback event as a skill-specific GitHub issue comment with explicit `--yes`.

## Recommendation Acceptance

`recommend` does not install or download external repositories by itself. It returns a shortlist with source, install, invoke, license, risk, and review metadata.

The library can offer an opt-in install/fetch step after the recommendation. That step should first show a preview plan with selected skill ids, source URLs, license state, destination, required permissions, required secrets, agent instruction file updates, and whether each install is standard or evaluation-only.

When a user accepts that install plan, the future install flow should fetch only explicitly accepted skills from their original upstream `source.url` or official distribution. It must not bulk-download every recommended repo. It must not download downstream projects listed inside reference catalogs like `awesome-*` unless the user chooses one of those downstream projects as a separate onboarding candidate.

Acceptance must stay gated by:

- clear enough license state for the intended use
- original upstream source
- accepted permissions, secrets, and network needs
- compatible or explicitly evaluation-only runtime
- planned updates to target repo agent instruction files
- no copied external assets in this repository unless a PR reviews the adaptation
- an audit record of what was fetched, where it was installed, and which user approval authorized it

## Agent Instruction Files

An accepted skill must take responsibility for making itself usable in the target repository. The install/fetch flow should inspect existing agent instruction files such as `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/*`, `.github/copilot-instructions.md`, and comparable runtime files.

The flow should preserve existing instructions and add only the smallest useful integration: where the skill came from, how to invoke it, what license applies, what permissions or privacy cautions matter, and who owns freshness. If direct edits are risky, the CLI should emit a reviewable patch instead of editing the files.

## Guided Help Flow

Guided flows are local-first. The first question is always whether repo inspection is allowed.

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --format json
```

When the user accepts repo inspection, pass consent explicitly:

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --repo-consent accepted \
  --task "choose skills for a modernization initiative" \
  --model <model-id> \
  --runtime <runtime-id> \
  --format text
```

Skill onboarding uses the same pattern, but is PR-oriented:

```bash
/path/to/skills-library/bin/skills-library.mjs onboard \
  --repo . \
  --repo-consent accepted \
  --candidate <url-or-path> \
  --format json
```

If the repo does not exist or inspection is denied, the CLI returns structured questions instead of failing.

## Feedback Flow

Collect locally first:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback collect \
  --repo . \
  --skill-id gstack \
  --signal wrong-recommendation \
  --severity medium \
  --task-type architecture-review \
  --model codex \
  --runtime codex-cli \
  --notes "Redacted feedback from the user"
```

Preview before submitting:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback preview \
  --file .skills-library/feedback/<feedback-id>.json
```

Submit only after review:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback submit \
  --target issue \
  --target-repo owner/skills-library \
  --file .skills-library/feedback/<feedback-id>.json \
  --yes
```

Feedback issue submission appends a redacted comment to `Feedback: <skill-id>`, creating that public issue if needed. Direct push to the main repo is blocked by design. Skill onboarding and catalog/source changes require a PR.

## Contract Direction

The CLI should remain the primary contract. Any future dashboard should be designed from scratch and consume the CLI or generated JSON outputs rather than becoming a separate source of truth.

## Skill Visibility

Public recommendation commands read from `catalog/library-skills/`.

Internal operating skills live under `catalog/internal-skills/`. They support onboarding, guided interviews, feedback capture, and library maintenance, but they are not part of the public recommendation inventory.
