# Privacy And Metrics

Usage and feedback data should support future dashboards without becoming a source of sensitive content.

## Principle

Collect the minimum event data needed for metrics and routing improvement. Do not store prompts, source code, secrets, personal data, customer data, or proprietary project details in usage or feedback events.

## Allowed Event Data

- skill id
- pack id
- model id
- runtime id
- task type
- event type
- recommendation id
- catalog version
- router version
- timestamp
- pseudonymous session id, if needed
- selected recommendation rank
- feedback signal
- severity
- redacted notes

## Prohibited Event Data

- raw prompts
- source code
- credentials or secrets
- personal data
- customer data
- confidential project names unless explicitly approved
- unredacted transcripts

## Privacy Fields

Usage and feedback events should include:

- `sensitivity`
- `redaction_status`
- `retention`
- `actor_pseudonymized`
- `contains_prompt`
- `contains_code`
- `contains_secret`

The expected value for `contains_prompt`, `contains_code`, and `contains_secret` is `false`.

