# Governance Gates

Governance gates define when a skill may move between lifecycle states.

The library should prefer explicit `unknown` values during discovery, but approved and in-use skills need enough reviewed data to support routing safely.

## State Machine

```text
candidate -> evaluating -> approved -> in-use
candidate -> rejected
evaluating -> deferred
evaluating -> rejected
approved -> needs-review
in-use -> needs-review
needs-review -> approved
needs-review -> deprecated
approved -> deprecated
deprecated -> replaced
```

Use the canonical statuses from `catalog/taxonomies/statuses.yaml`.

## Candidate

Required:

- identity fields
- source
- summary
- proposer
- initial use cases
- initial compatibility guesses
- visible unknowns

Allowed:

- `unknown`
- `not-applicable`
- `needs-review`

## Evaluating

Required:

- owner
- evaluation issue
- target model/runtime
- at least one golden task or concrete test task
- initial trust/risk/license review
- evidence plan

## Approved

Required:

- owner is not `unassigned`
- source and license reviewed
- security/privacy/compliance risks reviewed
- compatibility known for at least one target model/runtime pair
- use-when and do-not-use-when guidance
- next review date
- decision outcome and rationale
- human review of license, risk, and pack inclusion

Blocked if:

- `license_state: unknown`
- `risk.level: unknown`
- `next_review: null`
- no compatibility evidence
- no owner

## In Use

Required:

- approved status
- pack inclusion or documented direct-use path
- install/invoke guidance
- feedback path
- review cadence

## Needs Review

Set when:

- review date passes
- upstream source changes materially
- model/runtime behavior changes
- feedback reports stale, unsafe, or wrong recommendations
- replacement candidate appears

## Deprecated

Required:

- reason
- replacement, if any
- migration guidance
- date deprecated

## Human Review Gates

Human review is required for:

- license state
- security risk
- privacy risk
- compliance risk
- owner
- final decision
- pack inclusion
- company-specific adaptation

