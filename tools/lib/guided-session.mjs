import fs from "node:fs";
import path from "node:path";
import { graphifyState, root, today } from "./paths.mjs";

export function buildGuidedSession(options = {}) {
  const kind = options.kind ?? "recommendation";
  const repo = path.resolve(options.repo ?? root);
  const repoExists = fs.existsSync(repo);
  const repoConsent = normalizeConsent(options);
  const inspectRepo = repoExists && repoConsent === "accepted";
  const repoContext = inspectRepo ? buildRepoContext(repo) : null;
  const inferred = inferFromContext(repoContext, options);
  const questions = buildQuestions({ kind, repoExists, repoConsent, repoContext, inferred, options });

  return {
    schema: "guided-session",
    version: "0.1",
    session_id: `guided-${kind}-${today}`,
    kind,
    repo,
    repo_exists: repoExists,
    repo_inspection: {
      consent: repoConsent,
      inspected: inspectRepo,
      scope: inspectRepo ? repoContext.inspection_scope : []
    },
    repo_context: repoContext,
    inferred_profile: inferred,
    questions,
    next_actions: nextActions(kind, repoConsent, questions),
    privacy: {
      stores_raw_prompts: false,
      stores_source_code: false,
      public_submission_allowed: false,
      note: "This session output is local. Public issues or PRs need separate redaction and approval."
    }
  };
}

export function formatGuidedSessionText(session) {
  const lines = [
    `Skill-library interview: ${session.kind}`,
    `Target repo: ${session.repo_exists ? session.repo : "missing"}`,
    `Repo inspection: ${session.repo_inspection.consent}${session.repo_inspection.inspected ? " (done)" : ""}`,
    ""
  ];

  if (session.repo_context) {
    lines.push("Repo context:");
    lines.push(`- name: ${session.repo_context.name}`);
    lines.push(`- stack: ${session.repo_context.stack.join(", ") || "unknown"}`);
    lines.push(`- graphify: ${session.repo_context.graphify.available ? "available" : "missing"}`);
    lines.push("");
  }

  lines.push("Answer these so I can recommend skills:");
  session.questions.forEach((question, index) => {
    lines.push(`${index + 1}. ${question.question}`);
    lines.push(`   Choices: ${question.choices.map((choice) => choice.label).join(" | ")}`);
    if (question.allow_free_text) lines.push("   You can also answer in your own words.");
  });

  if (session.repo_inspection.consent === "unknown") {
    lines.push("", "Guidance:");
    lines.push("- If you choose Inspect repo, I will read safe local metadata first and then refine the recommendation.");
    lines.push("- If you choose Questions only, I will recommend from your answers without reading files.");
  }

  if (session.next_actions.length) {
    lines.push("", "Next actions:");
    for (const action of session.next_actions) lines.push(`- ${action}`);
  }
  return lines.join("\n");
}

function normalizeConsent(options) {
  if (options.inspectRepo === true || options.inspectRepo === "true") return "accepted";
  const raw = options.repoConsent ?? options.repoRead ?? "unknown";
  if (["accepted", "yes", "true"].includes(String(raw))) return "accepted";
  if (["denied", "no", "false"].includes(String(raw))) return "denied";
  return "unknown";
}

function buildRepoContext(repo) {
  const entries = safeReadDir(repo);
  const packageJson = readPackageJson(repo);
  return {
    name: packageJson?.name ?? path.basename(repo),
    fingerprint: repoFingerprint(repo, entries),
    top_level_files: entries.slice(0, 40),
    stack: detectStack(entries, packageJson),
    package_scripts: Object.keys(packageJson?.scripts ?? {}).slice(0, 20),
    graphify: graphifyState(repo),
    language_counts: languageCounts(repo),
    inspection_scope: [
      "top-level file names",
      "package metadata and scripts",
      "language/file extension counts",
      "Graphify availability"
    ]
  };
}

function buildQuestions(input) {
  const questions = [];
  if (input.repoConsent === "unknown") questions.push(repoConsentQuestion());
  if (!input.repoExists) questions.push(repoMissingQuestion());
  if (input.kind === "onboarding") questions.push(...onboardingQuestions(input));
  else questions.push(...recommendationQuestions(input));
  questions.push(chatQuestion());
  return questions;
}

function repoConsentQuestion() {
  return question("repo_inspection", "May I inspect this repo before asking follow-up questions?", [
    choice("inspect-repo", "Inspect repo", "Use safe local metadata to reduce unnecessary questions."),
    choice("questions-only", "Questions only", "Skip repo reads and answer the interview manually."),
    choice("chat-about-this", "Chat about this", "Discuss scope or privacy concerns before deciding.")
  ], { blocks: true });
}

function repoMissingQuestion() {
  return question("repo_state", "What repo state should this session assume?", [
    choice("empty", "No repo yet", "Plan from intent only."),
    choice("new", "New repo", "Assume structure is still forming."),
    choice("existing-elsewhere", "Existing elsewhere", "Use user-provided summary instead of local reads.")
  ]);
}

