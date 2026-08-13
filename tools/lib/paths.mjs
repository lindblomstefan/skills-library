import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const today = "2026-08-13";

export const dirs = {
  librarySkills: "catalog/library-skills",
  internalSkills: "catalog/internal-skills",
  packs: "catalog/packs",
  internalPacks: "catalog/internal-packs",
  taxonomies: "catalog/taxonomies",
  goldenTasks: "catalog/golden-tasks",
  evaluationRuns: "evaluations/runs",
  dist: "dist",
  graph: "dist/graph",
  recommendations: "dist/recommendations",
  kuzu: "dist/kuzu"
};

export function absolute(relativePath) {
  return path.join(root, relativePath);
}

export function readText(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8");
}

export function writeJson(relativePath, value) {
  const target = absolute(relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeText(relativePath, value) {
  const target = absolute(relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value);
}

export function listYaml(relativeDir) {
  const fullDir = absolute(relativeDir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .sort()
    .map((file) => path.join(relativeDir, file));
}

export function currentCommit() {
  try {
    return execSync("git rev-parse HEAD", { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

export function graphifyState(repoPath = root) {
  const graphPath = path.join(repoPath, "graphify-out/graph.json");
  if (!fs.existsSync(graphPath)) {
    return {
      available: false,
      graph_path: graphPath,
      summary: "No graphify-out/graph.json found in target repo."
    };
  }
  try {
    const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
    return {
      available: true,
      graph_path: graphPath,
      nodes: graph.nodes?.length ?? 0,
      edges: graph.links?.length ?? graph.edges?.length ?? 0,
      built_at_commit: graph.built_at_commit ?? "unknown",
      summary: "Graphify repo graph is available."
    };
  } catch {
    return {
      available: false,
      graph_path: graphPath,
      summary: "Graphify graph exists but could not be parsed."
    };
  }
}
