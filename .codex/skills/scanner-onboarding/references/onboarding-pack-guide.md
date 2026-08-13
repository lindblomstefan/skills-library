# Onboarding Pack Guide

Use this reference when creating or substantially updating a scanner identity onboarding pack.

## Stabilization Output For Blocked Evidence

Use this reduced structure when evidence is mostly vague, missing, or contradictory:

1. **Purpose and current scope**
   - State that the purpose is orientation and evidence stabilization.
   - State that no solution recommendation is ready.

2. **Evidence status summary**
   - Classify input as stable, partial, vague, contradictory, or missing.
   - Show which areas are blocked.

3. **Current as-is understanding**
   - Include only what the notes actually support.
   - Label confidence for each claim.

4. **Contradictions and confusion**
   - Make this the central section.
   - Explain why each issue blocks a recommendation.

5. **Open decisions**
   - List decisions that must be made later.
   - Do not infer a leaning from weak evidence.

6. **Risks of deciding too early**
   - Explain what could go wrong if the team designs from unstable evidence.

7. **Validation next steps**
   - Define the interviews, observations, and artifacts needed.
   - Name the best owner or evidence source.

8. **No solution recommendation yet**
   - Say explicitly that recommendations are blocked.
   - Do not include a solution hypothesis table unless the user explicitly asks for hypotheses.

## Recommended Pack Structure

1. **Context in one page**
   - What problem exists today?
   - Where does it happen?
   - Who is affected?
   - Why now?
   - What should be easier after the solution exists?

2. **Current reality**
   - Start-of-shift process.
   - Early-morning gate scenario.
   - Scanner pickup and return.
   - Manual records and workarounds.
   - Known process variations.

3. **Target concept**
   - Worker receives or already has an access card.
   - Worker scans card to activate a scanner.
   - Interface validates person/card/device/site/context.
   - A work session is created.
   - Operational scans are normalized and routed.
   - Session ends cleanly.

4. **Domain model**
   - Worker identity.
   - Access card.
   - Scanner device.
   - Site or area.
   - Permission profile.
   - Work session.
   - Scan event.
   - Backend routing context.

5. **Lifecycle summaries**
   - Card lifecycle: issue, activate, expire, revoke, replace.
   - Identity lifecycle: unknown, pending, temporary, known, blocked, expired.
   - Session lifecycle: requested, validating, active, suspended, ended, failed.
   - Scanner lifecycle: registered, available, active, offline, broken, retired.

6. **Integration boundary**
   - Scanner identity interface owns activation, session, permissions, normalization, audit.
   - ESB owns routing, transformation, backend mapping, retries, fan-out.
   - Backend systems own their source-of-truth data and business decisions.

7. **Open decisions**
   - QR code content.
   - Temporary identity minimum data.
   - Offline activation rules.
   - Concurrent session rules.
   - Admin roles.
   - Retention and audit requirements.

8. **Contradictions and confusion**
   - Conflicting statements about pilot scope, worker groups, sites, or shifts.
   - Conflicting ownership claims for session lifecycle, authorization, routing, or audit.
   - Conflicting security claims such as offline activation required versus prohibited.
   - Vague claims that sound like decisions but lack source, owner, or evidence.
   - Any contradiction that blocks a recommendation.

9. **Risks**
   - Shared or stolen cards.
   - Unknown workers starting work without enough control.
   - Backend latency at shift start.
   - Ambiguous scanned codes.
   - Unclear process ownership.
   - Local site variations hidden until rollout.

10. **Validation next steps**
   - Fill discovery questionnaire.
   - Interview prioritized stakeholders.
   - Choose pilot site and scenario.
   - Draft first event/session contracts.
   - Mock integrations before committing platform choices.

11. **Solution hypotheses**
   - Only include when evidence is stable enough to support a direction.
   - Label each hypothesis with confidence and the evidence that supports it.
   - Do not present a hypothesis as a recommendation when a contradiction blocks it.
   - Omit this section when the evidence gate is blocked unless the user explicitly asks for hypotheses.

## Evidence Labels

Use these labels in onboarding material:

- `Fact`: Confirmed by source material or stakeholder.
- `Example`: Specific observed or reported event.
- `Assumption`: Plausible but not confirmed.
- `Decision`: Explicitly decided.
- `Open question`: Needs answer.
- `Contradiction`: Two or more inputs cannot all be true.
- `Confusion`: Input is too vague to classify safely.
- `Risk`: Could harm adoption, security, operations, or delivery.

## Confidence Labels

- `High`: Direct source or repeated consistent evidence.
- `Medium`: Credible but incomplete evidence.
- `Low`: Single weak source, second-hand claim, or untested assumption.
- `Blocked`: Contradiction, missing source, or vague input prevents a recommendation.

## Suggested Tables

### Stakeholder Map

| Stakeholder | What they know | Decisions they own | Follow-up needed |
| --- | --- | --- | --- |
|  |  |  |  |

### System Map

| System/process | Current role | Source-of-truth data | Owner | Integration need |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Open Decisions

| Decision | Options | Current leaning | Needed input | Owner |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Contradictions and Confusion

| Topic | Conflicting or vague inputs | Why it matters | Confidence | Validation owner |
| --- | --- | --- | --- | --- |
|  |  |  | Blocked |  |

### Validation Next Steps

| Question to validate | Evidence needed | Best source | Blocks recommendation? |
| --- | --- | --- | --- |
|  |  |  |  |

### Solution Hypotheses

| Hypothesis | Evidence | Confidence | Validation still needed |
| --- | --- | --- | --- |
|  |  |  |  |
