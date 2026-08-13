import { graphifyState, root, today } from "./paths.mjs";

export function buildRecommendation(catalogJson, options = {}) {
  const mode = options.mode ?? "exploratory";
  const profile = buildProfile(options);
  const scored = catalogJson.skills
    .map((skill) => scoreRecommendation(skill, profile, mode))
    .sort((a, b) => b.score - a.score);

  const recommended = scored
    .filter((item) => item.recommendationAllowed && item.score > 0)
    .map((item, index) => recommendationItem(item, index + 1, profile, mode));

  const notRecommended = scored
    .filter((item) => !item.recommendationAllowed || item.score === 0)
    .map((item) => ({
      skill_id: item.skill.id,
      reason: item.score === 0 ? "No meaningful task/domain/runtime match for this POC profile." : `Blocked in ${mode} mode by ${item.blocked.join(", ")}.`
    }));

  const pack = catalogJson.packs.find((candidate) => candidate.id === "poc-repo-intelligence");
  const packEligible = pack && (pack.status === "approved" || pack.status === "in-use" || mode !== "standard");

  return {
    task: profile.goal,
    model: profile.model,
    runtime: profile.runtime,
    mode,
    initiative_profile: profile,
    recommended_pack: packEligible ? {
      pack_id: pack.id,
      name: pack.name,
      status: pack.status,
      reason: "Smallest pack that covers onboarding a known candidate, inspecting the repo graph, and interviewing initiative intent.",
      skills: pack.skills
    } : null,
    recommended,
    not_recommended: notRecommended,
    missing: [
      { gap: "No approved production-ready skill set exists yet; POC recommendations are exploratory." },
      { gap: "Internal operating skills are not part of the public library recommendation set." },
      { gap: "Rich guided-session rendering is still runtime-dependent; the POC emits JSON/text." },
      { gap: "Privacy-safe usage metrics are not implemented." }
    ],
    audit: {
      recommendation_id: `poc-${mode}-${today}`,
      catalog_version: catalogJson.catalog_version,
      router_version: "poc-0.1",
      generated_at: today
    }
  };
}

export function formatRecommendationText(recommendation, options = {}) {
  const limit = Number(options.limit ?? 5);
  const shown = recommendation.recommended.slice(0, limit);
  const lines = [
    "Skill recommendation",
    `- Task: ${recommendation.task}`,
    `- Mode: ${recommendation.mode}`,
    `- Model/runtime: ${recommendation.model}/${recommendation.runtime}`,
    `- Standard-ready skills: ${recommendation.recommended.filter((item) => item.eligibility.ready_for_standard_use).length}`,
    `- Exploratory matches: ${recommendation.recommended.length}`,
    "",
    "Recommended shortlist:"
  ];

  if (!shown.length) {
    lines.push("- No skills are ready to recommend for this profile.");
  }

  for (const item of shown) {
    const blockers = item.eligibility.blocking_risks.length
      ? ` Blockers: ${item.eligibility.blocking_risks.join(", ")}.`
      : "";
    lines.push(`- ${item.skill_id}: ${item.confidence}, score ${item.score}.${blockers}`);
    lines.push(`  ${item.reason}`);
  }

  if (recommendation.recommended.length > shown.length) {
    lines.push(`- ${recommendation.recommended.length - shown.length} lower-ranked exploratory matches hidden. Use --format json for full router output.`);
  }

  if (recommendation.missing.length) {
    lines.push("", "Important gaps:");
    for (const item of recommendation.missing.slice(0, 3)) lines.push(`- ${item.gap}`);
  }

  lines.push("", "Suggested next step:");
  if (shown.some((item) => item.eligibility.blocking_risks.includes("license:needs-review"))) {
    lines.push("- Resolve license review for the top candidate before treating it as approved.");
  } else if (shown.length) {
    lines.push(`- Pick one candidate to evaluate first: ${shown[0].skill_id}.`);
  } else {
    lines.push("- Clarify initiative goal, runtime, and work area, then rerun the recommendation.");
  }

  return lines.join("\n");
}

function buildProfile(options) {
  const goalText = options.task ?? options.interviewAnswers ?? options.answers;
  const inferred = inferProfile(goalText ?? "");
  return {
    id: options.profileId ?? "poc-repo-onboarding",
    goal: goalText ?? "Build the first local POC for the skills library.",
    desired_outcome: goalText ?? "Onboard a skill, compile catalog and graph data, recommend a skill set, and expose CLI output.",
    current_repo_state: options.repoState ?? "Documentation-first repository with Graphify repo map and POC planning docs.",
    missing_information: [
      "Production graph database choice is deferred.",
      "Human review gates are not complete.",
      "Reusable skill instructions are not implemented yet."
    ],
    domain: options.domain ?? inferred.domain,
    task_types: options.taskTypes ?? inferred.taskTypes,
    expected_artifacts: options.expectedArtifacts ?? ["catalog entry", "graph export", "router output"],
    model: options.model ?? "codex",
    runtime: options.runtime ?? "codex-cli",
    sensitivity: options.sensitivity ?? "internal",
    risk_level: options.riskLevel ?? "medium",
    urgency: options.urgency ?? "poc",
    constraints: options.constraints ?? ["local repo", "callable CLI", "no required package install for first POC"],
    repo: options.repo ?? root,
    graphify: options.graphify ?? graphifyState(options.repo ?? root)
  };
}

