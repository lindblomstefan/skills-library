#!/usr/bin/env node
export { buildCatalogJson, loadCatalog, routerIndexEntry } from "./lib/catalog.mjs";
export { buildGraph, buildKuzuLoad } from "./lib/graph.mjs";
export { buildRecommendation, formatRecommendationText } from "./lib/recommendation.mjs";
export { graphifyState } from "./lib/paths.mjs";
export { main, parseArgs } from "./lib/cli.mjs";
export { validateCatalog } from "./lib/validation.mjs";

import { main } from "./lib/cli.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
