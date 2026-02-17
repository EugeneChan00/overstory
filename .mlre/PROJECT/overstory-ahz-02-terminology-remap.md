# overstory-ahz-02 Terminology Remap

## Objective
Provide a strict wording map so all future docs, commands, and task artifacts use beads-friendly nouns while preserving MLRE conceptual language.

## Required Replacements
| MLRE term | Replace with | Notes |
| --- | --- | --- |
| `run` | `epic` | Use for planning container and lifecycle unit |
| `runs` | `epics` | Plural form |
| `run-level` | `epic-level` | Adjective form |
| `node` | `task` | Primary executable work unit |
| `nodes` | `tasks` | Plural form |
| `leaf` | `subtask` | Terminal executable unit |
| `leaf node` | `subtask` | Use `terminal subtask` if clarity is needed |

## Terms That Stay Unchanged
- `X axis`, `Y axis`, `Z axis`
- `X/Y/Z axes`
- `domain agent`
- `subagent`
- `beads` (proper project noun)

## Verbage Rules
- Prefer "launch epic" over "run run".
- Prefer "task graph" over "node graph".
- Prefer "subtask sequence" over "leaf sequence".

## Conflict Resolution
1. If a source term is ambiguous, preserve original text and add parenthetical beads alias.
2. Canonical file terminology policy overrides this file on conflicts.
3. Any unresolved term goes to `overstory-ahz-10-open-questions-for-conversion.md`.
