export function validateCatalog(catalog) {
  const errors = [];
  const warnings = [];
  const allSkills = [...catalog.librarySkills, ...catalog.internalSkills];
  const skillIds = ids(allSkills);
  const librarySkillIds = ids(catalog.librarySkills);
  const packIds = ids(catalog.packs);
  const internalPackIds = ids(catalog.internalPacks);
  const goldenTaskIds = ids(catalog.goldenTasks);
  const sourceTypes = taxonomyIds(catalog, "source_types");
  const statuses = taxonomyIds(catalog, "statuses");
  const domains = taxonomyIds(catalog, "domains");
  const taskTypes = taxonomyIds(catalog, "task_types");
  const models = taxonomyIds(catalog, "models");
  const runtimes = taxonomyIds(catalog, "runtimes");
  const support = taxonomyIds(catalog, "compatibility_support");
  const licenseStates = taxonomyIds(catalog, "license_states");

  validateUnique("library skill", catalog.librarySkills, errors);
  validateUnique("internal skill", catalog.internalSkills, errors);
  validateUnique("skill", allSkills, errors);
  validateUnique("pack", catalog.packs, errors);
  validateUnique("internal pack", catalog.internalPacks, errors);
  validateUnique("golden task", catalog.goldenTasks, errors);
  validateUnique("evaluation run", catalog.evaluationRuns, errors);

  for (const item of catalog.librarySkills) validateSkill(item, "library", { sourceTypes, statuses, domains, taskTypes, models, runtimes, support, licenseStates, skillIds, errors, warnings });
  for (const item of catalog.internalSkills) validateSkill(item, "internal", { sourceTypes, statuses, domains, taskTypes, models, runtimes, support, licenseStates, skillIds, errors, warnings });

  for (const item of catalog.packs) {
    const pack = item.data;
    requireFields(item, ["id", "name", "status", "purpose", "compatibility", "skills"], errors);
    allow(item, "status", statuses, errors);
    for (const entry of pack.skills ?? []) {
      if (!librarySkillIds.has(entry.id)) errors.push(`${item.path}: public pack includes non-library or missing skill '${entry.id}'`);
    }
    if (packIds.has(pack.id) && !pack.skills?.length) warnings.push(`${item.path}: pack has no skills`);
  }

  for (const item of catalog.internalPacks) {
    const pack = item.data;
    requireFields(item, ["id", "name", "status", "purpose", "compatibility", "skills"], errors);
    allow(item, "status", statuses, errors);
    for (const entry of pack.skills ?? []) {
      if (!skillIds.has(entry.id)) errors.push(`${item.path}: internal pack includes missing skill '${entry.id}'`);
    }
    if (internalPackIds.has(pack.id) && !pack.skills?.length) warnings.push(`${item.path}: internal pack has no skills`);
  }

  for (const item of catalog.goldenTasks) {
    const task = item.data;
    requireFields(item, ["id", "title", "domain", "task_type", "prompt", "expected_behaviors", "failure_modes", "evaluation"], errors);
    allow(item, "domain", domains, errors);
    allow(item, "task_type", taskTypes, errors);
  }

  for (const item of catalog.evaluationRuns) {
    const run = item.data;
    requireFields(item, ["id", "skill_id", "golden_task_id", "model", "runtime", "evaluator", "outcome", "scores", "evidence"], errors);
    if (!skillIds.has(run.skill_id)) errors.push(`${item.path}: missing skill '${run.skill_id}'`);
    if (!goldenTaskIds.has(run.golden_task_id)) errors.push(`${item.path}: missing golden task '${run.golden_task_id}'`);
    if (!models.has(run.model)) errors.push(`${item.path}: unknown model '${run.model}'`);
    if (!runtimes.has(run.runtime)) errors.push(`${item.path}: unknown runtime '${run.runtime}'`);
  }

  return { errors, warnings };
}

