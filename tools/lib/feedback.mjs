import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { currentCommit, graphifyState, root } from "./paths.mjs";

const feedbackSignals = new Set([
  "worked-well",
  "wrong-recommendation",
  "skill-stale",
  "skill-missing",
  "model-runtime-mismatch",
  "bad-output",
  "security-concern",
  "privacy-concern",
  "license-concern",
  "better-replacement-exists"
]);

const severities = new Set(["low", "medium", "high", "blocking", "unknown"]);

export function collectFeedback(options = {}) {
  const repo = path.resolve(options.repo ?? process.cwd());
  const skillId = requireOption(options, "skillId", "Use --skill-id <id>.");
  const signal = normalizeEnum(options.signal ?? "bad-output", feedbackSignals, "signal");
  const severity = normalizeEnum(options.severity ?? "unknown", severities, "severity");
  const taskType = options.taskType ?? "unknown";
  const occurredAt = new Date().toISOString();
  const feedbackId = `fb-${occurredAt.slice(0, 10)}-${crypto.randomBytes(4).toString("hex")}`;
  const redaction = redactNotes(options.notes ?? "");
  const event = {
    feedback_id: feedbackId,
    occurred_at: occurredAt,
    skill_id: skillId,
    pack_id: options.packId ?? null,
    recommendation_id: options.recommendationId ?? null,
    session_id: options.sessionId ?? null,
    catalog_version: currentCommit(),
    router_version: options.routerVersion ?? "poc-0.1",
    signal,
    model: options.model ?? "unknown",
    runtime: options.runtime ?? "unknown",
    task_type: taskType,
    severity,
    notes: redaction.notes,
    privacy: {
      sensitivity: options.sensitivity ?? "internal",
      redaction_status: redaction.status,
      retention: options.retention ?? "review-window",
      actor_pseudonymized: true,
      contains_prompt: redaction.containsPrompt,
      contains_code: redaction.containsCode,
      contains_secret: redaction.containsSecret
    },
    repo_context: buildRepoContext(repo),
    usage_context: {
      selected_by: options.selectedBy ?? "unknown",
      expected_outcome: redactNotes(options.expectedOutcome ?? "").notes,
      actual_outcome: redactNotes(options.actualOutcome ?? "").notes
    },
    diagnosis: {
      likely_cause: options.likelyCause ?? "unknown",
      suggested_action: options.suggestedAction ?? "review-feedback"
    },
    created_issue: null,
    created_comment: null
  };

  const outputPath = options.out
    ? path.resolve(options.out)
    : path.join(repo, ".skills-library", "feedback", `${feedbackId}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(event, null, 2)}\n`);
  return { event, outputPath };
}

export function previewFeedback(filePath) {
  const event = readFeedback(filePath);
  validateFeedbackEvent(event);
  return {
    feedback_id: event.feedback_id,
    skill_id: event.skill_id,
    signal: event.signal,
    severity: event.severity,
    task_type: event.task_type,
    repo_context: event.repo_context,
    privacy: event.privacy,
    notes: event.notes,
    suggested_action: event.diagnosis?.suggested_action ?? "review-feedback"
  };
}

