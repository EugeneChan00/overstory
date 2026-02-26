# GT Execution Contract (Pi Compatibility Discovery Mirror)

Updated: 2026-02-26
Phase: Discovery
Issue: `ov-wisp-56j`

## Why this file exists

The assignment requested updating:
- `/home/zz/.agents/docs/concepts/gt-execution-contract.md`

That target is outside the allowed write boundary for this discovery task and is not present on disk in this environment.  
This file is the in-repo mirror update so Specs/Execution can proceed without violating scope constraints.

## Contract Delta for Pi Runtime

### 1. Runtime must be explicit

Execution contract must include `runtime` as a first-class dimension:
- `claude`
- `pi`

Behavior must branch by runtime, not by implicit file conventions.

### 2. Feature parity policy

For any feature area:
- If parity exists: enable.
- If parity does not exist: gate with explicit user-facing diagnostic.
- Do not silently degrade or partially run critical coordination flows.

### 3. Launch contract

Session launch must be runtime-adapted:
- command construction
- startup prompt injection
- required env vars

Hard-coded `claude ...` launch paths violate this contract for Pi mode.

### 4. Hook contract

Hook integration must be runtime-specific:
- Claude mode: `.claude/settings.local.json` path and Claude hook events.
- Pi mode: Pi-native extension/event mechanism (or explicit gate until implemented).

No cross-runtime hook assumptions.

### 5. Telemetry contract

Metrics/transcript collection must declare source by runtime:
- Claude transcript JSONL path + Claude pricing model.
- Pi telemetry adapter (or explicit unsupported gate).

Telemetry command behavior must be deterministic:
- either valid data
- or explicit unsupported/runtime-mismatch output.

### 6. Team feature contract

Team/orchestration features must be classified:
- Runtime-neutral core (mail, beads, merge queue, worktree management): keep enabled.
- Runtime-coupled features (launcher, hooks, transcript metrics, model schema): adapt/gate/remove.

### 7. Safety/constraint contract

Discovery and Specs remain documentation-only gates.
Execution changes require explicit phase transition approval.
Tool/package installs remain approval-gated.

## Acceptance Contract (for later phases)

Minimum runtime acceptance:
- `runtime=pi`: no Claude-specific file writes or command invocations.
- `runtime=claude`: no regressions from current behavior.
- unsupported features in Pi mode fail closed with clear diagnostics.
