# Router Output

The router is the machine-readable layer that helps an LLM, CLI, or future website decide what skill to use.

The router should optimize for recommendation quality, not catalog size.

## Output Principles

- Rank recommendations.
- Explain why each skill is recommended.
- Include negative recommendations when a skill may look relevant but should not be used.
- Include model and runtime constraints.
- Surface missing skills or missing evidence.
- Prefer explicit `unknown` over silent omission.

## Minimal Output Shape

```json
{
  "task": "review a frontend pull request",
  "model": "codex",
  "runtime": "codex-cli",
  "mode": "standard",
  "context": {
    "domain": "ui-ux",
    "sensitivity": "unknown"
  },
  "recommended": [
    {
      "skill_id": "example-skill",
      "priority": 1,
      "confidence": "exploratory",
      "score": 0,
      "score_factors": {
        "compatibility": "unknown",
        "status": "candidate",
        "trust": "unknown",
        "risk": "unknown",
        "freshness": "unknown",
        "evidence": "missing"
      },
      "eligibility": {
        "status": "candidate",
        "human_review_required": true,
        "blocking_risks": []
      },
      "matched_use_when": [],
      "matched_do_not_use_when": [],
      "compatibility": {
        "model": "codex",
        "runtime": "codex-cli",
        "support": "unknown",
        "evidence": []
      },
      "reason": "Explain why this skill fits the task and runtime.",
      "conditions": [],
      "evidence": []
    }
  ],
  "not_recommended": [
    {
      "skill_id": "other-skill",
      "reason": "Explain why this should not be used here."
    }
  ],
  "missing": [
    {
      "gap": "No approved skill exists for this task/runtime combination."
    }
  ],
  "audit": {
    "recommendation_id": "example-recommendation",
    "catalog_version": "unknown",
    "router_version": "unknown"
  }
}
```

## Recommendation Modes

- `standard`: recommend only items that pass governance gates for the context.
- `exploratory`: may surface candidates, unknown-risk skills, or unapproved skills with explicit warnings.
- `evaluation`: supports comparing or testing skills and should emphasize evidence gaps.

## Recommendation Evidence

Each recommendation should include:

- score and score factors
- matched use-when guidance
- matched do-not-use-when guidance
- compatibility verdict
- trust state
- risk state
- freshness state
- evidence links
- install and invoke guidance when available
- human-review requirements
- alternatives

## Consumers

The same output should support:

- CLI recommendations
- LLM skill selection
- future website assistant
- future dashboard metrics
- evaluation workflows
