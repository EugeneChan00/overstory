# overstory-ahz-05 Wave and Dependency Model

## Purpose
Define how the package represents parallel and sequential execution in beads-friendly form.

## Model
- Wave labels group work for staging and operator readability.
- Dependency links enforce real execution ordering.
- Ready work means dependency set is fully satisfied.

## Parallel Semantics
Two items are parallel when:
- they are in the same wave, and
- there is no dependency edge between them.

## Sequential Semantics
An item is sequentially gated when:
- it depends on one or more predecessor `task_id`s.

## Graph Rules
1. Directed dependency graph required.
2. No unresolved dependency ids.
3. No cycles for this phase's planning package.
4. Blocked items are excluded from ready queue until blockers clear.

## Example
```text
W1: task-a, task-b          (parallel)
W2: task-c depends on task-a and task-b
W3: task-d depends on task-c
```

## Beads Alignment
- Equivalent of ready queue: tasks with satisfied dependencies.
- Equivalent of blockers: unresolved dependency edges or explicit block state.
- Equivalent of parent-child: epic->task->subtask hierarchy.
