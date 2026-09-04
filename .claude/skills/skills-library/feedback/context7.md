# Feedback: context7

validated: false
feedback_count: 2

Validated means this skill has been tested in practice at least 3 times. It does not mean it is the right fit for every team or case — read the entries below before recommending.

## Entries

### 2026-09-04 (@lindblomstefan)

Used context7 via the MCP server while working on a Next.js project. Resolved outdated React hooks docs immediately — Claude stopped suggesting deprecated patterns and cited the correct v19 API. Setup was one config line in .mcp.json. Works exactly as advertised.
### 2026-09-04 — session 2 (@lindblomstefan)

Picked it up again on a TypeScript project using tRPC. Asked Claude about `initTRPC.context()` signatures and the difference between `procedure` and `experimentalProcedure` in v11. Without context7 I'd have gotten v10 answers — with it, the response cited the actual v11 API including the new `createCallerFactory` pattern. The difference was immediate. One edge case: when the library is very niche or has low documentation coverage, context7 falls back gracefully rather than hallucinating, which I appreciated.
