# overstory-ahz-09 Example Mapping Walkthrough

## Scenario
Source MLRE run: "Auth Hardening Initiative" with two nodes and phase sequences.

## Step 1: Map run -> epic
- Source run id: `run-auth-hardening`
- Target epic id: `epic-auth-hardening`

## Step 2: Map nodes -> tasks
- `node-requirements` -> `task-auth-requirements`
- `node-implementation` -> `task-auth-implementation`

## Step 3: Map phases -> subtasks
Under `task-auth-requirements`:
- `phase-analyze` -> `subtask-auth-req-analyze`
- `phase-verify` -> `subtask-auth-req-verify`

Under `task-auth-implementation`:
- `phase-build` -> `subtask-auth-impl-build`
- `phase-verify` -> `subtask-auth-impl-verify`

## Step 4: Add dependencies
- `task-auth-implementation` depends on `task-auth-requirements`
- `subtask-auth-req-verify` depends on `subtask-auth-req-analyze`
- `subtask-auth-impl-verify` depends on `subtask-auth-impl-build`

## Step 5: Assign waves
- W1: `task-auth-requirements`
- W2: `task-auth-implementation`
- W1/W2 internal subtasks follow task-level dependencies

## Result
The converted shape is beads-friendly, deterministic, and ready for a future converter implementation.
