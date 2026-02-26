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

1. Pi runtime source of truth (locked):
   - upstream `pi-mono` (human decision, 2026-02-26)
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

## GT-Formula Skills Contract

Execution handoff must be driven through the formula workflow (not ad-hoc execution).

- Required execution path:
  - `gt sling <pi-formula>.formula.toml --on ov-wisp-e4f`
- Required skill context for execution workers:
  - `gt-formula` skills (as dispatched by mayor)
- Formula contract requirements:
  1. Respect locked runtime source-of-truth: `pi-mono`
  2. Keep Execution and Verification separated by bead stage
  3. Preserve approval-gated install behavior

## Run Scope Authority Contract

All downstream execution must be governed by this document set:

1. `state.md`
   - current decisions, locked choices, and open questions
2. `scope.md`
   - hard boundaries, safety model, and prohibited actions
3. `specs.md` (this file)
   - inputs→choices→outputs contract and acceptance gates

If these documents conflict, execution must stop and request clarification before implementation.

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
- After explicit user approval in execution: `auto_install_allowed=true`

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

## Pi-Unsupported Team Features: Mandatory Gate/Remove Map

Execution planning for Pi mode must include these mandatory dispositions:

| Team Feature | Pi Support Status | Required Disposition | Required Behavior |
|---|---|---|---|
| Claude hook deploy path/events (`.claude/settings.local.json`, Claude hook events) | Unsupported | `GATE` | Fail closed in Pi mode with explicit diagnostic until Pi hook adapter exists |
| Claude transcript/cost pipeline (`~/.claude/projects/*.jsonl`, Claude tier pricing) | Unsupported | `GATE` | Disable in Pi mode with clear message until Pi metrics adapter exists |
| Claude-native team/tool guard assumptions | Unsupported | `REMOVE` (Pi mode only) | Remove/replace with Pi-relevant guards; keep Claude guards only in Claude mode |

Any Pi-unsupported feature not listed above must be added to this map before execution work begins.

## Acceptance Checks

### Specs Acceptance (this phase)

- `specs.md` exists and defines inputs→choices→outputs.
- Output folder contract is explicit: `docs/pi-agent/domain-agents`.
- Subagent representation options are explicit.
- System prompt policy includes tools + never-do constraints.
- Install gate policy is explicit and approval-based.
- Pi-unsupported team features are explicitly mapped to `GATE` or `REMOVE` with required behavior.
- Specs outputs do not include runtime behavior changes.

### Execution Readiness Acceptance (for next phase)

- Planned tasks map each `ADAPT/GATE/REMOVE` decision to concrete files.
- Every runtime-coupled feature has a pass/fail condition.
- Pi mode failure behavior is explicit (clear diagnostics).
- Claude mode regression protection is included.

## Hard Boundary Reminder

This specs phase does not authorize implementation work.  
Only contracts, acceptance gates, and boundaries are produced here.

## Specs Non-Execution Guard

The following actions are prohibited in this phase:
- modifying runtime behavior (`src/**`, runtime command wiring, hook implementation)
- scaffolding runtime artifacts under `docs/pi-agent/domain-agents/`
- running installs or environment mutation

If any of the above is needed, stop Specs execution and sling the correct execution bead.
