# overstory-ahz-03 Entity Mapping (Epic/Task/Subtask)

## Deterministic Mapping
- MLRE run -> beads epic
- MLRE node -> beads task
- MLRE phase sequence -> beads subtasks

## Hierarchy
```text
Epic
- Task A
  - Subtask A1
  - Subtask A2
- Task B
  - Subtask B1
```

## Identity Rules
- `epic_id` is stable for a given source run.
- `task_id` is required and stable for each mapped task.
- `subtask_id` is required and unique within parent task scope.

## Dependency Rules
- Epic gates task start.
- Task gates subtask start.
- Cross-task dependency mirrors source dependency edges.
- Subtasks may have intra-task dependencies for ordered phases.

## Invariants
1. Every mapped source entity has exactly one beads counterpart.
2. No orphan subtask (must have parent `task_id`).
3. Dependency graph must be acyclic unless explicitly designated as loop-with-gate in future conversion logic.
