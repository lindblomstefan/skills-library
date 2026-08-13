#!/usr/bin/env node
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { root } from "./lib/paths.mjs";

const node = process.execPath;
const cli = "bin/skills-library.mjs";

assertIncludes(
  run(["assist", "--repo", ".", "--format", "text"]),
  "1. Tell me about the idea:",
  "assist should start with open initiative context"
);

assertIncludes(
  run(["assist", "--repo", ".", "--task", "choose skills for a repo", "--format", "text"]),
  "1. Tell me about the idea:",
  "assist should keep the open context question first even when a task string exists"
);

assertIncludes(
  run(["assist", "--repo", ".", "--format", "text"]),
  "2. May I inspect this repo to ground the follow-up questions and recommendations?",
  "assist should ask repo-inspection consent after context"
);

assertIncludes(
  run(["recommend", "--task", "choose skills for a repo", "--format", "text"]),
  "Skill-library interview required",
  "recommend should be gated without interview evidence"
);

assertIncludes(
  run(["recommend", "--task", "choose skills for a repo", "--interview-complete", "--format", "text"]),
  "repo was not inspected and interview answers are missing",
  "interview-complete alone should not bypass the evidence gate"
);

assertIncludes(
  run(["recommend", "--task", "choose skills for a repo", "--interview-answers", "Goal: improve repo navigation. Area: architecture. Sensitivity: internal.", "--format", "text"]),
  "Recommended shortlist:",
  "recommend should run after concrete interview answers are supplied"
);

assertIncludes(
  run(["recommend", "--interview-answers", "Idea: build a developer portal. Goal: help teams find reusable skills. End product: CLI-guided recommendations.", "--format", "text"]),
  "Recommended shortlist:",
  "recommend should accept concrete interview answers without a separate task flag"
);

assertIncludes(
  run(["recommend", "--repo", ".", "--repo-consent", "accepted", "--format", "text"]),
  "Recommended shortlist:",
  "recommend should run after repo inspection consent causes a repo read"
);

assertIncludes(
  run(["recommend", "--repo", ".", "--repo-consent", "accepted", "--evidence-state", "contradictory", "--format", "text"]),
  "interview evidence is contradictory",
  "contradictory evidence should block recommendations even after repo read"
);

const skillText = readText(".codex/skills/skill-library/SKILL.md");
assertNotIncludes(skillText, "Include repo-inspection consent as the first question", "skill instructions should not put repo consent first");
assertNotIncludes(skillText, "Start with repo-inspection consent", "skill instructions should not put repo consent first");
if (skillText.split("\n").length > 90) {
  console.error("error: skill-library SKILL.md is too long for deterministic invocation");
  process.exit(1);
}

for (const file of [
  "README.md",
  "docs/cli-usage.md",
  "docs/poc-plan.md",
  ".codex/skills/skill-library/SKILL.md",
  ".codex/skills/skill-library/references/catalog-overview.md",
  ".codex/skills/skill-library/agents/openai.yaml"
]) {
  const text = readText(file);
  for (const forbidden of [
    "repo-inspection consent as the first question",
    "Start with repo-inspection consent",
    "first question is always whether repo inspection",
    "first action is always a repo-inspection",
    "Ask the repo inspection consent question first"
  ]) {
    assertNotIncludes(text, forbidden, `${file} should keep the interview sequence stable`);
  }
}

console.log("cli flow checks passed");

function run(args) {
  return execFileSync(node, [cli, ...args], { cwd: root, encoding: "utf8" });
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) {
    console.error(`error: ${label}`);
    console.error(`expected output to include: ${expected}`);
    process.exit(1);
  }
}

function assertNotIncludes(text, unexpected, label) {
  if (text.includes(unexpected)) {
    console.error(`error: ${label}`);
    console.error(`unexpected output included: ${unexpected}`);
    process.exit(1);
  }
}

function readText(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}
