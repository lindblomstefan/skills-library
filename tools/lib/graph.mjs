export function buildGraph(catalogJson) {
  const nodes = [];
  const edges = [];
  const node = (id, type, label, properties = {}) => nodes.push({ id, type, label, ...properties });
  const edge = (source, target, type, properties = {}) => edges.push({ source, target, type, ...properties });

  for (const skill of catalogJson.all_skills ?? catalogJson.skills) {
    node(`skill:${skill.id}`, "Skill", skill.name, {
      status: skill.status,
      catalog_visibility: skill.catalog_visibility,
      source_type: skill.source_type,
      owner: skill.owner,
      trust: skill.trust?.level,
      risk: skill.risk?.level,
      summary: skill.summary,
      source_path: skill._source_path
    });
    node(`decision:${skill.id}:${skill.decision?.outcome}`, "Decision", skill.decision?.outcome ?? "unknown", {
      rationale: skill.decision?.rationale ?? ""
    });
    edge(`skill:${skill.id}`, `decision:${skill.id}:${skill.decision?.outcome}`, "HAS_DECISION");
    connectSkillClassifiers(skill, node, edge);
    connectSkillCompatibility(skill, node, edge);
    connectSkillRelationships(skill, edge);
  }

  for (const pack of catalogJson.packs) {
    node(`pack:${pack.id}`, "Pack", pack.name, { status: pack.status, purpose: pack.purpose, source_path: pack._source_path });
    for (const skill of pack.skills ?? []) edge(`pack:${pack.id}`, `skill:${skill.id}`, "INCLUDES", { reason: skill.reason ?? "" });
  }

  for (const pack of catalogJson.internal_packs ?? []) {
    node(`internal-pack:${pack.id}`, "InternalPack", pack.name, { status: pack.status, purpose: pack.purpose, source_path: pack._source_path });
    for (const skill of pack.skills ?? []) edge(`internal-pack:${pack.id}`, `skill:${skill.id}`, "INCLUDES", { reason: skill.reason ?? "" });
  }

  for (const task of catalogJson.golden_tasks) {
    node(`golden-task:${task.id}`, "GoldenTask", task.title, { prompt: task.prompt, source_path: task._source_path });
    edge(`golden-task:${task.id}`, `domain:${task.domain}`, "TESTS_DOMAIN");
    edge(`golden-task:${task.id}`, `task:${task.task_type}`, "TESTS_TASK");
  }

  for (const run of catalogJson.evaluation_runs) {
    node(`evaluation-run:${run.id}`, "EvaluationRun", run.id, { outcome: run.outcome, source_path: run._source_path });
    edge(`evaluation-run:${run.id}`, `skill:${run.skill_id}`, "EVALUATES");
    edge(`evaluation-run:${run.id}`, `golden-task:${run.golden_task_id}`, "USES_TASK");
    edge(`evaluation-run:${run.id}`, `model:${run.model}`, "RAN_ON_MODEL");
    edge(`evaluation-run:${run.id}`, `runtime:${run.runtime}`, "RAN_ON_RUNTIME");
  }

  return {
    graph_version: catalogJson.catalog_version,
    built_at: catalogJson.built_at,
    nodes: uniqueBy(nodes, (item) => item.id),
    edges: uniqueBy(edges, (item) => `${item.source}|${item.type}|${item.target}`)
  };
}

export function buildKuzuLoad(graph) {
  const lines = [
    "CREATE NODE TABLE IF NOT EXISTS Node(id STRING, type STRING, label STRING, PRIMARY KEY (id));",
    "CREATE REL TABLE IF NOT EXISTS Edge(FROM Node TO Node, type STRING);",
    ""
  ];
  for (const node of graph.nodes) {
    lines.push(`MERGE (:Node {id: "${escapeCypher(node.id)}", type: "${escapeCypher(node.type)}", label: "${escapeCypher(node.label)}"});`);
  }
  lines.push("");
  for (const edge of graph.edges) {
    lines.push(`MATCH (a:Node {id: "${escapeCypher(edge.source)}"}), (b:Node {id: "${escapeCypher(edge.target)}"}) MERGE (a)-[:Edge {type: "${escapeCypher(edge.type)}"}]->(b);`);
  }
  return `${lines.join("\n")}\n`;
}

function connectSkillClassifiers(skill, node, edge) {
  for (const domain of skill.domains ?? []) {
    node(`domain:${domain}`, "Domain", domain);
    edge(`skill:${skill.id}`, `domain:${domain}`, "WORKS_IN");
  }
  for (const taskType of skill.task_types ?? []) {
    node(`task:${taskType}`, "TaskType", taskType);
    edge(`skill:${skill.id}`, `task:${taskType}`, "SUPPORTS_TASK");
  }
}

function connectSkillCompatibility(skill, node, edge) {
  for (const row of skill.compatibility?.matrix ?? []) {
    node(`model:${row.model_id}`, "Model", row.model_id);
    node(`runtime:${row.runtime_id}`, "Runtime", row.runtime_id);
    edge(`skill:${skill.id}`, `model:${row.model_id}`, "COMPATIBLE_WITH_MODEL", { support: row.support, evidence: row.evidence ?? [] });
    edge(`skill:${skill.id}`, `runtime:${row.runtime_id}`, "COMPATIBLE_WITH_RUNTIME", { support: row.support, evidence: row.evidence ?? [] });
  }
}

function connectSkillRelationships(skill, edge) {
  for (const [relationship, targets] of Object.entries(skill.relationships ?? {})) {
    for (const target of targets ?? []) edge(`skill:${skill.id}`, `skill:${target}`, relationship.toUpperCase());
  }
}

function uniqueBy(items, keyFn) {
  const map = new Map();
  for (const item of items) map.set(keyFn(item), item);
  return [...map.values()];
}

function escapeCypher(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