function recommendationQuestions({ repoContext, inferred, options }) {
  const questions = [];
  if (!options.task) {
    questions.push(question("initiative_goal", "What outcome should this initiative produce?", [
      choice("choose-skills", "Choose skills", "Recommend a skill set for upcoming work."),
      choice("understand-repo", "Understand repo", "Prioritize repo navigation and architecture help."),
      choice("improve-quality", "Improve quality", "Prioritize testing, security, and guardrails.")
    ], { blocks: true }));
  }
  if (!repoContext || inferred.domain === "unknown") {
    questions.push(question("work_area", "Which work area is closest?", [
      choice("architecture", "Architecture", "Architecture, boundaries, or decisions."),
      choice("security", "Security", "Threats, privacy, compliance, or review."),
      choice("frontend", "Frontend", "UI, UX, or app surface.")
    ]));
  }
  questions.push(question("sensitivity", "How sensitive is the repo or initiative context?", [
    choice("internal", "Internal", "Redacted summaries are acceptable locally."),
    choice("confidential", "Confidential", "Keep details local and avoid public issue content."),
    choice("public", "Public", "Public summaries are acceptable after review.")
  ], { blocks: true }));
  questions.push(question("runtime", "Where should recommended skills run?", [
    choice(options.runtime ?? "agent-skill-host", runtimeLabel(options.runtime), "Use a model-agnostic skill runtime."),
    choice("codex-cli", "Codex CLI", "Use this repo's tested local CLI flow."),
    choice("other", "Other runtime", "Capture compatibility as unknown until tested.")
  ]));
  return questions;
}

function onboardingQuestions({ options }) {
  return [
    question("candidate_source", "Where is the skill candidate or source material?", [
      choice(options.candidate ?? "url-or-path", options.candidate ? "Use provided candidate" : "URL or path", "Evaluate a specific candidate."),
      choice("build-internal", "Build internal", "Create a new internal skill from this repo's workflow."),
      choice("chat-about-this", "Chat about this", "Clarify what counts as the candidate.")
    ], { blocks: true }),
    question("license", "What license state is known before evaluation?", [
      choice("clear", "Clear", "License is identified and compatible."),
      choice("needs-review", "Needs review", "Block approval until a human checks it."),
      choice("unknown", "Unknown", "Record the gap and keep the skill unapproved.")
    ], { blocks: true }),
    question("copying", "Will onboarding copy, adapt, or only reference the candidate?", [
      choice("reference-only", "Reference only", "Catalog metadata links to the source."),
      choice("adapt", "Adapt", "Create internal instructions based on reviewed material."),
      choice("copy-assets", "Copy assets", "Requires license and provenance review.")
    ], { blocks: true }),
    question("pr_package", "What should the onboarding PR include?", [
      choice("manifest-only", "Manifest only", "Catalog metadata and open questions."),
      choice("manifest-eval", "Manifest + eval", "Add evaluation notes and compatibility evidence."),
      choice("full-skill", "Full skill", "Add skill files, catalog entry, and evaluation evidence.")
    ])
  ];
}

function chatQuestion() {
  return question("chat_about_this", "Do you want to chat about the recommendation or onboarding direction before continuing?", [
    choice("continue", "Continue", "Answer the structured questions."),
    choice("chat", "Chat about this", "Discuss concerns or constraints first.")
  ]);
}

function question(id, text, choices, options = {}) {
  return {
    id,
    question: text,
    why_it_matters: options.why ?? "This answer changes what the skill can safely infer or recommend.",
    choices,
    allow_free_text: true,
    evidence_needed: options.evidence ?? [],
    blocks_recommendation: options.blocks === true
  };
}

function choice(value, label, description) {
  return { value, label, description };
}

function runtimeLabel(runtime) {
  if (!runtime || runtime === "agent-skill-host") return "Agent skill host";
  if (runtime === "codex-cli") return "Codex CLI";
  return String(runtime);
}

function inferFromContext(repoContext, options) {
  if (!repoContext) {
    return {
      goal: options.task ?? "unknown",
      domain: options.domain ?? "unknown",
      task_types: options.taskTypes ?? [],
      missing_information: ["Repo context not inspected."]
    };
  }
  const stack = new Set(repoContext.stack);
  const domain = options.domain ?? (stack.has("frontend") ? "ui-ux" : "repository-analysis");
  return {
    goal: options.task ?? "Recommend a skill set from repo context and user intent.",
    domain,
    task_types: options.taskTypes ?? ["project-onboarding", "codebase-navigation"],
    missing_information: ["User intent", "sensitivity", "target runtime"]
  };
}

function nextActions(kind, repoConsent, questions) {
  if (repoConsent === "unknown") return ["Ask the repo inspection consent question first."];
  if (questions.some((questionItem) => questionItem.blocks_recommendation)) {
    return ["Resolve blocking questions before recommending skills or preparing a PR."];
  }
  if (kind === "onboarding") return ["Prepare a branch and PR package; never direct-push onboarding changes to main."];
  return ["Convert answers into an initiative profile and run the router."];
}

function safeReadDir(repo) {
  try {
    return fs.readdirSync(repo).filter((name) => !name.startsWith(".git")).sort();
  } catch {
    return [];
  }
}

function readPackageJson(repo) {
  try {
    return JSON.parse(fs.readFileSync(path.join(repo, "package.json"), "utf8"));
  } catch {
    return null;
  }
}

function detectStack(entries, packageJson) {
  const names = new Set(entries);
  const stack = [];
  if (packageJson) stack.push("node");
  if (names.has("vite.config.js") || names.has("vite.config.ts")) stack.push("frontend");
  if (names.has("pyproject.toml") || names.has("requirements.txt")) stack.push("python");
  if (names.has("Dockerfile") || names.has("docker-compose.yml")) stack.push("containers");
  if (names.has("graphify-out")) stack.push("knowledge-graph");
  return stack;
}

function languageCounts(repo) {
  const counts = {};
  for (const name of safeReadDir(repo)) {
    const extension = path.extname(name).slice(1) || "none";
    counts[extension] = (counts[extension] ?? 0) + 1;
  }
  return counts;
}

function repoFingerprint(repo, entries) {
  return `${path.basename(repo)}:${entries.length}`;
}