function validateSkill(item, expectedVisibility, context) {
  const { sourceTypes, statuses, domains, taskTypes, models, runtimes, support, licenseStates, skillIds, errors, warnings } = context;
    const skill = item.data;
    requireFields(item, ["id", "name", "catalog_visibility", "source_type", "status", "owner", "summary", "source", "domains", "task_types", "use_when", "do_not_use_when", "compatibility", "distribution", "routing", "trust", "risk", "freshness", "decision"], errors);
    if (skill.catalog_visibility !== expectedVisibility) {
      errors.push(`${item.path}: catalog_visibility must be '${expectedVisibility}' in this directory`);
    }
    allow(item, "source_type", sourceTypes, errors);
    allow(item, "status", statuses, errors);
    requireArrayValues(item, "domains", domains, errors);
    requireArrayValues(item, "task_types", taskTypes, errors);
    validateSkillLicense(item, licenseStates, errors, warnings);
    validateCompatibility(item, models, runtimes, support, errors);
    validateSkillRelationships(item, skillIds, errors);
    if ((skill.status === "approved" || skill.status === "in-use") && skill.owner === "unassigned") {
      errors.push(`${item.path}: ${skill.status} skill cannot have owner unassigned`);
    }
    if (skill.status === "approved" && skill.trust?.license_state === "unknown") {
      errors.push(`${item.path}: approved skill cannot have unknown license_state`);
    }
    if (skill.status === "approved" && !skill.freshness?.next_review) {
      errors.push(`${item.path}: approved skill requires freshness.next_review`);
    }
    if (expectedVisibility === "library" && skill.status !== "approved" && skill.status !== "in-use") {
      warnings.push(`${item.path}: ${skill.id} is ${skill.status}; standard router mode will not mark it ready`);
    } else if (expectedVisibility === "internal" && skill.status !== "approved" && skill.status !== "in-use") {
      warnings.push(`${item.path}: internal skill ${skill.id} is ${skill.status}; keep it out of public recommendations`);
    }
}

function validateSkillLicense(item, licenseStates, errors, warnings) {
  const skill = item.data;
  if (!skill.source?.license) {
    errors.push(`${item.path}: onboarding requires source.license to record the discovered license type or review state`);
  }
  if (!skill.source?.license_spdx) {
    errors.push(`${item.path}: onboarding requires source.license_spdx to record SPDX id, unknown, or not-applicable`);
  }
  if (!skill.trust?.license_state) errors.push(`${item.path}: onboarding requires trust.license_state`);
  else if (!licenseStates.has(skill.trust.license_state)) errors.push(`${item.path}: invalid trust.license_state '${skill.trust.license_state}'`);
  if (skill.source?.license === "unknown" || skill.trust?.license_state === "unknown") {
    warnings.push(`${item.path}: license type/state is unknown and must be checked before approval`);
  }
}

function validateCompatibility(item, models, runtimes, support, errors) {
  for (const row of item.data.compatibility?.matrix ?? []) {
    if (!models.has(row.model_id)) errors.push(`${item.path}: unknown compatibility model_id '${row.model_id}'`);
    if (!runtimes.has(row.runtime_id)) errors.push(`${item.path}: unknown compatibility runtime_id '${row.runtime_id}'`);
    if (!support.has(row.support)) errors.push(`${item.path}: unknown compatibility support '${row.support}'`);
  }
}

function validateSkillRelationships(item, skillIds, errors) {
  for (const [relationship, targets] of Object.entries(item.data.relationships ?? {})) {
    for (const target of targets ?? []) {
      if (!skillIds.has(target)) errors.push(`${item.path}: relationship '${relationship}' targets missing skill '${target}'`);
    }
  }
}

function ids(items) {
  return new Set(items.map((item) => item.data.id));
}

function taxonomyIds(catalog, key) {
  return new Set((catalog.taxonomies[key] ?? []).map((item) => item.id));
}

function validateUnique(label, items, errors) {
  const seen = new Map();
  for (const item of items) {
    const id = item.data.id;
    if (!id) continue;
    if (seen.has(id)) errors.push(`${item.path}: duplicate ${label} id '${id}' also in ${seen.get(id)}`);
    seen.set(id, item.path);
  }
}

function requireFields(item, fields, errors) {
  for (const field of fields) {
    if (item.data[field] === undefined || item.data[field] === "" || item.data[field] === null) {
      errors.push(`${item.path}: missing required field '${field}'`);
    }
  }
}

function allow(item, field, allowed, errors) {
  const value = item.data[field];
  if (value !== undefined && !allowed.has(value)) errors.push(`${item.path}: invalid ${field} '${value}'`);
}

function requireArrayValues(item, field, allowed, errors) {
  for (const value of item.data[field] ?? []) {
    if (!allowed.has(value)) errors.push(`${item.path}: invalid ${field} value '${value}'`);
  }
}
