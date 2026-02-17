# overstory-ahz Canonical Spec

Status: Draft (analysis package)
Epic: `overstory-ahz`
Owner: Overstory planning lane
Output root: `.mlre/PROJECT/`

## Purpose
Define a beads-friendly requirements package that another agent can ingest to implement MLRE-to-beads conversion later.

This package is analysis-only. It does not modify runtime behavior, CLI behavior, or database schemas in this phase.

## Scope
- Analyze relationships between MLRE and beads.
- Translate execution nouns to beads-friendly terms.
- Keep MLRE conceptual model: X/Y/Z axes, domain agent, subagents.
- Define one shared task schema for all tasks.
- Require `task_id` for every task.
- Define wave + dependency semantics for parallel and sequential work.

## Terminology Policy
Translate these nouns in execution-facing specs:
- `run` -> `epic`
- `node` -> `task`
- `leaf` -> `subtask`

Do not rename:
- `X/Y/Z axes`
- `domain agent`
- `subagent`

## Core Mapping Contract
- One MLRE run maps to one beads epic.
- One MLRE node maps to one beads task.
- One MLRE phase sequence maps to beads subtasks under the parent task.
- Epic, task, and subtask units all use the same base node/task schema (see `overstory-ahz-04-task-schema-contract.md`).

## Schema Invariants
- Every task unit must include a stable `task_id`.
- Every task unit must include `kind` where `kind in [epic, task, subtask]`.
- Every subtask must link to its parent `task_id`.
- Every dependency reference must resolve to an existing `task_id` in the same planning package.

## Execution Semantics
- Wave labels are required for readability and staging.
- Explicit dependency links are required for ordering.
- Parallel execution is represented by same-wave items with no dependency edge between them.
- Sequential execution is represented by explicit dependency edges.

## Canonical References
- `.mlre/CONCEPTS/`
- `.mlre/QUADRANTS/*/STEPS.md`
- `.mlre/ARTIFACT-SCHEMA.md`
- `.mlre/project/specs/` (legacy/lowercase reference set)
- https://github.com/steveyegge/beads
- https://steveyegge.github.io/beads/

## Supplementary Files
The following files are mandatory handoff artifacts and are the passing file set for the next implementation agent.

| Order | File | Required | Purpose |
| --- | --- | --- | --- |
| 01 | `overstory-ahz-01-source-map.md` | yes | Source inventory and canonical-vs-supporting references |
| 02 | `overstory-ahz-02-terminology-remap.md` | yes | MLRE to beads wording policy |
| 03 | `overstory-ahz-03-entity-mapping-epic-task-subtask.md` | yes | Deterministic hierarchy mapping |
| 04 | `overstory-ahz-04-task-schema-contract.md` | yes | Shared schema with required `task_id` |
| 05 | `overstory-ahz-05-wave-and-dependency-model.md` | yes | Parallel/sequential execution model |
| 06 | `overstory-ahz-06-command-verbiage-alignment.md` | yes | Slash/command wording migration |
| 07 | `overstory-ahz-07-agent-subagent-orchestration.md` | yes | Agent orchestration and responsibility model |
| 08 | `overstory-ahz-08-gates-validation-fail-closed.md` | yes | Validation and fail-closed gating policy |
| 09 | `overstory-ahz-09-example-mapping-walkthrough.md` | yes | End-to-end mapping example |
| 10 | `overstory-ahz-10-open-questions-for-conversion.md` | yes | Deferred questions and conversion backlog |

## Processing Order for Next Agent
1. Read this canonical file fully.
2. Process supplementary files in numeric order.
3. Treat this canonical file as tie-breaker on conflicts.
4. Record unresolved items in beads before conversion implementation.

## Acceptance Criteria
- All 10 supplementary files exist in `.mlre/PROJECT/`.
- Terminology remap is explicit and consistent.
- Shared schema contract includes required `task_id`.
- Wave/dependency model expresses both parallel and sequential patterns.
- Open questions are isolated into the deferred list and not treated as resolved.

## Out of Scope for This Phase
- Implementing converters.
- Modifying Overstory CLI commands.
- Adding runtime enforcement logic.
- Migrating existing issues automatically.