function inferProfile(task) {
  const lower = String(task).toLowerCase();
  if (/\b(feedback|wrong recommendation|bad output|stale skill|missing skill|model.runtime|privacy concern|security concern|license concern)\b/.test(lower)) {
    return { domain: "feedback", taskTypes: ["skill-feedback", "project-onboarding"] };
  }
  return { domain: "repository-analysis", taskTypes: ["project-onboarding", "codebase-navigation", "relationship-discovery"] };
}

function scoreRecommendation(skill, profile, mode) {
  const factors = scoreSkill(skill, profile);
  const eligible = skill.status === "approved" || skill.status === "in-use";
  const exploratoryAllowed = mode === "exploratory" || mode === "evaluation";
  const blocked = [];
  const licenseState = skill.trust?.license_state ?? "unknown";
  if (!eligible) blocked.push(`status:${skill.status}`);
  if (!["clear", "internal"].includes(licenseState)) blocked.push(`license:${licenseState}`);
  if (skill.risk?.level === "unknown" || skill.risk?.level === "blocking") blocked.push(`risk:${skill.risk.level}`);
  return { skill, score: factors.total, factors, eligible, recommendationAllowed: eligible || exploratoryAllowed, blocked };
}

function scoreSkill(skill, profile) {
  const domains = new Set(skill.domains ?? []);
  const taskTypes = new Set(skill.task_types ?? []);
  const runtimeMatch = findCompatibility(skill, profile);
  const domain = domains.has(profile.domain) ? 25 : profile.task_types.some((task) => taskTypes.has(task)) ? 15 : 0;
  const task = profile.task_types.reduce((sum, taskType) => sum + (taskTypes.has(taskType) ? 8 : 0), 0);
  const compatibility = { native: 25, compatible: 22, adapted: 18, partial: 12, unknown: 4, unsupported: -30 }[runtimeMatch?.support] ?? 0;
  const status = { "in-use": 18, approved: 16, evaluating: 8, candidate: 4, "needs-review": 2, deprecated: -20, rejected: -40 }[skill.status] ?? 0;
  const trustBase = { high: 12, medium: 9, low: 3, unknown: 1 }[skill.trust?.level] ?? 0;
  const trustLicense = { clear: 5, internal: 5, "needs-review": -2, restricted: -10, paid: -15, blocked: -30, unknown: -5 }[skill.trust?.license_state] ?? 0;
  const risk = { low: 10, medium: 4, high: -8, blocking: -40, unknown: -4 }[skill.risk?.level] ?? 0;
  const evidence = (skill.evaluation?.evidence_links ?? []).length > 0 ? 8 : 0;
  return { domain, task, compatibility, status, trust: trustBase + trustLicense, risk, evidence, total: domain + task + compatibility + status + trustBase + trustLicense + risk + evidence };
}

function recommendationItem(item, priority, profile, mode) {
  const skill = item.skill;
  const runtimeMatch = findCompatibility(skill, profile);
  return {
    skill_id: skill.id,
    priority,
    confidence: item.eligible ? "medium" : "exploratory",
    score: item.score,
    score_factors: item.factors,
    eligibility: {
      status: skill.status,
      mode,
      ready_for_standard_use: item.eligible,
      human_review_required: !item.eligible || item.blocked.length > 0,
      blocking_risks: item.blocked
    },
    matched_use_when: (skill.use_when ?? []).filter((text) => matchesProfile(text, profile)),
    matched_do_not_use_when: (skill.do_not_use_when ?? []).filter((text) => matchesProfile(text, profile)),
    compatibility: {
      model: profile.model,
      runtime: profile.runtime,
      support: runtimeMatch?.support ?? "unknown",
      evidence: runtimeMatch?.evidence ?? []
    },
    trust: skill.trust,
    risk: skill.risk,
    freshness: skill.freshness,
    install: skill.distribution?.install,
    invoke: skill.distribution?.invoke,
    reason: reasonFor(skill, item),
    conditions: item.eligible ? [] : ["Exploratory only until governance review is complete."],
    evidence: skill.evaluation?.evidence_links ?? [],
    alternatives: []
  };
}

function findCompatibility(skill, profile) {
  const rows = skill.compatibility?.matrix ?? [];
  return rows.find((row) => row.model_id === profile.model && row.runtime_id === profile.runtime)
    ?? rows.find((row) => row.model_id === "model-agnostic" && row.runtime_id === profile.runtime)
    ?? rows.find((row) => row.model_id === profile.model && row.runtime_id === "agent-skill-host")
    ?? rows.find((row) => row.model_id === "model-agnostic" && row.runtime_id === "agent-skill-host")
    ?? null;
}

function matchesProfile(text, profile) {
  const lower = text.toLowerCase();
  return [profile.domain, profile.runtime, ...profile.task_types, "repo", "graph", "initiative", "skill"].some((term) => lower.includes(term));
}

function reasonFor(skill, item) {
  if (skill.id === "graphify") return "Graphify is the repo-map candidate when the target repo has graph artifacts or can generate them locally.";
  if (skill.id === "initiative-skill-recommender") return "This skill captures initiative intent and turns it into router input for skill-set recommendation.";
  if (skill.id === "skill-library-onboarding") return "This skill covers the first POC step: onboarding a known candidate skill into the library.";
  if (skill.id === "skill-feedback-capture") return "This skill captures privacy-safe feedback with local repo context before issue submission.";
  if (skill.id === "skill-library") return "This skill is the wrapper that lets another repo call recommendations and feedback capture from the skills library.";
  return `Score ${item.score} from task, compatibility, governance, trust, risk, freshness, and evidence factors.`;
}
