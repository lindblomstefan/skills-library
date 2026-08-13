#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root } from "./lib/paths.mjs";

const validator = "/Users/husqvarna/.claude/skills/.system/skill-creator/scripts/quick_validate.py";
const skillsRoot = path.join(root, ".claude", "skills");

if (!fs.existsSync(skillsRoot)) {
  console.log("no .claude/skills directory found");
  process.exit(0);
}

const skills = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(skillsRoot, entry.name))
  .filter((skillPath) => fs.existsSync(path.join(skillPath, "SKILL.md")))
  .sort();

if (!fs.existsSync(validator)) {
  console.log(`skill validator not installed, skipping python check (${skills.length} skills found)`);
  process.exit(0);
}

for (const skillPath of skills) {
  execFileSync("python3", [validator, skillPath], { cwd: root, stdio: "inherit" });
}

console.log(`validated ${skills.length} skills`);
