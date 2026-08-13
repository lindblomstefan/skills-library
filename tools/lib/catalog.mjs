import { currentCommit, dirs, listYaml, readText, today } from "./paths.mjs";
import { parseYaml } from "./yaml.mjs";

export function loadYamlFiles(relativeDir) {
  return listYaml(relativeDir).map((relativePath) => ({
    path: relativePath,
    data: parseYaml(readText(relativePath))
  }));
}

export function loadCatalog() {
  const taxonomies = {};
  for (const file of loadYamlFiles(dirs.taxonomies)) {
    const [key, values] = Object.entries(file.data)[0] ?? [];
    taxonomies[key] = values;
  }
  const librarySkills = loadYamlFiles(dirs.librarySkills);
  const internalSkills = loadYamlFiles(dirs.internalSkills);
  const packs = loadYamlFiles(dirs.packs);
  const internalPacks = loadYamlFiles(dirs.internalPacks);
  const goldenTasks = loadYamlFiles(dirs.goldenTasks);
  const evaluationRuns = loadYamlFiles(dirs.evaluationRuns);
  return {
    taxonomies,
    skills: librarySkills,
    librarySkills,
    internalSkills,
    packs,
    internalPacks,
    goldenTasks,
    evaluationRuns
  };
}

export function buildCatalogJson(catalog) {
  const librarySkills = catalog.librarySkills.map((item) => withSource(item, "library"));
  const internalSkills = catalog.internalSkills.map((item) => withSource(item, "internal"));
  return {
    catalog_version: currentCommit(),
    built_at: today,
    skills: librarySkills,
    library_skills: librarySkills,
    internal_skills: internalSkills,
    all_skills: [...librarySkills, ...internalSkills],
    packs: catalog.packs.map((item) => withSource(item)),
    internal_packs: catalog.internalPacks.map((item) => withSource(item)),
    golden_tasks: catalog.goldenTasks.map((item) => withSource(item)),
    evaluation_runs: catalog.evaluationRuns.map((item) => withSource(item)),
    taxonomies: catalog.taxonomies
  };
}

export function routerIndexEntry(skill) {
  return {
    id: skill.id,
    name: skill.name,
    status: skill.status,
    source_type: skill.source_type,
    domains: skill.domains,
    task_types: skill.task_types,
    use_when: skill.use_when,
    do_not_use_when: skill.do_not_use_when,
    compatibility: skill.compatibility,
    trust: skill.trust,
    risk: skill.risk,
    freshness: skill.freshness,
    routing: skill.routing
  };
}

function withSource(item, defaultVisibility) {
  return { ...item.data, catalog_visibility: item.data.catalog_visibility ?? defaultVisibility, _source_path: item.path };
}
