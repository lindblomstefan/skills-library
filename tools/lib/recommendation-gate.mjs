export function recommendationGate(options = {}, session = null) {
  const hasAnswers = hasText(options.interviewAnswers) || hasText(options.answers);
  const repoInspected = session?.repo_inspection?.inspected === true;
  const evidenceState = normalizeEvidenceState(options.evidenceState, { hasAnswers, repoInspected });
  const reasons = [];

  if (["vague", "contradictory", "unstable"].includes(evidenceState)) {
    reasons.push(`interview evidence is ${evidenceState}`);
  }
  if (!repoInspected && !hasAnswers) reasons.push("repo was not inspected and interview answers are missing");

  return {
    ready: reasons.length === 0,
    evidence_state: evidenceState,
    repo_inspected: repoInspected,
    has_interview_answers: hasAnswers,
    reasons
  };
}

export function buildRecommendationGate(gate, session) {
  return {
    schema: "recommendation-gate",
    status: "blocked",
    reason: "Recommendation needs a repo read or concrete interview answers before the router runs.",
    gate,
    interview: session
  };
}

export function formatRecommendationGateText(gate, session, formatSession) {
  const lines = [
    "Skill-library interview required",
    "",
    "I cannot recommend skills yet because:"
  ];
  for (const reason of gate.reasons) lines.push(`- ${reason}`);
  lines.push("", "Answer these first:");
  lines.push(formatSession(session));
  return lines.join("\n");
}

function normalizeEvidenceState(raw, context) {
  if (raw) return String(raw).toLowerCase();
  if (context.hasAnswers || context.repoInspected) return "stable";
  return "missing";
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}
