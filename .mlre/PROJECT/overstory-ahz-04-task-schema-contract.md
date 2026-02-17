# overstory-ahz-04 Task Schema Contract

## Objective
Define one shared schema used by all epic/task/subtask records in the future converter.

## Base Contract (applies to all)
| Field | Required | Description |
| --- | --- | --- |
| `task_id` | yes | Stable unique identifier |
| `kind` | yes | `epic` \| `task` \| `subtask` |
| `title` | yes | Human-readable title |
| `summary` | yes | Short intent description |
| `status` | yes | `backlog` \| `ready` \| `in_progress` \| `blocked` \| `done` |
| `wave` | yes | Wave label for scheduling |
| `dependencies` | yes | Array of `task_id` references (empty allowed) |
| `acceptance_criteria` | yes | Evidence-based completion criteria |

## Relationship Fields
| Field | Required when | Description |
| --- | --- | --- |
| `parent_epic_id` | `kind == task` | Parent epic reference |
| `parent_task_id` | `kind == subtask` | Parent task reference |
| `subtasks` | `kind == task` | Child subtask ids |
| `tasks` | `kind == epic` | Child task ids |

## Required Rule
Every task-like artifact must include `task_id`. There are no exceptions.

## Example (pseudo YAML)
```yaml
task_id: task-overstory-ahz-auth-hardening
kind: task
title: Harden auth workflow
summary: Convert MLRE auth node into beads-friendly task contract.
status: ready
wave: W2
dependencies:
  - task-overstory-ahz-requirements
acceptance_criteria:
  - All required files are listed in canonical manifest.
  - Subtask contracts include parent_task_id.
parent_epic_id: epic-overstory-ahz
subtasks:
  - subtask-overstory-ahz-auth-analysis
  - subtask-overstory-ahz-auth-validation
```

## Validation Rules
1. `task_id` must match `^[a-z0-9][a-z0-9-]{2,63}$`.
2. `dependencies` may reference only existing `task_id` values.
3. `kind == subtask` requires `parent_task_id`.
4. `kind == task` requires `parent_epic_id`.
5. `kind == epic` must not set `parent_task_id`.
