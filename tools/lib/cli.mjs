import path from "node:path";
import { buildCatalogJson, loadCatalog, routerIndexEntry } from "./catalog.mjs";
import { collectFeedback, previewFeedback } from "./feedback.mjs";
import { submitFeedback } from "./feedback-submit.mjs";
import { buildGraph, buildKuzuLoad } from "./graph.mjs";
import { buildGuidedSession, formatGuidedSessionText } from "./guided-session.mjs";
import { buildRecommendation, formatRecommendationText } from "./recommendation.mjs";
import { root, writeJson, writeText } from "./paths.mjs";
import { validateCatalog } from "./validation.mjs";

export function validateCommand() {
  const catalog = loadCatalog();
  const result = validateCatalog(catalog);
  printValidation(result);
  if (result.errors.length) process.exit(1);
  console.log(`validated ${catalog.librarySkills.length} library skills, ${catalog.internalSkills.length} internal skills, ${catalog.packs.length} public packs, ${catalog.internalPacks.length} internal packs, ${catalog.goldenTasks.length} golden tasks, ${catalog.evaluationRuns.length} evaluation runs`);
}

export function buildCommand(options = {}) {
  const catalog = loadCatalog();
  const result = validateCatalog(catalog);
  printValidation(result);
  if (result.errors.length) process.exit(1);

  const catalogJson = buildCatalogJson(catalog);
  const graph = buildGraph(catalogJson);
  const exploratory = buildRecommendation(catalogJson, { mode: "exploratory", repo: options.repo ?? root });
  const standard = buildRecommendation(catalogJson, { mode: "standard", repo: options.repo ?? root });

  writeJson("dist/catalog.json", catalogJson);
  writeJson("dist/router-index.json", { skills: catalogJson.skills.map(routerIndexEntry), packs: catalogJson.packs });
  writeJson("dist/internal-skills.json", { skills: catalogJson.internal_skills, packs: catalogJson.internal_packs });
  writeJson("dist/graph/nodes.json", graph.nodes);
  writeJson("dist/graph/edges.json", graph.edges);
  writeJson("dist/graph/graph.json", graph);
  writeJson("dist/recommendations/poc.exploratory.json", exploratory);
  writeJson("dist/recommendations/poc.standard.json", standard);
  writeText("dist/kuzu/load.cypher", buildKuzuLoad(graph));

  console.log(`built catalog (${catalogJson.skills.length} library skills, ${catalogJson.internal_skills.length} internal skills), graph (${graph.nodes.length} nodes/${graph.edges.length} edges), and recommendation outputs`);
}

export function recommendCommand(options = {}) {
  const catalogJson = buildCatalogJson(loadCatalog());
  const recommendation = buildRecommendation(catalogJson, options);
  if (options.format === "text") {
    console.log(formatRecommendationText(recommendation));
    return;
  }
  console.log(JSON.stringify(recommendation, null, 2));
}

export function assistCommand(options = {}, args = {}) {
  const session = buildGuidedSession({ ...options, ...args, kind: args.kind ?? "recommendation" });
  if (options.format === "text" || args.format === "text") {
    console.log(formatGuidedSessionText(session));
    return;
  }
  console.log(JSON.stringify(session, null, 2));
}

export function onboardCommand(options = {}, args = {}) {
  const session = buildGuidedSession({ ...options, ...args, kind: "onboarding" });
  if (options.format === "text" || args.format === "text") {
    console.log(formatGuidedSessionText(session));
    return;
  }
  console.log(JSON.stringify(session, null, 2));
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const [rawKey, inlineValue] = token.slice(2).split("=", 2);
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    const next = argv[index + 1];
    if (inlineValue !== undefined) args[key] = inlineValue;
    else if (next && !next.startsWith("--")) {
      args[key] = next;
      index += 1;
    } else args[key] = true;
  }
  return args;
}

export function optionsFromArgs(args) {
  return {
    repo: args.repo ? path.resolve(String(args.repo)) : root,
    task: args.task ? String(args.task) : undefined,
    model: args.model ? String(args.model) : undefined,
    runtime: args.runtime ? String(args.runtime) : undefined,
    mode: args.mode ? String(args.mode) : "exploratory",
    format: args.format ? String(args.format) : "json",
    domain: args.domain ? String(args.domain) : undefined,
    taskTypes: args.taskTypes ? String(args.taskTypes).split(",").map((value) => value.trim()).filter(Boolean) : undefined
  };
}

export function main(argv = process.argv.slice(2)) {
  const command = argv[0] ?? "build";
  const args = parseArgs(argv.slice(1));
  const options = optionsFromArgs(args);
  if (command === "validate") validateCommand(options);
  else if (command === "build") buildCommand(options);
  else if (command === "recommend") recommendCommand(options);
  else if (command === "assist") assistCommand(options, args);
  else if (command === "onboard") onboardCommand(options, args);
  else if (command === "feedback") feedbackCommand(args, options);
  else {
    console.error(`unknown command '${command}'. Use validate, build, recommend, assist, onboard, or feedback.`);
    process.exit(1);
  }
}

function printValidation(result) {
  for (const warning of result.warnings) console.warn(`warning: ${warning}`);
  for (const error of result.errors) console.error(`error: ${error}`);
}

function feedbackCommand(args, options) {
  const subcommand = args._[0] ?? "collect";
  try {
    if (subcommand === "collect") {
      const result = collectFeedback({ ...options, ...args });
      console.log(`feedback written: ${result.outputPath}`);
    } else if (subcommand === "preview") {
      const file = args.file ?? args._[1];
      console.log(JSON.stringify(previewFeedback(file), null, 2));
    } else if (subcommand === "submit") {
      const output = submitFeedback({
        ...options,
        ...args,
        yes: args.yes === true || args.yes === "true",
        dryRun: args.dryRun === true || args.dryRun === "true"
      });
      console.log(`feedback submitted: ${output}`);
    } else {
      throw new Error(`unknown feedback command '${subcommand}'. Use collect, preview, or submit.`);
    }
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
}
