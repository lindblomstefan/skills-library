# Interview Guide

Use this reference when preparing detailed interviews or synthesizing substantial notes.

## Interview Preparation

Before drafting questions, identify:

- Interview objective.
- Stakeholder type.
- Site, shift, worker group, scanner type, and process area.
- What we already know.
- What must be learned from this person specifically.
- Which assumptions should be tested.
- Which contradictions or vague claims this person can resolve.
- What evidence would raise confidence enough to make a recommendation.

## Starter Script

Use plain language:

```text
We are trying to understand how scanners, identity, cards, systems, and work sessions actually work today. I am interested in concrete examples, especially when the normal flow breaks. If something differs by site, shift, worker type, or scanner type, please call that out.
```

## Core Question Bank

### As-Is Flow

- Walk me through the last normal start-of-shift scanner flow you saw.
- Where did the worker come from, and how did they get a scanner?
- How did the worker prove who they were?
- What systems or people were involved?
- What happened after the first successful scan?
- What records were created?

### Gate Pressure

- What happens when many workers arrive before a shift starts?
- Which workers are already known, and which are not?
- Who can decide that someone may start work?
- What causes queues?
- What is the fastest workaround used today?
- What is the riskiest workaround used today?

### Identity And Cards

- Which identities exist before the worker arrives?
- What minimum information is needed to let someone start?
- Are temporary workers handled differently?
- Who can issue or revoke cards?
- What happens if a card is lost, shared, forgotten, or replaced?
- Are there situations where shared identity is accepted?

### Scanner Device Handling

- Where are scanners stored and charged?
- How does a worker choose a scanner?
- How is the scanner known by systems?
- Can a scanner be passed between people?
- What happens when a scanner is broken, offline, or out of battery?
- Who fixes scanner problems?

### Work Session

- When should a session start?
- What should be checked before the session becomes active?
- What should the worker see when activation succeeds or fails?
- How should a session end?
- Can one person have multiple active scanners?
- Can one scanner have multiple active people?

### Codes And Scan Events

- Which code types are scanned?
- What business objects are scanned?
- How does the scanner know whether a scan is login, picking, receiving, inventory, or something else?
- What makes a scan invalid?
- What should happen when a scan is rejected?
- Which systems need the scan event?

### Integrations

- Which systems know the person?
- Which systems know the work assignment?
- Which systems know the scanner?
- Which systems must respond immediately?
- What should the ESB own?
- What should not be built into the scanner client?

### Security, Privacy, And Audit

- What misuse scenarios are realistic?
- Which personal data appears today?
- What must be auditable?
- Who may see session and scan history?
- How long should logs be retained?
- Are any tasks regulated or safety-critical?

### Support And Operations

- Who gets called first when scanner activation fails?
- What information does support need?
- Which failures are common?
- Which failures stop work?
- Which failures are tolerated with manual workaround?
- What would supervisors want to see live?

## Synthesis Template

```markdown
# Interview Synthesis: [Stakeholder / Date]

## Metadata

- Interviewee:
- Role:
- Site/process:
- Interview objective:
- Source notes:

## Key facts

- Claim:
  - Evidence:
  - Confidence:

## Concrete examples

- 

## Current flow

1. 

## Exceptions and workarounds

- 

## Local variations

- 

## Ownership signals

| Area | Owner mentioned | Confidence | Follow-up |
| --- | --- | --- | --- |
|  |  |  |  |

## Decisions or strong leanings

- 

## Contradictions

| Topic | Conflicting inputs | Source or stakeholder | Impact | Validation needed |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Open questions

- 

## Risks

- 

## Validation next steps

| Step | Evidence needed | Owner/source | Blocks recommendation? |
| --- | --- | --- | --- |
|  |  |  |  |

## Solution hypotheses

Only include if evidence is not blocked by contradictions.

| Hypothesis | Supporting evidence | Confidence | Validation still needed |
| --- | --- | --- | --- |
|  |  |  |  |

## Recommended next actions

- 
```

## Interview Plan Template

```markdown
# Interview Plan: [Stakeholder / Objective]

## Objective

- 

## Stakeholder

- Role:
- Why this person:
- What this person should not be expected to decide:

## Current assumptions to test

- 

## Contradictions or confusion to resolve

| Topic | Current conflict or vague input | Question path |
| --- | --- | --- |
|  |  |  |

## Evidence needed

- 

## Opening script

- 

## Primary questions

1. 

## Exception and failure questions

1. 

## Ownership and decision questions

1. 

## Artifacts to request

- 

## Confidence and risk notes

- 

## Follow-up criteria

- 
```

## Interview Quality Rules

- Keep asking for examples until the answer is operationally specific.
- Capture exact terms used by the interviewee when they reveal local vocabulary.
- Do not resolve contradictions during synthesis unless the source clearly supports it.
- Record confidence when a statement is second-hand.
- Follow the artifact trail: ask for screenshots, forms, spreadsheets, system names, labels, and real barcode examples.
- Do not write recommendations from contradictory, vague, or source-poor evidence; write validation next steps first.
