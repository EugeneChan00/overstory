# overstory-ahz-07 Agent and Subagent Orchestration

## Intent
Define how domain agents and subagents operate within the beads-friendly epic/task/subtask model.

## Preserved Concepts
- X axis: workflow phase progression.
- Y axis: decomposition depth.
- Z axis: domain agent and subagent collaboration layer.

## Responsibility Model
- Domain agent owns epic-level coordination and final synthesis.
- Subagents own scoped analysis or validation slices under task/subtask boundaries.
- Each subagent output must reference parent `task_id` and target file(s).

## 6-Subagent Pattern Used in This Session
1. Source map analysis
2. Terminology remap
3. Entity mapping
4. Task schema contract
5. Wave/dependency model
6. Command verbiage alignment

## Orchestration Rules
1. Parent agent defines scope and non-overlapping ownership.
2. Subagents return drafts, not unilateral canonical decisions.
3. Parent agent resolves conflicts and writes canonical output.
4. Canonical file is final arbitration layer.