export function readFeedback(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function buildRepoContext(repo) {
  const graphify = graphifyState(repo);
  return {
    repo_fingerprint: hash(repo),
    repo_label: path.basename(repo),
    repo_label_sensitivity: "review-before-submission",
    git: {
      branch: git(repo, ["rev-parse", "--abbrev-ref", "HEAD"]),
      commit: git(repo, ["rev-parse", "HEAD"]),
      dirty_count: dirtyCount(repo)
    },
    stack: detectStack(repo),
    languages: languageSummary(repo),
    ci: detectCi(repo),
    graphify: {
      available: graphify.available,
      nodes: graphify.nodes ?? 0,
      edges: graphify.edges ?? 0,
      summary: graphify.summary
    }
  };
}

function detectStack(repo) {
  const markers = [
    ["package.json", "node"],
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lockb", "bun"],
    ["pyproject.toml", "python"],
    ["requirements.txt", "python"],
    ["go.mod", "go"],
    ["Cargo.toml", "rust"],
    ["pom.xml", "java-maven"],
    ["build.gradle", "java-gradle"],
    ["Dockerfile", "docker"]
  ];
  return markers.filter(([file]) => fs.existsSync(path.join(repo, file))).map(([, label]) => label);
}

function detectCi(repo) {
  return {
    github_actions: fs.existsSync(path.join(repo, ".github", "workflows")),
    package_scripts: packageScripts(repo),
    test_paths_present: ["test", "tests", "__tests__", "spec"].some((dir) => fs.existsSync(path.join(repo, dir)))
  };
}

function packageScripts(repo) {
  const packagePath = path.join(repo, "package.json");
  if (!fs.existsSync(packagePath)) return [];
  try {
    return Object.keys(JSON.parse(fs.readFileSync(packagePath, "utf8")).scripts ?? {}).sort();
  } catch {
    return [];
  }
}

function languageSummary(repo) {
  const counts = {};
  walkFiles(repo, (file) => {
    const extension = path.extname(file).slice(1);
    if (!extension) return;
    counts[extension] = (counts[extension] ?? 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([extension, count]) => ({ extension, count }));
}

function walkFiles(repo, visit, parent = "") {
  if (parent.split(path.sep).some((part) => [".git", "node_modules", "dist", "build", "graphify-out"].includes(part))) return;
  for (const entry of fs.readdirSync(path.join(repo, parent), { withFileTypes: true })) {
    const relativePath = path.join(parent, entry.name);
    if (entry.isDirectory()) walkFiles(repo, visit, relativePath);
    else if (entry.isFile()) visit(relativePath);
  }
}

function redactNotes(value) {
  let notes = String(value ?? "").slice(0, 1200);
  const containsCode = /```|function\s+\w+|class\s+\w+|import\s+.+from/.test(notes);
  const secretPattern = /(api[_-]?key|token|secret|password)\s*[:=]\s*["']?[\w./+=-]+/gi;
  const containsSecret = secretPattern.test(notes);
  notes = notes.replace(secretPattern, "$1=[REDACTED]");
  if (containsCode) notes = notes.replace(/```[\s\S]*?```/g, "[REDACTED_CODE_BLOCK]");
  return {
    notes,
    status: containsCode || containsSecret ? "redacted" : "clean",
    containsPrompt: false,
    containsCode,
    containsSecret
  };
}

export function validateFeedbackEvent(event) {
  const required = ["feedback_id", "occurred_at", "skill_id", "signal", "model", "runtime", "task_type", "catalog_version"];
  const missing = required.filter((field) => event[field] === undefined || event[field] === null || event[field] === "");
  if (missing.length) throw new Error(`Feedback event missing required fields: ${missing.join(", ")}`);
  if (!feedbackSignals.has(event.signal)) throw new Error(`Invalid feedback signal '${event.signal}'`);
  if (!severities.has(event.severity ?? "unknown")) throw new Error(`Invalid severity '${event.severity}'`);
  if (event.privacy?.contains_prompt || event.privacy?.contains_code || event.privacy?.contains_secret) {
    throw new Error("Feedback event privacy flags indicate unsafe content. Redact before submission.");
  }
}

export function buildIssueBody(event) {
  return [
    "## Feedback",
    "",
    `- Feedback id: ${event.feedback_id}`,
    `- Skill id: ${event.skill_id}`,
    `- Signal: ${event.signal}`,
    `- Severity: ${event.severity}`,
    `- Task type: ${event.task_type}`,
    `- Model/runtime: ${event.model}/${event.runtime}`,
    `- Recommendation id: ${event.recommendation_id ?? "none"}`,
    "",
    "## Repo Context",
    "",
    `- Repo fingerprint: ${event.repo_context?.repo_fingerprint}`,
    `- Stack: ${(event.repo_context?.stack ?? []).join(", ") || "unknown"}`,
    `- CI: ${JSON.stringify(event.repo_context?.ci ?? {})}`,
    `- Graphify: ${event.repo_context?.graphify?.summary ?? "unknown"}`,
    "",
    "## Redacted Notes",
    "",
    event.notes || "_No notes provided._",
    "",
    "## Suggested Action",
    "",
    event.diagnosis?.suggested_action ?? "review-feedback",
    "",
    "## Privacy",
    "",
    `- Redaction: ${event.privacy?.redaction_status}`,
    `- Contains prompt/code/secret: ${event.privacy?.contains_prompt}/${event.privacy?.contains_code}/${event.privacy?.contains_secret}`
  ].join("\n");
}

function dirtyCount(repo) {
  const output = git(repo, ["status", "--short"]);
  return output ? output.split("\n").filter(Boolean).length : 0;
}

function git(repo, args) {
  try {
    return execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

function hash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}

function normalizeEnum(value, allowed, label) {
  const normalized = String(value);
  if (!allowed.has(normalized)) throw new Error(`Invalid ${label} '${value}'. Allowed: ${[...allowed].join(", ")}`);
  return normalized;
}

function requireOption(options, key, message) {
  const value = options[key];
  if (value === undefined || value === null || value === "") throw new Error(message);
  return String(value);
}
