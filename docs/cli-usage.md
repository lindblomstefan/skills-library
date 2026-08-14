# CLI Usage

The primary interface is CLI commands and JSON output that humans, scripts, agents, and other repositories can call.

## From This Repo

Run commands through Node:

```bash
node bin/skills-library.mjs validate
node bin/skills-library.mjs build
node bin/skills-library.mjs assist --repo . --format text
node bin/skills-library.mjs recommend --repo . --repo-consent accepted --task "start a repo onboarding initiative" --model claude --runtime claude-code
node bin/skills-library.mjs onboard --repo . --candidate <url-or-path> --format text
```

Or use npm shortcuts:

```bash
node bin/skills-library.mjs validate
node bin/skills-library.mjs build
node bin/skills-library.mjs recommend
```

## From Another Repo

Call this repository's binary and point `--repo` at the target repository:

```bash
/path/to/skills-library/bin/skills-library.mjs assist \
  --repo . \
  --format text
```

After the user accepts repo inspection or answers the interview, call the router with explicit evidence:

```bash
/path/to/skills-library/bin/skills-library.mjs recommend \
  --repo . \
  --repo-consent accepted \
  --task "what skill set should we use for this initiative?" \
  --model claude \
  --runtime claude-code \
  --mode exploratory \
  --format text
```

For questions-only mode:

```bash
/path/to/skills-library/bin/skills-library.mjs recommend \
  --repo . \
  --task "what skill set should we use for this initiative?" \
  --interview-answers "goal, work area, sensitivity, runtime, and known constraints" \
  --model claude \
  --runtime claude-code \
  --mode exploratory \
  --format text
```

The target repo is inspected for `graphify-out/graph.json`. If present, the recommendation profile records that Graphify context is available. If missing, the output records the gap instead of failing.

## Install From GitHub, Then Invoke

This repo intentionally exposes one installable Claude skill:

```text
.claude/skills/skills-library/
```

Internal workflow instructions are stored under `.claude/internal-workflows/` and should not be offered as separate installable skills.

If a user gives an agent this URL:

```text
git@github.com:lindblomstefan/skills-library.git
```

the agent should treat it as the source for installing `skills-library`, not as the task itself.

Expected post-install behavior:

1. Invoke the installed `skills-library` skill.
2. Start guided assist/interview for the current target repo or initiative.
3. Ask an open first question about the idea, goal, and intended end product.
4. Ask for repo-inspection consent before reading files.
5. Recommend skills only after intent and evidence are stable enough.

Good first prompt:

```text
Install and use the skills-library skill from git@github.com:lindblomstefan/skills-library.git.
After installing it, invoke skills-library and start helping me evaluate what skills this repo needs.
Start by asking about the idea, goal, and intended end product. Ask for repo-inspection consent before reading files.
```

Expected first useful command when the full repo is locally available:

```bash
/path/to/skills-library/bin/skills-library.mjs assist --repo . --format text
```

## Output Formats

Text is the default and is the recommended interface for humans. Without repo inspection or concrete interview answers, `recommend` returns questions instead of a shortlist:

```bash
node bin/skills-library.mjs recommend
```

JSON output is for agents and automation that need the full router result:

```bash
node bin/skills-library.mjs recommend --format json
```

## Current Commands

- `validate`: checks required seed catalog fields, taxonomy references, duplicate ids, relationship targets, and license gate fields.
- `build`: emits generated catalog, router, graph, recommendation, and Kuzu data.
- `recommend`: returns an evidence-backed recommendation only after repo inspection with consent or concrete interview answers. Without that, it returns the interview gate and questions.
- `assist`: starts a guided recommendation session with an open context question, repo-inspection consent, choices, and follow-up questions.
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

Guided flows are local-first. The first question asks what the user is trying to build or improve, what goal it should achieve, and what the intended end product should look like. Repo-inspection consent comes before reading files.

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

Do not route from inferred defaults. Recommendations must never be given without either a repo read or concrete answered questions.

## Feedback Flow

Collect locally first:

```bash
/path/to/skills-library/bin/skills-library.mjs feedback collect \
  --repo . \
  --skill-id gstack \
  --signal wrong-recommendation \
  --severity medium \
  --task-type architecture-review \
  --model claude \
  --runtime claude-code \
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
