# Pi Domain-Agent Generation Spec

Updated: 2026-02-26
Phase: Specs
Issue: `ov-wisp-qg1`

## Purpose

Define a concrete, testable contract for generating Pi-compatible domain-agent artifacts in Overstory without performing implementation in this phase.

## Inputs → Choices → Outputs Contract

### Inputs

- Runtime target: `pi`
- Discovery artifacts:
  - `docs/pi-agent/meta-doc/state.md`
  - `docs/pi-agent/meta-doc/scope.md`
  - `docs/pi-agent/meta-doc/gt-execution-contract.md`
- Existing Overstory sources for compatibility mapping:
  - launch/session commands
  - hooks deployment
  - templates
  - telemetry/metrics pipeline

### Required Choices (must be explicit before execution)

1. Pi runtime source of truth:
   - upstream `pi-mono`, or
   - `oh-my-pi` fork
2. Pi-mode rollout policy:
   - `experimental` (default-off), or
   - generally enabled
3. Telemetry behavior in Pi mode:
   - disabled with clear message, or
   - provider/model-based estimate adapter
4. Hook parity strategy:
   - immediate hard gate, or
   - minimum Pi extension shim in first execution slice

### Outputs

Execution phase (not this phase) must produce:
- Domain-agent output folder:
  - `docs/pi-agent/domain-agents/`
- Generated domain-agent docs/files for Pi runtime contract
- Subagent representation:
  - additional agent files under `agents/`, or
  - subagent files under `docs/pi-agent/domain-agents/`

Specs phase outputs (this phase):
- This file (`specs.md`)
- Updated `scope.md` with final safety boundaries

## System Prompt Policy (for generated Pi agents)

Generated Pi agent prompt policy MUST include:

- Allowed tools:
  - `read`
  - `write`
  - `edit`
  - `bash`
- Runtime discipline:
  - runtime mode explicitly declared as `pi`
  - no Claude-specific path or hook assumptions
- Never-do constraints:
  - do not write outside assigned scope
  - do not perform unapproved installs
  - do not leave unsupported features enabled; gate or remove
  - do not silently degrade critical coordination behavior

## Approval-Gated Install Contract

Install policy:
- Discovery/Specs: `auto_install_allowed=false`
- After explicit human/mayor approval in execution: `auto_install_allowed=true`

Allowed install actions after approval must be:
1. Enumerated before execution.
2. Limited to runtime compatibility needs.
3. Logged in execution artifacts.

## Feature Disposition Contract

Pi execution must enforce this disposition set:

- `ADAPT`:
  - launcher command construction
  - overlay/runtime template resolution
  - model/provider schema
- `GATE`:
  - Claude hook install path/features in Pi mode until Pi adapter exists
  - Claude transcript-based cost/log pipeline in Pi mode until Pi adapter exists
- `REMOVE (Pi mode only)`:
  - Claude-native team/tool guard assumptions that do not map to Pi

## Acceptance Checks

### Specs Acceptance (this phase)

- `specs.md` exists and defines inputs→choices→outputs.
- Output folder contract is explicit: `docs/pi-agent/domain-agents`.
- Subagent representation options are explicit.
- System prompt policy includes tools + never-do constraints.
- Install gate policy is explicit and approval-based.

### Execution Readiness Acceptance (for next phase)

- Planned tasks map each `ADAPT/GATE/REMOVE` decision to concrete files.
- Every runtime-coupled feature has a pass/fail condition.
- Pi mode failure behavior is explicit (clear diagnostics).
- Claude mode regression protection is included.

## Hard Boundary Reminder

This specs phase does not authorize implementation work.  
Only contracts, acceptance gates, and boundaries are produced here.
