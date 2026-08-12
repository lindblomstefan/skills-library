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
  "context": {
    "domain": "ui-ux",
    "sensitivity": "unknown"
  },
  "recommended": [
    {
      "skill_id": "example-skill",
      "priority": 1,
      "confidence": "unknown",
      "reason": "Explain why this skill fits the task and runtime.",
      "conditions": []
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
  ]
}
```

## Consumers

The same output should support:

- CLI recommendations
- LLM skill selection
- future website assistant
- future dashboard metrics
- evaluation workflows

