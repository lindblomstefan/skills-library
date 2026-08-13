# Graph Report - skills-library  (2026-08-13)

## Corpus Check
- 45 files · ~39,587 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 414 nodes · 589 edges · 34 communities (32 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5aaf068`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Required Data Groups
- Discovery
- Governance Gates
- Skill Evaluation
- parseYaml
- Operating Model
- Golden Tasks
- cli.mjs
- Router Output
- Skills Library
- Catalog Structure
- Privacy And Metrics
- Runtime Compatibility
- Decisions
- Evaluations
- Catalog
- Router
- AGENTS.md
- scripts
- feedback.mjs
- 2026-08-13
- CLI Usage
- check-guardrails.mjs
- validation.mjs
- guided-session.mjs
- Scanner Interviewing
- Engineering Guardrails
- feedback-submit.mjs
- Scanner Onboarding
- Skill Feedback Capture
- Skill Library
- Initiative Skill Recommender
- Skill Library Onboarding
- skills/README.md

## God Nodes (most connected - your core abstractions)
1. `2026-08-13` - 14 edges
2. `buildCommand()` - 12 edges
3. `main()` - 11 edges
4. `validateCatalog()` - 11 edges
5. `Scanner Interviewing` - 11 edges
6. `CLI Usage` - 11 edges
7. `Required Data Groups` - 11 edges
8. `Core Question Bank` - 10 edges
9. `Skill Feedback Capture` - 10 edges
10. `buildGuidedSession()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `loadYamlFiles()` --calls--> `parseYaml()`  [EXTRACTED]
  tools/lib/catalog.mjs → tools/lib/yaml.mjs
- `buildCatalogJson()` --calls--> `currentCommit()`  [EXTRACTED]
  tools/lib/catalog.mjs → tools/lib/paths.mjs
- `buildCommand()` --indirect_call--> `routerIndexEntry()`  [INFERRED]
  tools/lib/cli.mjs → tools/lib/catalog.mjs
- `validateCommand()` --calls--> `validateCatalog()`  [EXTRACTED]
  tools/lib/cli.mjs → tools/lib/validation.mjs
- `buildCommand()` --calls--> `validateCatalog()`  [EXTRACTED]
  tools/lib/cli.mjs → tools/lib/validation.mjs

## Import Cycles
- None detected.

## Communities (34 total, 2 thin omitted)

### Community 0 - "Required Data Groups"
Cohesion: 0.10
Nodes (19): Acceptance And Fetching, Compatibility, Core Rule, Definition of Ready for Catalog, Definition of Ready for Evaluation, Distribution, Evaluation, Human Review Gates (+11 more)

### Community 1 - "Discovery"
Cohesion: 0.12
Nodes (16): Build Candidates, Build skill: engineering decision record, Build skill: initiative kickoff, Build skill: pull request review, Build skill: release readiness, Define catalog schema, Define contribution workflow, Define evaluation rubric (+8 more)

### Community 2 - "Governance Gates"
Cohesion: 0.20
Nodes (9): Approved, Candidate, Deprecated, Evaluating, Governance Gates, Human Review Gates, In Use, Needs Review (+1 more)

### Community 3 - "Skill Evaluation"
Cohesion: 0.20
Nodes (9): Compatibility, Evidence, Next Review, Recommendation, Risks, Skill Evaluation, Source, Summary (+1 more)

### Community 4 - "parseYaml"
Cohesion: 0.70
Nodes (4): parseScalar(), parseYaml(), splitKeyValue(), stripComment()

### Community 5 - "Operating Model"
Cohesion: 0.25
Nodes (7): Canonical Statuses, Decision Outcomes, Evaluation Criteria, Operating Model, Ownership, Principles, Source Types

### Community 6 - "Golden Tasks"
Cohesion: 0.29
Nodes (6): Evaluation Rules, Evaluation Runs, Golden Tasks, Initial Golden Task Candidates, Purpose, Storage

### Community 7 - "cli.mjs"
Cohesion: 0.12
Nodes (40): buildCatalogJson(), loadCatalog(), loadYamlFiles(), routerIndexEntry(), withSource(), assistCommand(), buildCommand(), main() (+32 more)

### Community 8 - "Router Output"
Cohesion: 0.29
Nodes (6): Consumers, Minimal Output Shape, Output Principles, Recommendation Evidence, Recommendation Modes, Router Output

### Community 9 - "Skills Library"
Cohesion: 0.20
Nodes (9): Catalog Dimensions, Current Focus, Local CLI POC, Not Implemented Yet, Operating Model, Repository Contents, Skill Lifecycle, Skills Library (+1 more)

### Community 10 - "Catalog Structure"
Cohesion: 0.29
Nodes (6): Add Or Promote Skills, Catalog Structure, Governance And Metrics, Library Seed, MVP Artifacts, Skill Visibility Split

### Community 11 - "Privacy And Metrics"
Cohesion: 0.33
Nodes (5): Allowed Event Data, Principle, Privacy And Metrics, Privacy Fields, Prohibited Event Data

### Community 12 - "Runtime Compatibility"
Cohesion: 0.33
Nodes (5): Compatibility Matrix, First Runtime Set, Hermes Agent, Runtime Compatibility, Support Values

### Community 13 - "Decisions"
Cohesion: 0.12
Nodes (15): Decisions, Deferred, First POC Plan, First Skill To Onboard, Generated Data Policy, Graph Architecture, Guided Skill Help Flow, Initiative Interview (+7 more)

### Community 14 - "Evaluations"
Cohesion: 0.40
Nodes (4): Evaluation Outcomes, Evaluation Runs, Evaluations, Suggested Layout

### Community 15 - "Catalog"
Cohesion: 0.50
Nodes (3): Catalog, Directories, Rule

### Community 16 - "Router"
Cohesion: 0.50
Nodes (3): Contract, Planned Commands, Router

### Community 18 - "scripts"
Cohesion: 0.13
Nodes (14): bin, skills-library, name, private, scripts, guardrails, poc, poc:build (+6 more)

### Community 19 - "feedback.mjs"
Cohesion: 0.21
Nodes (15): buildRepoContext(), collectFeedback(), detectCi(), detectStack(), dirtyCount(), feedbackSignals, git(), languageSummary() (+7 more)

### Community 20 - "2026-08-13"
Cohesion: 0.12
Nodes (15): 2026-08-13, CLI-First Pivot, Graph Database Path, Guided Skill Help Flow, Internal Vs Library Skill Split, Local Feedback Capture, Mandatory License Check In Onboarding, POC Change Log (+7 more)

### Community 24 - "CLI Usage"
Cohesion: 0.17
Nodes (11): Agent Instruction Files, CLI Usage, Contract Direction, Current Commands, Feedback Flow, From Another Repo, From This Repo, Guided Help Flow (+3 more)

### Community 25 - "check-guardrails.mjs"
Cohesion: 0.19
Nodes (12): countLines(), docRules, ignoredDirs, ignoredFiles, isIgnored(), main(), rulesFor(), sourceRules (+4 more)

### Community 26 - "validation.mjs"
Cohesion: 0.35
Nodes (11): allow(), ids(), requireArrayValues(), requireFields(), taxonomyIds(), validateCatalog(), validateCompatibility(), validateSkill() (+3 more)

### Community 27 - "guided-session.mjs"
Cohesion: 0.24
Nodes (19): buildGuidedSession(), buildQuestions(), buildRepoContext(), chatQuestion(), choice(), detectStack(), inferFromContext(), languageCounts() (+11 more)

### Community 28 - "Scanner Interviewing"
Cohesion: 0.07
Nodes (27): As-Is Flow, Codes And Scan Events, Core Question Bank, Gate Pressure, Identity And Cards, Integrations, Interview Guide, Interview Plan Template (+19 more)

### Community 29 - "Engineering Guardrails"
Cohesion: 0.40
Nodes (4): Engineering Guardrails, Responsibility Boundaries, Size Limits, Split Triggers

### Community 30 - "feedback-submit.mjs"
Cohesion: 0.21
Nodes (20): feedbackCommand(), buildIssueBody(), previewFeedback(), readFeedback(), buildFeedbackComment(), buildPrBody(), buildSkillFeedbackIssueBody(), ensureCleanGit() (+12 more)

### Community 31 - "Scanner Onboarding"
Cohesion: 0.09
Nodes (21): Confidence Labels, Contradictions and Confusion, Evidence Labels, Onboarding Pack Guide, Open Decisions, Recommended Pack Structure, Solution Hypotheses, Stabilization Output For Blocked Evidence (+13 more)

### Community 32 - "Skill Feedback Capture"
Cohesion: 0.18
Nodes (10): CLI Commands, Model-Agnostic Use, Privacy Rules, Purpose, Required Fields, Signal Guidance, Skill Feedback Capture, Submission Rules (+2 more)

### Community 33 - "Skill Library"
Cohesion: 0.25
Nodes (7): Capture Feedback, Guided Help, Purpose, Recommend Skills, Rules, Setup Assumption, Skill Library

### Community 35 - "Initiative Skill Recommender"
Cohesion: 0.22
Nodes (8): CLI Helper, Evidence Gate, Initiative Skill Recommender, Model-Agnostic Use, Output, Purpose, Question Contract, Workflow

### Community 36 - "Skill Library Onboarding"
Cohesion: 0.25
Nodes (7): CLI Helper, Model-Agnostic Use, PR Package, Purpose, Required Gates, Skill Library Onboarding, Workflow

## Knowledge Gaps
- **221 isolated node(s):** `name`, `version`, `private`, `type`, `skills-library` (+216 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `root` connect `check-guardrails.mjs` to `guided-session.mjs`, `feedback.mjs`, `feedback-submit.mjs`, `cli.mjs`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `validateCatalog()` connect `validation.mjs` to `cli.mjs`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `graphifyState()` connect `cli.mjs` to `guided-session.mjs`, `feedback.mjs`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _221 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Required Data Groups` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Discovery` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `cli.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.11563367252543941 - nodes in this community are weakly interconnected._