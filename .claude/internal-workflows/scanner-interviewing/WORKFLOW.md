---
name: scanner-interviewing
description: Prepare, run, or synthesize interviews for the scanner identity project. Use when an AI agent needs to create stakeholder-specific interview guides, extract questions from unknowns, analyze interview notes, compare as-is process variants, identify contradictions, or turn conversations with workers, supervisors, HR, security, ESB owners, WMS/SAP/Oracle owners, and support teams into structured findings and next actions.
---

# Scanner Interviewing

## Overview

Use this skill to discover the current scanner reality and validate the identity/session lifecycle through structured conversations. The goal is to turn interviews into evidence, decisions, and better questions.

## Workflow

1. Identify the interview objective: as-is map, gate scenario, identity, scanner device handling, integrations, security, support, or MVP validation.
2. Select the stakeholder type and tailor the guide to what that person can actually know.
3. Start with concrete stories before asking for opinions: "Walk me through yesterday morning" beats "What are the requirements?"
4. Capture facts, examples, local variations, exceptions, pain points, and ownership.
5. Treat contradiction handling as mandatory: compare new input against known facts, decisions, assumptions, and other interview notes.
6. After the interview, synthesize into findings, evidence confidence, contradictions, decisions, open questions, validation next steps, and follow-up interviews.
7. Update the project questionnaire or onboarding pack when the user asks for artifacts to be revised.

## Evidence and Recommendation Gate

Do not turn unstable input into recommendations.

Classify each important claim:

- `High`: direct source or repeated consistent evidence.
- `Medium`: credible but incomplete evidence.
- `Low`: single weak source, second-hand claim, or untested assumption.
- `Blocked`: contradiction, missing source, or vague input prevents recommendation.

When notes are vague, contradictory, or source-poor:

- list contradictions and confusion as their own section;
- separate validation next steps from solution recommendations;
- write follow-up interview questions before proposing target-state decisions;
- state which stakeholder or artifact can resolve the conflict;
- keep solution ideas as hypotheses unless evidence is `High` or `Medium` and unblocked.

## Interview Modes

Use one of these modes:

- **Discovery interview:** Learn what happens today.
- **Validation interview:** Test a proposed lifecycle, flow, or assumption.
- **Exception interview:** Focus on failures, queues, edge cases, and workarounds.
- **Technical interview:** Map systems, integrations, data ownership, and constraints.
- **Synthesis pass:** Convert raw notes into structured findings and next actions.

Read [references/interview-guide.md](references/interview-guide.md) before creating a detailed interview plan or synthesizing substantial notes.

## Stakeholder Targeting

Tailor questions by stakeholder:

- Workers: actual flow, friction, scanner handling, mistakes, unclear messages, workarounds.
- Supervisors: gate pressure, temporary workers, approvals, exceptions, queues, operational accountability.
- HR or agency contacts: worker identity, pre-registration, temporary identity, data quality, lifecycle.
- Security or access control: card issuance, revocation, misuse, physical access, audit.
- Warehouse/process owners: work assignments, scan meaning, operational modes, performance impact.
- ESB/integration owners: routing, transformations, contracts, error handling, observability.
- WMS/SAP/Oracle owners: source-of-truth data, authorization, event consumption, constraints.
- Support/device teams: scanner inventory, failure modes, connectivity, repair, first-line diagnostics.

## Question Design Rules

- Ask for a real recent example before generalizing.
- Separate as-is questions from target-state questions.
- Ask "who decides" and "who fixes it" whenever ownership appears unclear.
- Ask what happens when the normal flow fails.
- Ask whether the answer differs by site, shift, worker type, scanner type, or task type.
- Avoid asking the interviewee to design architecture unless they own architecture.
- Do not lead with the proposed QR-card solution unless the objective is validation.
- Challenge contradictions directly in synthesis even if the user did not ask for contradiction analysis.
- Do not recommend a target design from contradictory or vague evidence.

## Synthesis Shape

When synthesizing, default to:

- Interview metadata
- Key facts
- Representative examples
- Pain points
- Local variations
- Exceptions and workarounds
- Decisions implied or confirmed
- Contradictions with other input
- Open questions
- Risks
- Validation next steps
- Solution hypotheses, only when evidence allows
- Follow-up interviews
- Updates needed in discovery artifacts

## Interview Plan Output

When creating an interview plan, default to this structure:

- Interview objective
- Stakeholder and why this person is needed
- Current assumptions to test
- Known contradictions or confusion to resolve
- Evidence needed from this interview
- Opening script
- Primary questions
- Exception and failure questions
- Ownership and decision questions
- Artifacts to request
- Confidence/risk notes
- Follow-up criteria

## Quality Check

Before finishing, verify that the interview artifact:

- Is tailored to the stakeholder.
- Produces evidence, not just opinions.
- Covers normal flow and exception flow.
- Captures ownership and system boundaries.
- Flags contradictions and vague evidence explicitly.
- Keeps validation next steps separate from solution recommendations.
- Creates actionable follow-up items.

## Model-Agnostic Use

These instructions are model-agnostic. If a runtime lacks file or transcript access, ask for the missing notes and mark source confidence as blocked until evidence is provided.
