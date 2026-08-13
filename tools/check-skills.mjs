#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root } from "./lib/paths.mjs";

const validator = "/Users/husqvarna/.codex/skills/.system/skill-creator/scripts/quick_validate.py";
const skillsRoot = path.join(root, ".codex", "skills");

if (!fs.existsSync(skillsRoot)) {
  console.log("no .codex/skills directory found");
  process.exit(0);
}

const skills = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(skillsRoot, entry.name))
  .filter((skillPath) => fs.existsSync(path.join(skillPath, "SKILL.md")))
  .sort();

for (const skillPath of skills) {
  execFileSync("python3", [validator, skillPath], { cwd: root, stdio: "inherit" });
}

console.log(`validated ${skills.length} skills`);
