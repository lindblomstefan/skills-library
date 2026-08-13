#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { root } from "./lib/paths.mjs";

const sourceRules = {
  label: "source",
  maxLines: 450,
  warnLines: 300,
  extensions: new Set([".mjs", ".js", ".css", ".html"])
};

const docRules = {
  label: "docs",
  maxLines: 700,
  warnLines: 350,
  extensions: new Set([".md"])
};

const ignoredDirs = new Set([
  ".git",
  "dist",
  "graphify-out",
  "node_modules"
]);

const ignoredFiles = new Set(["package-lock.json"]);

function main() {
  const warnings = [];
  const errors = [];
  for (const relativePath of walk(root)) {
    const rules = rulesFor(relativePath);
    if (!rules) continue;
    const lineCount = countLines(path.join(root, relativePath));
    if (lineCount > rules.maxLines) {
      errors.push(`${relativePath}: ${lineCount} lines exceeds ${rules.label} hard limit ${rules.maxLines}`);
    } else if (lineCount > rules.warnLines) {
      warnings.push(`${relativePath}: ${lineCount} lines exceeds ${rules.label} warning limit ${rules.warnLines}`);
    }
  }

  for (const warning of warnings) console.warn(`warning: ${warning}`);
  if (errors.length) {
    for (const error of errors) console.error(`error: ${error}`);
    console.error("Split the file by responsibility before raising the limit. Generated data belongs in ignored output paths.");
    process.exit(1);
  }
  console.log(`guardrails passed (${warnings.length} warnings)`);
}

function rulesFor(relativePath) {
  const extension = path.extname(relativePath);
  if (sourceRules.extensions.has(extension)) return sourceRules;
  if (docRules.extensions.has(extension)) return docRules;
  return null;
}

function countLines(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  if (text.length === 0) return 0;
  return text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
}

function* walk(directory, parent = "") {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relativePath = path.join(parent, entry.name);
    if (ignoredFiles.has(relativePath)) continue;
    if (isIgnored(relativePath)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(fullPath, relativePath);
    else if (entry.isFile()) yield relativePath;
  }
}

function isIgnored(relativePath) {
  return [...ignoredDirs].some((ignored) => relativePath === ignored || relativePath.startsWith(`${ignored}${path.sep}`));
}

main();
