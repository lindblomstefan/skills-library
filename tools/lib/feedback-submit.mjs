import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { buildIssueBody, readFeedback, validateFeedbackEvent } from "./feedback.mjs";
import { root } from "./paths.mjs";

export function submitFeedback(options = {}) {
  const filePath = requireOption(options, "file", "Use --file <feedback.json>.");
  const target = options.target ?? "issue";
  if (target === "push" || target === "main") throw new Error("Direct push is blocked. Use --target issue or --target pr after preview.");
  const event = readFeedback(filePath);
  validateFeedbackEvent(event);
  if (target === "issue") return submitIssue(event, filePath, options);
  if (target === "pr") return submitPullRequest(event, options);
  throw new Error(`Unsupported submit target '${target}'. Use issue or pr.`);
}

function submitIssue(event, filePath, options) {
  const targetRepo = requireOption(options, "targetRepo", "Use --target-repo owner/repo.");
  if (options.dryRun) return issuePlan(event, targetRepo);
  requireApproval(options);
  const issue = findOrCreateSkillFeedbackIssue(event, targetRepo);
  const comment = execFileSync("gh", [
    "issue",
    "comment",
    String(issue.number),
    "--repo",
    targetRepo,
    "--body",
    buildFeedbackComment(event)
  ], { encoding: "utf8" }).trim();
  event.created_issue = issue.url;
  event.created_comment = comment || `issue:${issue.number}`;
  fs.writeFileSync(filePath, `${JSON.stringify(event, null, 2)}\n`);
  return event.created_comment;
}

function submitPullRequest(event, options) {
  const targetRepo = requireOption(options, "targetRepo", "Use --target-repo owner/repo.");
  const libraryRepo = path.resolve(options.libraryRepo ?? root);
  const branch = options.branch ?? `feedback/${event.feedback_id}`;
  const targetPath = path.join(libraryRepo, "feedback", "incoming", `${event.feedback_id}.json`);
  const title = `Feedback: ${event.skill_id} / ${event.signal}`;
  if (options.dryRun) return prPlan({ event, targetRepo, libraryRepo, branch, targetPath, title });
  requireApproval(options);
  ensureCleanGit(libraryRepo);
  const originalBranch = git(libraryRepo, ["rev-parse", "--abbrev-ref", "HEAD"]);
  try {
    git(libraryRepo, ["switch", "-c", branch]);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, `${JSON.stringify(event, null, 2)}\n`);
    git(libraryRepo, ["add", path.relative(libraryRepo, targetPath)]);
    git(libraryRepo, ["commit", "-m", title]);
    git(libraryRepo, ["push", "-u", "origin", branch]);
    return execFileSync("gh", [
      "pr",
      "create",
      "--repo",
      targetRepo,
      "--head",
      branch,
      "--title",
      title,
      "--body",
      buildPrBody(event)
    ], { cwd: libraryRepo, encoding: "utf8" }).trim();
  } finally {
    if (originalBranch && originalBranch !== "unknown") git(libraryRepo, ["switch", originalBranch], { allowFailure: true });
  }
}

function buildPrBody(event) {
  return [
    "## Feedback PR",
    "",
    "This PR adds one reviewed feedback event under `feedback/incoming/`.",
    "",
    buildIssueBody(event)
  ].join("\n");
}

function findOrCreateSkillFeedbackIssue(event, targetRepo) {
  const title = skillFeedbackTitle(event.skill_id);
  const existing = findSkillFeedbackIssue(title, targetRepo);
  if (existing) return existing;
  const url = execFileSync("gh", [
    "issue",
    "create",
    "--repo",
    targetRepo,
    "--title",
    title,
    "--body",
    buildSkillFeedbackIssueBody(event.skill_id),
    "--label",
    "feedback"
  ], { encoding: "utf8" }).trim();
  const created = findSkillFeedbackIssue(title, targetRepo);
  return created ?? { number: url.split("/").pop(), url };
}

function findSkillFeedbackIssue(title, targetRepo) {
  const output = execFileSync("gh", [
    "issue",
    "list",
    "--repo",
    targetRepo,
    "--state",
    "open",
    "--search",
    title,
    "--json",
    "number,title,url"
  ], { encoding: "utf8" });
  const issues = JSON.parse(output);
  return issues.find((issue) => issue.title === title) ?? null;
}

function buildSkillFeedbackIssueBody(skillId) {
  return [
    `This issue collects redacted feedback events for skill \`${skillId}\`.`,
    "",
    "Each feedback event should be added as a comment.",
    "",
    "Rules:",
    "- No raw prompts, source code, secrets, personal data, customer data, or unredacted transcripts.",
    "- Use comments for feedback signals and diagnosis.",
    "- Open a PR when feedback requires catalog, skill, router, or schema changes."
  ].join("\n");
}

function buildFeedbackComment(event) {
  return [
    `### Feedback Event: ${event.feedback_id}`,
    "",
    buildIssueBody(event)
  ].join("\n");
}

function skillFeedbackTitle(skillId) {
  return `Feedback: ${skillId}`;
}

function prPlan({ event, targetRepo, libraryRepo, branch, targetPath, title }) {
  return JSON.stringify({
    mode: "dry-run",
    target: "pr",
    target_repo: targetRepo,
    library_repo: libraryRepo,
    branch,
    target_path: targetPath,
    title,
    feedback_id: event.feedback_id,
    direct_push_to_main: false
  }, null, 2);
}

function issuePlan(event, targetRepo) {
  return JSON.stringify({
    mode: "dry-run",
    target: "issue-comment",
    target_repo: targetRepo,
    issue_title: skillFeedbackTitle(event.skill_id),
    comment_feedback_id: event.feedback_id,
    creates_issue_if_missing: true,
    direct_push_to_main: false
  }, null, 2);
}

function ensureCleanGit(repo) {
  const dirty = git(repo, ["status", "--short"]);
  if (dirty) throw new Error("PR submission requires a clean skills-library working tree. Commit or stash local changes first.");
}

function requireApproval(options) {
  if (!options.yes) throw new Error("Submission requires explicit --yes after previewing the feedback file.");
}

function git(repo, args, options = {}) {
  try {
    return execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim();
  } catch (error) {
    if (options.allowFailure) return "unknown";
    throw error;
  }
}

function requireOption(options, key, message) {
  const value = options[key];
  if (value === undefined || value === null || value === "") throw new Error(message);
  return String(value);
}
