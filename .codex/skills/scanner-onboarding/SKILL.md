---
name: scanner-onboarding
description: Create, update, or review onboarding material for the scanner identity project. Use when an AI agent needs to turn rough context, discovery answers, requirements notes, stakeholder input, or architecture assumptions into a concise onboarding pack that helps a new participant understand the scanner use case, as-is reality, identity/session lifecycle, open decisions, terminology, risks, and next actions.
---

# Scanner Onboarding

## Overview

Use this skill to keep a clear "base plate" for people joining the scanner identity work. The output should make the domain understandable without pretending the requirements are more mature than they are.

## Workflow

1. Gather available context from project files, user notes, filled questionnaires, interview notes, diagrams, and existing artifacts.
2. Run the evidence gate before drafting recommendations: identify vague claims, contradictions, source gaps, and unstable decisions.
3. Separate facts, examples, assumptions, decisions, open questions, contradictions, and hypotheses.
4. Produce or update an onboarding pack that is short enough to read, but complete enough to orient a new stakeholder.
5. Keep the red thread: operational problem -> current reality -> target identity/session lifecycle -> integration boundary -> risks and next questions.
6. Preserve uncertainty explicitly. Do not convert unknowns into decisions.

## Evidence Gate

Before recommending a solution, classify the input:

- `Stable`: supported by clear source material or multiple consistent stakeholder inputs.
- `Partial`: plausible but incomplete; usable for framing questions, not for decisions.
- `Vague`: too broad or generic to support a recommendation.
- `Contradictory`: sources conflict or the same source asserts incompatible claims.
- `Missing`: needed information is absent.

If evidence is `Vague`, `Contradictory`, or `Missing`, do not recommend a solution direction as if it is ready. Instead:

- list the confusion or contradiction explicitly;
- state the decision or claim that cannot be trusted yet;
- define the validation next step;
- identify the stakeholder or artifact needed to resolve it;
- keep possible solutions out of the recommendation section.

If the dominant evidence is `Vague`, `Contradictory`, or `Missing`, switch from a normal onboarding pack to a stabilization output. Do not fill a full target operating flow or solution hypothesis table just because the template has those sections. The output should say that no solution recommendation is safe yet and focus on what must be validated.

Use this confidence scale:

- `High`: direct source or repeated consistent evidence.
- `Medium`: credible but incomplete evidence.
- `Low`: single weak source, second-hand claim, or untested assumption.
- `Blocked`: contradiction or missing evidence prevents recommendation.

## Output Shape

Default to a Markdown document with these sections unless the user asks for another format:

- Purpose and current scope
- One-paragraph concept summary
- Current as-is understanding
- Target operating flow
- Identity and access card concepts
- Scanner work session lifecycle
- Systems and integration boundary
- Stakeholders and ownership
- Known decisions
- Contradictions and confusion
- Open decisions
- Risks and controls
- Glossary
- Validation next steps
- Solution hypotheses, only when evidence allows

For blocked or mostly vague input, use this reduced stabilization shape instead:

- Purpose and current scope
- Evidence status summary
- Current as-is understanding, with confidence
- Contradictions and confusion
- Open decisions
- Risks of deciding too early
- Validation next steps
- No solution recommendation yet

Read [references/onboarding-pack-guide.md](references/onboarding-pack-guide.md) before creating a full onboarding pack or doing a substantial update.

## Style Rules

- Be direct and concrete.
- Use operational language: worker, scanner, card, session, site, supervisor, ESB, backend system.
- Mark every unstable point as `Assumption`, `Open question`, or `Decision needed`.
- Mark contradictory points as `Contradiction`; do not hide them inside risks or open questions.
- Keep technology choices provisional unless the source material states them as decisions.
- Prefer flow descriptions and tables over abstract architecture language.
- Include examples from real sites or shifts when available.
- Avoid generic onboarding filler.
- Separate validation next steps from solution recommendations. Validation next steps answer "what must be learned"; solution recommendations answer "what should be built or decided."
- Never let a target flow, controls list, or hypothesis table read like a recommendation when the evidence gate is blocked.

## Domain Anchors

Treat these as the initial working anchors for this project:

- The core problem is identity and session orchestration for scanners, not scanner hardware alone.
- A QR access card should usually be treated as a revocable token, not as permanent identity data.
- The key domain object is the scanner work session: person, card, scanner, site, role, permissions, time window, and routing context.
- The enterprise service bus should own routing, transformations, backend-specific mappings, and fan-out where possible.
- The scanner-facing interface should own activation, session lifecycle, permission checks, event normalization, and auditability.
- Early-morning gate pressure is a first-class scenario, not an edge case.

## Quality Check

Before finishing, verify that the onboarding output:

- Helps a new participant explain the problem in two minutes.
- Shows what is known versus unknown.
- Shows contradictions and confusion before recommendations.
- Connects as-is reality to the future lifecycle.
- Avoids premature hosting, product, or platform decisions.
- Avoids recommendations from vague, unstable, or contradictory evidence.
- Uses the stabilization output when evidence is mostly vague, missing, or contradictory.
- Ends with concrete next actions.

## Model-Agnostic Use

These instructions are model-agnostic. If a runtime lacks repository tools, ask for artifacts or notes and mark evidence as missing rather than inventing context.
